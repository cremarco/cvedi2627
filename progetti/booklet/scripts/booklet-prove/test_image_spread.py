"""Independent silhouettes retain captions, references, notes and overflowing prose."""

import json
from pathlib import Path
import sys
import tempfile
import unittest

from pypdf import PdfReader
import pypdfium2 as pdfium

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from booklet.common import BOOKLET, run, typst_options


class ImageSpreadTests(unittest.TestCase):
    @staticmethod
    def shell_source(width=140, x=124):
        return '''#import "/progetti/booklet/template/layout.typ": booklet
#import "/progetti/booklet/template/figures.typ": image-spread
#import "/progetti/booklet/template/geometry.typ": page-margins, body-bottom-margin
#show: booklet
#set page(margin: page-margins(bottom: body-bottom-margin), footer: none)
#set text(size: 11pt)
#set par(leading: 2.5pt)
#image-spread(((
  file: path("/progetti/booklet/assets/forme-naturali-scontornate/immagini/conchiglia.png"),
  profile: json(path("/progetti/booklet/assets/forme-naturali-scontornate/profili/conchiglia.json")),
  format: "sagoma", id: "central-shell", page: 0, x: X_POSITIONpt, y: 100pt,
  width: IMAGE_WIDTHpt, caption-x: 201pt,
  caption: [An independent caption.], alt: "A transparent shell.",
),), pages: 1)[
  #([The original prose flows around the image without isolated lines,
    stretched word spaces or lost words. Every reader follows the same order
    through the columns, and the complete text continues on the next page. ] * 30)
]
'''.replace("IMAGE_WIDTH", str(width)).replace("X_POSITION", str(x))

    def test_central_silhouette_keeps_lines_continuous_and_word_spaces_natural(self):
        with tempfile.TemporaryDirectory(dir=BOOKLET / "build/verifiche") as temporary:
            source, pdf = Path(temporary) / "shell.typ", Path(temporary) / "shell.pdf"
            source.write_text(self.shell_source(), encoding="utf-8")
            run(["typst", "compile", *typst_options(), str(source), str(pdf)])
            with pdfium.PdfDocument(str(pdf)) as document:
                page = document[0]
                text = page.get_textpage()
                rows = (set(), set())
                spaces = []
                for index in range(text.count_chars()):
                    char = text.get_text_range(index, 1)
                    left, bottom, right, top = text.get_charbox(index)
                    y = page.get_height() - (top + bottom) / 2
                    if not 155 < y < 280:
                        continue
                    column = 0 if left < 230 else 1
                    if char in "aeo":
                        rows[column].add(round(y, 1))
                    if char == " ":
                        spaces.append(right - left)
                for column in rows:
                    positions = sorted(column)
                    self.assertGreaterEqual(len(positions), 8)
                    # Contour steps can shift a baseline slightly; they must not
                    # leave an empty line (two 13.5 pt baseline intervals).
                    self.assertLessEqual(max(b - a for a, b in zip(positions, positions[1:])), 18)
                self.assertGreater(len(spaces), 20)
                self.assertLess(max(spaces), 6)

    def test_central_silhouette_rejects_geometry_that_closes_both_reading_channels(self):
        with tempfile.TemporaryDirectory(dir=BOOKLET / "build/verifiche") as temporary:
            source = Path(temporary) / "too-wide.typ"
            source.write_text(self.shell_source(width=170, x=110), encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "text on both sides of a central silhouette"):
                run(["typst", "compile", *typst_options(), str(source), str(source.with_suffix(".pdf"))])

    def test_three_images_share_two_pages_and_release_all_remaining_prose(self):
        source_text = '''#import "/progetti/booklet/template/layout.typ": booklet
#import "/progetti/booklet/template/figures.typ": image-spread
#import "/progetti/booklet/template/geometry.typ": page-margins, body-bottom-margin, body-folio-drop
#import "/progetti/booklet/template/footnotes.typ": note-reference
#show: booklet
#set page(margin: page-margins(bottom: body-bottom-margin), footer-descent: body-folio-drop)
#set text(size: 11pt)
#set par(leading: 2.5pt)
#show footnote.entry: none
#set footnote.entry(separator: none, clearance: 0pt, gap: 0pt)
#show footnote: note-reference
#let item(id, page, x, y) = (
  file: path("/progetti/booklet/assets/forme-naturali-scontornate/immagini/fiore.png"),
  profile: json(path("/progetti/booklet/assets/forme-naturali-scontornate/profili/fiore.json")),
  format: "sagoma", id: id, page: page, x: x, y: y, width: 80pt,
  caption: [Caption #id], rights: [Rights #id], alt: "Alternative " + id,
)
Preliminary page.
#image-spread((item("first", 0, 0pt, 0pt), item("second", 0, 200pt, 250pt),
  item("third", 1, 90pt, 160pt)), start-page: "even")[
  #for i in range(35) {
    [#metadata(i) <sequence-paragraph>]
    [Paragraph #i. The prose continues through both shaped pages and returns to
      ordinary flow afterwards. Every paragraph keeps its original order and
      its native references, regardless of the positions of the illustrations.
      Captions and copyright text stay editable beside the individual images.]
    if i in (0, 34) { footnote[Note #i.] }
    parbreak()
  }
]
References: @first, @second, @third.
'''
        folder = BOOKLET / "build/verifiche"
        with tempfile.TemporaryDirectory(dir=folder) as temporary:
            source = Path(temporary) / "sequence.typ"
            source.write_text(source_text, encoding="utf-8")
            expression = '''(
              figures: query(figure.where(kind: image)).map(f => str(f.label)),
              placements: query(<booklet-image-sequence>).map(m => (id: m.value.id, page: m.location().page())),
              paragraphs: query(<sequence-paragraph>).map(m => (index: m.value, page: m.location().page())),
              notes: query(footnote).len(), entries: query(<booklet-note-entry>).len(),
            )'''
            data = json.loads(run(["typst", "eval", *typst_options(), "--in", str(source), expression]))
            self.assertEqual([item.strip("<>") for item in data["figures"]], ["first", "second", "third"])
            self.assertEqual([item["page"] for item in data["placements"]], [2, 2, 3])
            self.assertEqual([item["index"] for item in data["paragraphs"]], list(range(35)))
            self.assertEqual(data["paragraphs"][0]["page"], 2)
            self.assertGreater(data["paragraphs"][-1]["page"], 3)
            self.assertEqual((data["notes"], data["entries"]), (2, 2))
            pdf = Path(temporary) / "sequence.pdf"
            run(["typst", "compile", *typst_options(), str(source), str(pdf)])
            text = " ".join((page.extract_text() or "") for page in PdfReader(pdf).pages)
            for name in ("first", "second", "third"):
                self.assertIn("Caption " + name, text)
                self.assertIn("Rights " + name, text)


if __name__ == "__main__":
    unittest.main()
