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
from booklet import common
from booklet.common import ROOT, digest, local_path
from booklet.inventory import check_inventory
from booklet.pdf import note_links
from booklet.regressions import separated_caption_references


def empty_inventory() -> dict:
    return {
        "capitoli": 0, "bibliografie": 0, "bibliografie_native": 0,
        "parti_bibliografiche_attese": 0, "note": [], "voci": 0,
        "regioni": [], "figure": [], "sagome": [], "ripetute": 0,
        "documenti_doppi": [],
        "didascalie_separate": [],
    }


def shape(side: int, page: int, x: float, *, pages: int = 2) -> dict:
    return {
        "id": "fig-prova", "lato": side, "pagina": page, "pagine": pages,
        "x": x, "y": 80.0, "larghezza": 300.0, "altezza": 200.0,
        "figura": [{"pagina": 2, "x": 400.0, "y": 80.0}],
    }


def document_spread(side: int, page: int) -> dict:
    width = 340 * 72 / 25.4
    return {
        "id": "documento-prova", "lato": side, "pagine": 2,
        "pagina": page, "dichiarata": page, "x": -side * 170 * 72 / 25.4,
        "y": 240.0, "larghezza": width, "altezza": width * 300 / 964,
        "scala": width / 964, "dimensioni_fonte": [964, 300],
        "figura": [{"pagina": 2, "x": 0.0, "y": 240.0}],
    }


class DocumentSpreadTests(unittest.TestCase):
    def data(self):
        data = empty_inventory()
        data["documenti_doppi"] = [document_spread(0, 2), document_spread(1, 3)]
        return data

    def test_facing_pages_share_one_native_figure_and_geometry(self):
        self.assertEqual(check_inventory(self.data())["documenti_doppi"], 2)

    def test_missing_or_duplicate_halves_are_rejected(self):
        left, right = self.data()["documenti_doppi"]
        for pair in ([left], [right], [left, left], [left, right, right]):
            with self.subTest(sides=[s["lato"] for s in pair]):
                data = empty_inventory()
                data["documenti_doppi"] = pair
                with self.assertRaisesRegex(ValueError, "Lati della doppia"):
                    check_inventory(data)

    def test_wrong_parity_or_nonadjacent_pages_are_rejected(self):
        for left_page, right_page in ((3, 4), (2, 5)):
            with self.subTest(pages=(left_page, right_page)):
                data = self.data()
                for side, page in zip(data["documenti_doppi"], (left_page, right_page)):
                    side["pagina"] = side["dichiarata"] = page
                with self.assertRaisesRegex(ValueError, "pari/dispari affiancate"):
                    check_inventory(data)

    def test_different_vertical_position_or_shift_at_binding_is_rejected(self):
        for change in ({"y": 241.0}, {"x": 0.0}):
            with self.subTest(change=change):
                data = self.data()
                data["documenti_doppi"][1].update(change)
                with self.assertRaises(ValueError):
                    check_inventory(data)

    def test_stretching_or_changing_source_dimensions_is_rejected(self):
        for change in ({"scala": 0.5}, {"altezza": 300.0}, {"dimensioni_fonte": [963, 300]}):
            with self.subTest(change=change):
                data = self.data()
                data["documenti_doppi"][1].update(change)
                with self.assertRaisesRegex(ValueError, "Rapporto della fonte"):
                    check_inventory(data)

    def test_native_figure_must_match_declared_position_and_be_unique(self):
        actual = document_spread(0, 2)["figura"][0]
        for figures in ([], [actual, actual], [{**actual, "pagina": 3}], [{**actual, "y": 241.0}]):
            with self.subTest(figures=figures):
                data = self.data()
                data["documenti_doppi"][0]["figura"] = figures
                with self.assertRaisesRegex(ValueError, "Figura documentaria|figura documentaria nativa"):
                    check_inventory(data)

    def test_metadata_cannot_move_to_another_page(self):
        data = self.data()
        data["documenti_doppi"][1]["dichiarata"] = 2
        with self.assertRaisesRegex(ValueError, "pagina errata"):
            check_inventory(data)

    def test_invalid_declarations_fail_before_geometry_checks(self):
        for change in ({"pagine": 1}, {"lato": True}, {"scala": float("nan")},
                       {"dimensioni_fonte": [True, 300]}, {"larghezza": 0.0}):
            with self.subTest(change=change):
                data = self.data()
                data["documenti_doppi"][0].update(change)
                with self.assertRaises(ValueError):
                    check_inventory(data)


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


class SeparatedCaptionTests(unittest.TestCase):
    def setUp(self):
        self.caption = {"figura": "<fig-prova>", "origine": {"pagina": 2, "x": 110., "y": 160.},
                        "immagine": {"pagina": 3, "x": 0., "y": 0.},
                        "folio": 9, "folio_atteso": 9}
        self.link = {"pagina": 2, "rettangolo": [110., 153., 190., 162.],
                     "destinazione": {"pagina": 3, "x": 0., "y": 0.}}
        self.texts = ["Pagina inserita", "Figura 2\nImmagine a p. 009\nDidascalia", ""]

    def data(self):
        data = empty_inventory()
        data["didascalie_separate"] = [deepcopy(self.caption)]
        return data

    def test_folio_can_differ_from_physical_page(self):
        self.assertEqual(check_inventory(self.data())["didascalie_separate"], 1)
        self.assertEqual(separated_caption_references([self.link], self.texts, [self.caption])[0]["folio"], 9)

    def test_stale_folio_and_duplicate_captions_are_rejected(self):
        data = self.data()
        data["didascalie_separate"][0]["folio"] = 8
        with self.assertRaisesRegex(ValueError, "Folio della didascalia"):
            check_inventory(data)
        data = self.data()
        data["didascalie_separate"].append(deepcopy(self.caption))
        with self.assertRaisesRegex(ValueError, "più didascalie separate"):
            check_inventory(data)

    def test_same_page_and_invalid_geometry_are_rejected(self):
        for change in ({"pagina": 2}, {"pagina": True}, {"x": float("nan")}):
            with self.subTest(change=change):
                data = self.data()
                data["didascalie_separate"][0]["immagine"].update(change)
                with self.assertRaises(ValueError):
                    check_inventory(data)

    def test_missing_or_duplicate_pdf_link_is_rejected(self):
        for links in ([], [self.link, deepcopy(self.link)]):
            with self.subTest(links=len(links)), self.assertRaisesRegex(ValueError, "unico link PDF"):
                separated_caption_references(links, self.texts, [self.caption])

    def test_logical_insertion_point_cannot_replace_visible_image_target(self):
        for change in ({"pagina": 2}, {"x": 40.}, {"y": 10.}):
            link = deepcopy(self.link)
            link["destinazione"].update(change)
            with self.subTest(change=change), self.assertRaisesRegex(ValueError, "immagine visibile"):
                separated_caption_references([link], self.texts, [self.caption])

    def test_stale_printed_number_is_rejected_even_with_correct_metadata_and_link(self):
        texts = ["Pagina inserita", "Figura 2\nImmagine a p. 008\nDidascalia", ""]
        with self.assertRaisesRegex(ValueError, "rimando stampato"):
            separated_caption_references([self.link], texts, [self.caption])


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
    def test_grid_preview_is_a_public_target(self):
        self.assertEqual(cli.arguments(["build", "--target", "griglia"]).target, "griglia")

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
    def test_plan_length_is_driven_by_editorial_data(self):
        # Un nuovo capitolo richiede dati e fonti, senza cambiare una costante
        # nel runner. Gli altri contratti restano gli stessi a ogni lunghezza.
        palette = json.loads((ROOT / "assets/images/aperture/manifest.json").read_text())["palette"]
        for count in (1, 6, 7, 8):
            chapters = [{"numero": i, "codice": f"{i:02}", "titolo": f"Capitolo {i}",
                         "apertura_originale": i, "file": f"capitoli/{i}.typ",
                         "fonti": f"bibliografia/{i}.yml", "stato": "in-revisione"}
                        for i in range(1, count + 1)]
            themes = [{"numero": i, "percorso": f"apertura-{i}.svg", "colore": "#A3B3FF"}
                      for i in range(1, count + 1)]
            with (self.subTest(chapters=count),
                  patch.object(assets, "read_json", side_effect=[{"versione": 1, "capitoli": chapters},
                                                                {"capitoli": themes, "palette": palette}]),
                  patch.object(assets, "local_path", side_effect=lambda value, *args: Path(value))):
                self.assertEqual(assets.check_plan(), chapters)

    def test_empty_plan_is_rejected(self):
        with patch.object(assets, "read_json", return_value={"versione": 1, "capitoli": []}):
            with self.assertRaisesRegex(ValueError, "almeno un capitolo"):
                assets.check_plan()

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


class OpeningSeriesTests(unittest.TestCase):
    """La serie attiva deve restare nativa e riconciliata con il piano unico."""

    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name).resolve()
        self.base = self.root / "assets/booklet/aperture-attive"
        source = ROOT / "assets/booklet/aperture-imagegen-svg-v1"
        self.manifest = json.loads((source / "manifest.json").read_text())
        self.compositions = json.loads((source / "composizioni.json").read_text())
        self.manifest["capitoli"] = self.manifest["capitoli"][:1]
        self.compositions["capitoli"] = self.compositions["capitoli"][:1]
        chapter = json.loads((ROOT / "typst-booklet/piano.json").read_text())["capitoli"][0]
        self.plan = {"aperture": "assets/booklet/aperture-attive", "capitoli": [chapter]}
        self.legacy = json.loads((ROOT / "assets/images/aperture/manifest.json").read_text())
        for kind in ("disegno", "svg", "riferimento", "prompt"):
            relative = self.manifest["capitoli"][0][kind]
            target = self.base / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(source / relative, target)
        font_manifest = "assets/fonts/editoriali/manifest.json"
        target = self.root / font_manifest
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / font_manifest, target)
        for key in ("font", "licenza_font"):
            relative = self.manifest[key]
            shutil.copyfile(ROOT / relative, self.root / relative)
        (self.root / "typst-booklet").mkdir()
        (self.root / "typst-booklet/piano.json").write_text(json.dumps(self.plan))
        for module, key, value in ((assets, "ROOT", self.root), (common, "ROOT", self.root),
                                   (assets, "BOOKLET", self.root / "typst-booklet")):
            replacement = patch.object(module, key, value)
            replacement.start()
            self.addCleanup(replacement.stop)
        paths = patch.object(assets, "local_path", side_effect=lambda value, base=None:
                             common.local_path(value, self.root if base is None else base))
        paths.start()
        self.addCleanup(paths.stop)

    def check(self):
        (self.base / "manifest.json").write_text(json.dumps(self.manifest))
        (self.base / "composizioni.json").write_text(json.dumps(self.compositions))
        assets.check_opening_series(self.plan, self.plan["capitoli"], self.legacy["palette"],
                                    self.legacy["capitoli"])

    def replace_asset(self, kind, old, new):
        entry = self.manifest["capitoli"][0]
        path = self.base / entry[kind]
        original = path.read_text()
        self.assertIn(old, original)
        path.write_text(original.replace(old, new, 1))
        entry["sha256_" + kind] = digest(path)

    def test_native_series_and_separate_text_are_accepted(self):
        self.check()

    def test_duplicate_or_missing_chapters_are_rejected(self):
        for key in ("manifest", "compositions"):
            data = getattr(self, key)
            original = deepcopy(data["capitoli"])
            for entries in ([], original * 2):
                with self.subTest(source=key, entries=len(entries)):
                    data["capitoli"] = entries
                    with self.assertRaisesRegex(ValueError, "diversi dal piano o duplicati"):
                        self.check()
            data["capitoli"] = original

    def test_provenance_hash_cannot_be_silently_changed(self):
        entry = self.manifest["capitoli"][0]
        path = self.base / entry["prompt"]
        path.write_text(path.read_text() + "\nModifica non registrata.\n")
        with self.assertRaisesRegex(ValueError, "Hash non coerente"):
            self.check()

    def test_raster_or_text_in_background_is_rejected_even_with_updated_hash(self):
        entry = self.manifest["capitoli"][0]
        path = self.base / entry["disegno"]
        original = path.read_text()
        for element in ('<image href="originale.png"/>', '<text>01</text>'):
            with self.subTest(element=element):
                path.write_text(original.replace("</svg>", element + "</svg>"))
                entry["sha256_disegno"] = digest(path)
                with self.assertRaisesRegex(ValueError, "soltanto forme SVG native"):
                    self.check()

    def test_nonfinite_or_boolean_text_coordinates_are_rejected(self):
        title = self.compositions["capitoli"][0]["titolo"]
        for value in (float("nan"), float("inf"), True, -1, 1055):
            with self.subTest(x=value):
                title["x"] = value
                with self.assertRaisesRegex(ValueError, "Quote titolo non valide"):
                    self.check()

    def test_font_must_match_the_licensed_editorial_font(self):
        self.compositions["font"] = "assets/fonts/altro.ttf"
        with self.assertRaisesRegex(ValueError, "font editoriale autorizzato"):
            self.check()

    def test_valid_coordinates_must_still_match_the_approved_svg(self):
        self.compositions["capitoli"][0]["titolo"]["x"] += 10
        with self.assertRaisesRegex(ValueError, "Quote SVG diverse dalle composizioni"):
            self.check()

    def test_svg_text_must_match_the_canonical_title(self):
        self.replace_asset("svg", ">Storia del<", ">Storia del?<")
        with self.assertRaisesRegex(ValueError, "Testi SVG diversi dal piano"):
            self.check()

    def test_portable_and_active_geometry_cannot_diverge(self):
        self.replace_asset("disegno", "M438 535", "M437 535")
        with self.assertRaisesRegex(ValueError, "Geometria dell'esecutivo diversa"):
            self.check()

    def test_background_must_keep_the_chapter_color(self):
        self.replace_asset("disegno", 'fill="#FFA2A2"', 'fill="#FFB86A"')
        with self.assertRaisesRegex(ValueError, "Campitura principale diversa"):
            self.check()


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
