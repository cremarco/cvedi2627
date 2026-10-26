"""Chapter-owned figure properties reach native captions, images and labels."""

import json
from pathlib import Path
import re
import sys
import tempfile
import unittest
from pypdf import PdfReader

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from booklet.common import BOOKLET, run, typst_options


class EditorialFigureTests(unittest.TestCase):
    def test_editing_properties_updates_image_native_drawing_and_spread(self):
        source_text = r'''#import "/progetti/booklet/template/layout.typ": booklet
#import "/progetti/booklet/template/figures.typ": image-figure
#import "/progetti/booklet/template/editorial.typ": caption-content
#import "/progetti/booklet/assets/diagrams/typography-examples.typ": booking-specimen
#show: booklet
#let revision = sys.inputs.at("revision")
#let file = path("/risorse-condivise/immagini/figure/colore/schema-monocromatico.svg")
#image-figure(file, [Caption #revision], format: "una-colonna", id: "image-" + revision,
  rights: [Rights #revision], alt: "Alternative " + revision, height: 60mm, aspect-ratio: 1)
#figure([#booking-specimen()], kind: image,
  caption: caption-content([Caption #revision], rights: [Rights #revision]))#label("native-" + revision)
#image-figure(path("/risorse-condivise/immagini/figure/griglia/diagrammi/370-anatomia-doppia-pagina.svg"),
  [Caption #revision], format: "doppia-pagina", id: "spread-" + revision,
  dimensions: (964, 300), rights: [Rights #revision], alt: "Alternative " + revision,
  left-body: [Testo della pagina sinistra.], right-body: [Testo della pagina destra.])
'''
        folder = BOOKLET / "build/verifiche"
        folder.mkdir(parents=True, exist_ok=True)
        with tempfile.TemporaryDirectory(dir=folder) as temporary:
            source = Path(temporary) / "properties.typ"
            source.write_text(source_text, encoding="utf-8")
            expression = '''{ query(figure.where(kind: image)).map(f => (
              id: str(f.label), caption: repr(f.caption), body: repr(f.body))) }'''
            for revision in ("before", "after"):
                with self.subTest(revision=revision):
                    inputs = {"revision": revision}
                    data = json.loads(run(["typst", "eval", *typst_options(inputs), "--in", str(source), expression]))
                    self.assertEqual({f["id"] for f in data},
                        {f"image-{revision}", f"native-{revision}", f"spread-{revision}"})
                    for figure in data[:2]:
                        self.assertIn("Caption", figure["caption"])
                        self.assertIn("Rights", figure["caption"])
                        self.assertIn(revision, figure["caption"])
                    self.assertIn("Alternative " + revision, data[0]["body"])
                    self.assertIn("Alternative " + revision, data[2]["body"])
                    output = Path(temporary) / (revision + ".pdf")
                    run(["typst", "compile", *typst_options(inputs), str(source), str(output)])
                    text = re.sub(r"\s+", "", "".join(p.extract_text() or "" for p in PdfReader(output).pages))
                    self.assertEqual(text.count("Caption" + revision), 3)
                    self.assertEqual(text.count("Rights" + revision), 3)


if __name__ == "__main__":
    unittest.main()
