"""Regressioni degli strumenti, senza compilare o riscrivere il volume."""

from __future__ import annotations

from contextlib import redirect_stderr, redirect_stdout
from copy import deepcopy
import hashlib
import io
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

# Le prove possono essere avviate direttamente o tramite unittest discover.
SCRIPTS = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(SCRIPTS))

from booklet import cli
from booklet import assets
from booklet.common import ROOT, digest, local_path
from booklet.inventory import check_inventory
from booklet.pdf import note_links


def empty_inventory() -> dict:
    return {
        "capitoli": 0, "bibliografie": 0, "bibliografie_native": 0,
        "parti_bibliografiche_attese": 0, "note": [], "voci": 0,
        "regioni": [], "figure": [], "sagome": [], "ripetute": 0,
    }


def shape(side: int, page: int, x: float, *, pages: int = 2) -> dict:
    return {
        "id": "fig-prova", "lato": side, "pagina": page, "pagine": pages,
        "x": x, "y": 80.0, "larghezza": 300.0, "altezza": 200.0,
        "figura": [{"pagina": 2, "x": 400.0, "y": 80.0}],
    }


class InventoryTests(unittest.TestCase):
    def test_valid_single_and_facing_pages(self):
        left = shape(0, 2, 400.0)
        for shapes in ([{**left, "pagine": 1}], [left, shape(1, 3, 400.0 - 170 * 72 / 25.4)]):
            with self.subTest(pages=len(shapes)):
                data = empty_inventory()
                data["sagome"] = shapes
                self.assertEqual(check_inventory(data)["sagome"], len(shapes))

    def test_duplicate_or_orphaned_sides_are_rejected(self):
        left = shape(0, 2, 400.0)
        right = shape(1, 3, 400.0 - 170 * 72 / 25.4)
        for shapes in ([left], [right], [left, left], [left, right, right]):
            with self.subTest(sides=[s["lato"] for s in shapes]):
                data = empty_inventory()
                data["sagome"] = shapes
                with self.assertRaisesRegex(ValueError, "Lati della sagoma"):
                    check_inventory(data)

    def test_facing_pages_must_agree_on_declared_page_count(self):
        data = empty_inventory()
        data["sagome"] = [shape(0, 2, 400.0),
                           shape(1, 3, 400.0 - 170 * 72 / 25.4, pages=1)]
        with self.assertRaisesRegex(ValueError, "Numero di pagine"):
            check_inventory(data)

    def test_different_scale_or_wrong_parity_is_rejected(self):
        for change in ({"pagina": 4}, {"larghezza": 301.0}, {"x": 0.0}):
            with self.subTest(change=change):
                data = empty_inventory()
                data["sagome"] = [shape(0, 2, 400.0),
                                   {**shape(1, 3, 400.0 - 170 * 72 / 25.4), **change}]
                with self.assertRaises(ValueError):
                    check_inventory(data)


class NotesTests(unittest.TestCase):
    def setUp(self):
        origin = {"pagina": 1, "x": 40.0, "y": 50.0}
        entry = {"pagina": 1, "x": 30.0, "y": 600.0}
        repetition = {"pagina": 2, "x": 45.0, "y": 80.0}
        self.data = {"note": [{"origine": origin, "voci": [entry],
                              "corpo": 'link(dest: "https://example.org/")'}],
                     "ripetizioni": [{"origine": repetition, "voci": [entry]}]}

        def link(source, destination=None, uri=None):
            return {
                "pagina": source["pagina"],
                "rettangolo": [source["x"], source["y"], source["x"] + 5, source["y"] + 5],
                "destinazione": ({**destination, "y": destination["y"] - 10}
                                  if destination is not None else None),
                "uri": uri,
            }

        self.annotations = [link(origin, entry), link(entry, origin),
                            link(entry, uri="https://example.org/"), link(repetition, entry)]

    def test_links_and_repeated_reference_on_other_page(self):
        self.assertEqual(note_links(self.annotations, self.data),
                         {"andata_ritorno": 1, "ripetuti": 1})

    def test_duplicate_link_is_rejected(self):
        with self.assertRaisesRegex(ValueError, "2 di andata"):
            note_links(self.annotations + [self.annotations[0]], self.data)

    def test_url_on_another_page_cannot_replace_missing_note_url(self):
        changed = deepcopy(self.annotations)
        changed[2]["pagina"] = 2
        with self.assertRaisesRegex(ValueError, "URL mancanti"):
            note_links(changed, self.data)

    def test_missing_repeated_link_is_rejected(self):
        with self.assertRaisesRegex(ValueError, "richiamo ripetuto"):
            note_links(self.annotations[:-1], self.data)


class CommandTests(unittest.TestCase):
    def test_partial_build_preserves_full_build_report(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            report_dir = root / "reports/typst-booklet/check"
            report_dir.mkdir(parents=True)
            complete = report_dir / "compilazione.json"
            complete.write_text('"rapporto completo precedente"\n')
            with (patch.object(cli, "ROOT", root),
                  patch.object(cli, "check_environment", return_value="typst 0.15.1"),
                  patch.object(cli, "check_plan", return_value=[{}] * 6),
                  patch.object(cli, "check_fonts", return_value={"font": 1}),
                  patch.object(cli, "check_profiles", return_value=[]),
                  patch.object(cli, "manifest_index", return_value=[]),
                  patch.object(cli, "run"),
                  patch.object(cli, "compile_document", return_value={"secondi": 0.0}),
                  redirect_stdout(io.StringIO())):
                self.assertEqual(cli.main(["build", "--target", "aperture"]), 0)
            self.assertEqual(complete.read_text(), '"rapporto completo precedente"\n')
            self.assertTrue((report_dir / "compilazione-aperture.json").is_file())

    def test_invalid_combinations_use_argument_diagnostics(self):
        for argv in (["check", "--target", "aperture"],
                     ["build", "--target", "aperture", "--assets-only"]):
            with self.subTest(argv=argv), redirect_stderr(io.StringIO()) as error:
                with self.assertRaises(SystemExit) as raised:
                    cli.arguments(argv)
                self.assertEqual(raised.exception.code, 2)
                self.assertNotIn("Traceback", error.getvalue())


class AssetTests(unittest.TestCase):
    def test_module_paths_remain_relative_to_repository(self):
        self.assertEqual(ROOT, SCRIPTS.parent)
        self.assertEqual(local_path("typst-booklet/piano.json"), ROOT / "typst-booklet/piano.json")
        with self.assertRaisesRegex(ValueError, "Percorso esterno"):
            local_path("../file-esterno.json")

    def test_hash_spans_multiple_chunks(self):
        content = bytes(range(256)) * 9000
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / "originale.bin"
            path.write_bytes(content)
            self.assertEqual(digest(path), hashlib.sha256(content).hexdigest())

    def test_too_short_image_cannot_create_unusable_profile(self):
        from PIL import Image

        with tempfile.TemporaryDirectory() as folder:
            source, output = Path(folder) / "piccola.png", Path(folder) / "profilo.json"
            Image.new("RGBA", (10, 7), (255, 0, 0, 128)).save(source)
            result = subprocess.run([sys.executable, str(ROOT / "typst-booklet/scripts/contorni.py"),
                                     str(source), str(output)], capture_output=True, text=True)
            self.assertNotEqual(result.returncode, 0)
            self.assertIn("almeno 8 righe", result.stderr)
            self.assertFalse(output.exists())

    def test_profile_numbers_cannot_be_booleans(self):
        from PIL import Image

        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            source = root / "assets/images/figure/tema/originale.png"
            output = root / "assets/dati/sagome/profilo.json"
            source.parent.mkdir(parents=True)
            Image.new("RGBA", (10, 10), (255, 0, 0, 128)).save(source)
            subprocess.run([sys.executable, str(ROOT / "typst-booklet/scripts/contorni.py"),
                            str(source), str(output)], check=True, capture_output=True)
            valid = json.loads(output.read_text())
            with patch.object(assets, "ROOT", root):
                self.assertEqual(len(assets.check_profiles()), 1)
                for change in ({"soglia_alpha": True}, {"larghezza_px": True},
                               {"altezza_px": 10.0}, {"fasce": [[False, 1]] * 10}):
                    with self.subTest(change=change):
                        output.write_text(json.dumps({**valid, **change}))
                        with self.assertRaisesRegex(ValueError, "non valid"):
                            assets.check_profiles()


@unittest.skipUnless(shutil.which("typst"), "Serve Typst per le prove pure dei profili.")
class TypstProfileTests(unittest.TestCase):
    """Esegue il contratto reale usato dall’anteprima, senza immagini né PDF."""

    def evaluate(self, expression):
        return subprocess.run([
            "typst", "eval", "--root", str(ROOT),
            '{ import path("/typst-booklet/template/profili.typ"): *; ' + expression + ' }',
        ], capture_output=True, text=True, timeout=10)

    def test_first_and_last_bands_include_normalized_endpoints(self):
        result = self.evaluate('''
          let p = (schema: "cvedi-alpha-profile/v1", larghezza_px: 10, altezza_px: 8,
            fasce: ((0.2, 0.8),) + (none,) * 6 + ((0.3, 0.7),))
          let fasce = fasce-profilo(p)
          (fascia-a-quota(fasce, 0), fascia-a-quota(fasce, 1), bordo-alpha-sinistro(fasce))
        ''')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertNotIn("warning:", result.stderr.lower())
        self.assertEqual(json.loads(result.stdout), [[0.2, 0.8], [0.3, 0.7], 0.2])

    def test_invalid_profiles_fail_before_layout(self):
        for fields, diagnostic in [
            ('larghezza_px: 0, altezza_px: 8, fasce: ((0, 1),) * 8', "dimensioni intere positive"),
            ('larghezza_px: 10, altezza_px: 8, fasce: (none,) * 8', "pixel visibili"),
            ('larghezza_px: 10, altezza_px: 8, fasce: ((0.8, 0.2),) * 8', "intervallo crescente"),
            ('larghezza_px: 10, altezza_px: 8, fasce: ((),) * 8', "intervallo crescente"),
        ]:
            with self.subTest(fields=fields):
                result = self.evaluate('fasce-profilo((schema: "cvedi-alpha-profile/v1", ' + fields + '))')
                self.assertNotEqual(result.returncode, 0)
                self.assertIn(diagnostic, result.stderr)


if __name__ == "__main__":
    unittest.main()
