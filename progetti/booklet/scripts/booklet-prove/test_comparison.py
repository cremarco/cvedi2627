"""Il confronto rileva cambiamenti reali, senza dipendere da metadata o id PDF."""

from pathlib import Path
import importlib.util
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from booklet.comparison import MAX_SIDE, compare, document_snapshot


@unittest.skipUnless(importlib.util.find_spec("pypdfium2"), "Serve PDFium per confrontare la resa.")
class ComparisonTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)

    def pdf(self, name, text="Prova", x=12, color="1 0 0", uri="https://example.org", metadata="prima"):
        from pypdf import PdfWriter
        from pypdf.generic import (ArrayObject, DecodedStreamObject, DictionaryObject,
                                   FloatObject, NameObject, TextStringObject)
        writer = PdfWriter()
        page = writer.add_blank_page(100, 140)
        if metadata == "dopo":
            writer._add_object(DictionaryObject())  # Cambia anche gli id delle risorse successive.
        font = DictionaryObject({NameObject("/Type"): NameObject("/Font"),
                                 NameObject("/Subtype"): NameObject("/Type1"),
                                 NameObject("/BaseFont"): NameObject("/Helvetica")})
        page[NameObject("/Resources")] = DictionaryObject({NameObject("/Font"): DictionaryObject({
            NameObject("/F1"): writer._add_object(font)})})
        stream = DecodedStreamObject()
        stream.set_data(f"q {color} rg 10 10 20 20 re f Q BT /F1 12 Tf 1 0 0 1 {x} 80 Tm ({text}) Tj ET".encode())
        page[NameObject("/Contents")] = writer._add_object(stream)
        link = DictionaryObject({NameObject("/Type"): NameObject("/Annot"),
            NameObject("/Subtype"): NameObject("/Link"),
            NameObject("/Rect"): ArrayObject([FloatObject(n) for n in (10, 70, 60, 90)]),
            NameObject("/A"): DictionaryObject({NameObject("/S"): NameObject("/URI"),
                                               NameObject("/URI"): TextStringObject(uri)})})
        page[NameObject("/Annots")] = ArrayObject([writer._add_object(link)])
        writer.add_metadata({"/CreationDate": metadata})
        path = self.root / f"{name}.pdf"
        writer.write(path)
        return document_snapshot(path)

    @staticmethod
    def envelope(document):
        return {"schema": "test", "max_side": MAX_SIDE, "renderer": "test", "wrapper": "test",
                "targets": {"prova": {**document, "inventory": "identico"}}}

    def test_metadata_changes_do_not_change_the_snapshot(self):
        before = self.pdf("prima")
        self.assertEqual(before, self.pdf("dopo", metadata="dopo"))
        self.assertLessEqual(max(before["pages"][0]["raster_size"]), MAX_SIDE)

    def test_text_positions_drawing_and_links_are_checked_independently(self):
        before = self.envelope(self.pdf("prima"))
        for field, changes in (("text", {"text": "Dopo"}),
                               ("positioned_text", {"x": 14}),
                               ("pixels", {"color": "0 0 1"}),
                               ("links", {"uri": "https://example.org/dopo"})):
            with self.subTest(field=field):
                after = self.envelope(self.pdf(field, **changes))
                report = compare(before, after)
                self.assertEqual(report["esito"], "errore")
                self.assertIn(field, report["differences"][0]["fields"])
                if field in ("pixels", "links"):
                    self.assertEqual(before["targets"]["prova"]["pages"][0]["positioned_text"],
                                     after["targets"]["prova"]["pages"][0]["positioned_text"])

    def test_page_count_and_inventory_changes_cannot_pass(self):
        before = self.envelope(self.pdf("prima"))
        after = self.envelope(self.pdf("dopo"))
        after["targets"]["prova"]["inventory"] = "modificato"
        after["targets"]["prova"]["pages"].append(after["targets"]["prova"]["pages"][0])
        report = compare(before, after)
        self.assertEqual(report["esito"], "errore")
        self.assertEqual([d["fields"] for d in report["differences"]],
                         [["inventory"], ["numero pagine"]])


if __name__ == "__main__":
    unittest.main()
