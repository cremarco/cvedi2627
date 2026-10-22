"""Regressioni delle anteprime limitate, senza compilare il booklet."""

from __future__ import annotations

from contextlib import redirect_stderr, redirect_stdout
import io
from pathlib import Path
import shutil
import struct
import sys
import tempfile
import unittest
from unittest.mock import patch

SCRIPTS = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(SCRIPTS))

from booklet import cli, preview


class PageSelectionTests(unittest.TestCase):
    def test_closed_ranges_are_sorted_and_deduplicated(self):
        self.assertEqual(preview.parse_pages("8-9, 3,8"), [3, 8, 9])
        self.assertEqual(preview.parse_pages("1-8"), list(range(1, 9)))

    def test_empty_open_reversed_and_nonpositive_ranges_are_rejected(self):
        for value in ("", " ", "0", "-1", "1-", "-8", "9-8", "1,,2", "1.5", "all", "1-2-3"):
            with self.subTest(value=value), self.assertRaises(ValueError):
                preview.parse_pages(value)

    def test_large_ranges_are_rejected_before_expansion(self):
        for value in ("1-1000000000000", "1-8,9", "1,3,5,7,9,11,13,15,17"):
            with self.subTest(value=value), self.assertRaisesRegex(ValueError, "massimo 8"):
                preview.parse_pages(value)


class PreviewArgumentTests(unittest.TestCase):
    def test_preview_defaults_to_booklet_and_accepts_other_targets(self):
        default = cli.arguments(["preview", "--pages", "8-9"])
        self.assertEqual(default.azione, "preview")
        self.assertIsNone(default.target)
        self.assertEqual(cli.arguments(["preview", "--pages", "1", "--target", "aperture"]).target,
                         "aperture")

    def test_missing_pages_and_irrelevant_flags_are_argument_errors(self):
        for argv in (["preview"], ["preview", "--assets-only", "--pages", "1"],
                     ["build", "--pages", "1"], ["check", "--pages", "1"],
                     ["preview", "--pages", "1", "--target", "inesistente"]):
            with self.subTest(argv=argv), redirect_stderr(io.StringIO()) as error:
                with self.assertRaises(SystemExit) as raised:
                    cli.arguments(argv)
                self.assertEqual(raised.exception.code, 2)
                self.assertNotIn("Traceback", error.getvalue())


class PreviewTests(unittest.TestCase):
    def setUp(self):
        from pypdf import PdfWriter

        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.booklet = self.root / "typst-booklet"
        self.pdf = self.booklet / "build/booklet.pdf"
        self.pdf.parent.mkdir(parents=True)
        writer = PdfWriter()
        for _ in range(12):
            writer.add_blank_page(width=481.89, height=680.315)
        with self.pdf.open("wb") as output:
            writer.write(output)
        self.original = self.pdf.read_bytes()
        self.addCleanup(patch.stopall)
        patch.object(preview, "BOOKLET", self.booklet).start()
        patch.object(preview, "TARGETS", {
            "booklet": (self.booklet / "main.typ", self.pdf),
            "aperture": (self.booklet / "anteprime/aperture.typ", self.pdf),
        }).start()

    @staticmethod
    def render_stub(command):
        Path(command[-1] + ".png").write_bytes(b"PNG di prova")
        return ""

    def test_all_selections_are_validated_before_rendering_or_output(self):
        for selection in ("1-9", "1,13", "0", "1-"):
            with (self.subTest(selection=selection),
                  patch.object(preview, "run") as render,
                  self.assertRaises(ValueError)):
                preview.create_preview("booklet", selection)
            render.assert_not_called()
            self.assertFalse((self.pdf.parent / "anteprime-ispezione").exists())

    def test_missing_pdf_and_renderer_have_clear_diagnostics(self):
        with patch.object(preview.shutil, "which", return_value=None):
            with self.assertRaisesRegex(ValueError, "pdftoppm non disponibile"):
                preview.create_preview("booklet", "1")
        self.pdf.unlink()
        with self.assertRaisesRegex(ValueError, "PDF compilato assente"):
            preview.create_preview("booklet", "1")

    def test_only_requested_pages_are_rendered_as_bounded_pngs(self):
        with (patch.object(preview.shutil, "which", return_value="/test/pdftoppm"),
              patch.object(preview, "run", side_effect=self.render_stub) as render):
            result = preview.create_preview("aperture", "9,8-9")
        self.assertEqual(result["pagine"], [8, 9])
        self.assertEqual(result["pagine_totali"], 12)
        self.assertEqual(len(render.call_args_list), 2)
        for page, call in zip((8, 9), render.call_args_list):
            command = call.args[0]
            self.assertEqual(command[:9], ["/test/pdftoppm", "-f", str(page), "-l", str(page),
                                           "-singlefile", "-scale-to", "1600", "-png"])
            self.assertEqual(command[9], str(self.pdf))
        self.assertEqual([path.name for path in result["file"]],
                         ["pagina-0008.png", "pagina-0009.png"])
        output = self.pdf.parent / "anteprime-ispezione/aperture"
        self.assertEqual(set(output.iterdir()), set(result["file"]))
        self.assertTrue(all(path.suffix == ".png" for path in output.iterdir()))
        self.assertEqual(self.pdf.read_bytes(), self.original)

    def test_stale_png_is_not_accepted_when_renderer_produces_no_output(self):
        output = self.pdf.parent / "anteprime-ispezione/booklet"
        output.mkdir(parents=True)
        (output / "pagina-0008.png").write_bytes(b"vecchia anteprima")
        with (patch.object(preview.shutil, "which", return_value="/test/pdftoppm"),
              patch.object(preview, "run"),
              self.assertRaisesRegex(ValueError, "PNG non generata")):
            preview.create_preview("booklet", "8")

    def test_cli_skips_editorial_checks_and_preserves_reports_on_success_and_failure(self):
        report_dir = self.root / "reports/typst-booklet/check"
        report_dir.mkdir(parents=True)
        for name in ("verifica.json", "compilazione.json", "compilazione-aperture.json"):
            (report_dir / name).write_text(f"rapporto precedente {name}\n")
        before = {path.name: path.read_bytes() for path in report_dir.iterdir()}
        output = self.pdf.parent / "anteprime-ispezione/booklet"
        output.mkdir(parents=True)
        (output / "pagina-0001.png").write_bytes(b"anteprima non richiesta")
        for selection, expected in (("8-9", 0), ("1,13", 1)):
            with (self.subTest(selection=selection),
                  patch.object(cli, "ROOT", self.root),
                  patch.object(cli, "check_environment") as environment,
                  patch.object(cli, "check_plan") as plan,
                  patch.object(cli, "compile_document") as compile_document,
                  patch.object(cli, "save_json") as save,
                  patch.object(preview.shutil, "which", return_value="/test/pdftoppm"),
                  patch.object(preview, "run", side_effect=self.render_stub),
                  redirect_stdout(io.StringIO()) as stdout,
                  redirect_stderr(io.StringIO())):
                self.assertEqual(cli.main(["preview", "--pages", selection]), expected)
            for unused in (environment, plan, compile_document, save):
                unused.assert_not_called()
            self.assertNotIn("pagina-0001.png", stdout.getvalue())
            self.assertNotIn("booklet.pdf", stdout.getvalue())
        self.assertEqual(before, {path.name: path.read_bytes() for path in report_dir.iterdir()})
        self.assertEqual(self.pdf.read_bytes(), self.original)

    @unittest.skipUnless(shutil.which("pdftoppm"), "Poppler non disponibile")
    def test_real_renderer_produces_only_two_pngs_under_1600_pixels(self):
        result = preview.create_preview("booklet", "8-9")
        for path in result["file"]:
            with path.open("rb") as png:
                header = png.read(24)
            self.assertEqual(header[:8], b"\x89PNG\r\n\x1a\n")
            width, height = struct.unpack(">II", header[16:24])
            self.assertEqual(max(width, height), 1600)
        self.assertEqual(len(list((self.pdf.parent / "anteprime-ispezione").rglob("*.png"))), 2)
        self.assertEqual(self.pdf.read_bytes(), self.original)


if __name__ == "__main__":
    unittest.main()
