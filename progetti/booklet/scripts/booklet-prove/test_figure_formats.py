"""Figure formats are explicit arguments, including parity-aware outer bleed."""

import json
from pathlib import Path
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from booklet.common import BOOKLET, run, typst_options


class FigureFormatTests(unittest.TestCase):
    def evaluate(self, body, expression):
        folder = BOOKLET / "build/verifiche"
        folder.mkdir(parents=True, exist_ok=True)
        with tempfile.TemporaryDirectory(dir=folder) as temporary:
            source = Path(temporary) / "formats.typ"
            source.write_text('''#import "/progetti/booklet/template/layout.typ": booklet
#import "/progetti/booklet/template/figures.typ": image-figure
#show: booklet
#let file = path("/risorse-condivise/immagini/figure/colore/schema-monocromatico.svg")
''' + body, encoding="utf-8")
            return json.loads(run(["typst", "eval", *typst_options(), "--in", str(source), expression]))

    def test_invalid_format_fails_at_the_call(self):
        with self.assertRaisesRegex(ValueError, "Unknown figure format"):
            self.evaluate('#image-figure(file, [Caption], format: "missing")', 'query(figure).len()')

    def test_outer_bleed_reaches_the_correct_edge_on_both_pages(self):
        body = '''#set page(columns: 1)
#for n in range(2) {
  if n > 0 { pagebreak() }
  image-figure(file, [Didascalia e diritti nella gabbia.],
    format: "al-vivo-esterno", id: "outer-" + str(n), placement: none)
}'''
        expression = '''{ query(<booklet-al-vivo-esterno>).map(m => (
          page: m.location().page(), left: (m.location().position().x + m.value.x) / 1pt,
          width: m.value.larghezza / 1pt,
          height: m.value.altezza / 1pt, max-height: (205mm - 35mm - 8pt) / 1pt,
          page-width: 170mm / 1pt,
        )) }'''
        data = self.evaluate(body, expression)
        self.assertEqual([item['page'] for item in data], [1, 2])
        self.assertAlmostEqual(data[0]['left'] + data[0]['width'], data[0]['page-width'], places=3)
        self.assertAlmostEqual(data[1]['left'], 0, places=3)
        self.assertAlmostEqual(data[0]['width'], data[1]['width'], places=3)
        for item in data:
            self.assertGreater(item['height'], 0)
            self.assertLess(item['height'], item['max-height'])

    def test_shared_template_has_no_chapter_specific_modules(self):
        removed = {'accessibilita', 'colore', 'composizione', 'consigli-tipografia',
                   'gestalt', 'griglia', 'ricerca', 'schemi-accessibilita'}
        self.assertFalse(removed & {p.stem for p in (BOOKLET / 'template').glob('*.typ')})
        for chapter in (BOOKLET / 'capitoli').glob('*.typ'):
            self.assertNotIn('@figura ', chapter.read_text(encoding='utf-8'))


if __name__ == "__main__":
    unittest.main()
