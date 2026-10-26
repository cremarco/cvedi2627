"""Independent examples keep separate assets, captions, rights and native labels."""

import json
from pathlib import Path
import sys
import unittest
import xml.etree.ElementTree as ET

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from booklet.common import BOOKLET, ROOT, digest, run, typst_options

BASE = BOOKLET / "assets/figure-singole"
SVG = "{http://www.w3.org/2000/svg}"
XLINK = "{http://www.w3.org/1999/xlink}href"


class IndependentFigureTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.manifest = json.loads((BASE / "manifest.json").read_text(encoding="utf-8"))

    def test_copies_and_svg_panels_preserve_source_images(self):
        for entry in self.manifest["assets"]:
            with self.subTest(asset=entry["file"]):
                source, target = ROOT / entry["source"], BASE / entry["file"]
                self.assertEqual(digest(source), entry["source_sha256"])
                self.assertEqual(digest(target), entry["sha256"])
                if entry["method"] == "copy":
                    self.assertEqual(source.read_bytes(), target.read_bytes())
                else:
                    original = ET.parse(source).getroot()
                    group = list(original.findall(SVG + "g")[-1])[entry["panel"]]
                    panel = ET.parse(target).getroot()
                    before, after = list(group.iter(SVG + "image")), list(panel.iter(SVG + "image"))
                    self.assertEqual(len(before), 1)
                    self.assertEqual(len(after), 1)
                    self.assertEqual(before[0].get(XLINK, before[0].get('href')),
                                     after[0].get(XLINK, after[0].get('href')))
                    # The screenshot's indicative palette stays with its own panel.
                    self.assertEqual([r.attrib for r in group.iter(SVG + "rect")],
                                     [r.attrib for r in panel.iter(SVG + "rect")])

    def test_replaced_composites_are_no_longer_used_in_chapters(self):
        source = "\n".join(p.read_text(encoding="utf-8") for p in (BOOKLET / "capitoli").glob("*.typ"))
        for entry in self.manifest["assets"]:
            if "previous_composite" in entry:
                self.assertNotIn('path("/' + entry["previous_composite"] + '")', source)
            elif entry["method"] == "svg-panel":
                self.assertNotIn('path("/' + entry["source"] + '")', source)

    def test_doisneau_and_widener_are_separate_but_takete_maluma_stays_paired(self):
        expression = r'''{
          query(figure.where(kind: image)).filter(f => f.has("label") and f.label in
            (<fig-comp-doisneau-widener>, <fig-comp-widener>, <fig-comp-takete-maluma>))
          .map(f => (id: str(f.label), caption: repr(f.caption),
            images: repr(f.body).matches(regex("image\\(")).len()))
        }'''
        source = BOOKLET / "capitoli/08-composizione-gerarchia.typ"
        data = json.loads(run(["typst", "eval", *typst_options(), "--in", str(source), expression]))
        data = {item["id"].strip("<>"): item for item in data}
        self.assertEqual(len(data), 3)
        first, second = data["fig-comp-doisneau-widener"], data["fig-comp-widener"]
        self.assertEqual((first["images"], second["images"]), (1, 1))
        self.assertIn("Doisneau", first["caption"])
        self.assertNotIn("Widener", first["caption"])
        self.assertIn("Widener", second["caption"])
        self.assertNotIn("Doisneau", second["caption"])
        self.assertEqual(data["fig-comp-takete-maluma"]["images"], 2)


if __name__ == "__main__":
    unittest.main()
