"""Le note URL e le pubblicazioni APA possono coesistere senza mescolare i ruoli."""

from copy import deepcopy
from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from booklet.sources import check_sources, check_unique_note_urls


class SourceRolesTest(unittest.TestCase):
    def setUp(self):
        self.roles = {"versione": 1, "capitoli": {"01": {
            "pubblicazioni": ["articolo"], "siti": {"sito": "https://example.org/guida/"}}}}
        self.data = {"capitoli": 1, "citazioni": [
            {"capitolo": 1, "chiave": "articolo", "forma": "normal", "pagina": 2}],
            "note": [{"capitolo": 1, "pagina": 2, "richiamo": '"1"',
                      "corpo": 'link(dest: "https://example.org/guida/#sezione") '
                               'link(dest: "https://doi.org/10.1234/articolo")'}]}

    def test_publication_keeps_apa_and_its_url_note(self):
        self.assertEqual(check_sources(self.data, self.roles)["pubblicazioni_citate"], 1)

    def test_site_is_rejected_even_as_invisible_citation(self):
        for form in (None, "normal", "prose"):
            with self.subTest(form=form):
                data = deepcopy(self.data)
                data["citazioni"].append({"capitolo": 1, "chiave": "sito", "forma": form, "pagina": 2})
                with self.assertRaisesRegex(ValueError, "Sito nella bibliografia"):
                    check_sources(data, self.roles)

    def test_unknown_publication_needs_classification(self):
        self.data["citazioni"][0]["chiave"] = "nuova-fonte"
        with self.assertRaisesRegex(ValueError, "Fonte da classificare"):
            check_sources(self.data, self.roles)

    def test_site_url_must_be_in_notes_of_the_same_chapter(self):
        self.data["note"][0]["capitolo"] = 2
        with self.assertRaisesRegex(ValueError, "URL del sito assente"):
            check_sources(self.data, self.roles)

    def test_note_marker_must_be_numeric(self):
        self.data["note"][0]["richiamo"] = '"a"'
        with self.assertRaisesRegex(ValueError, "non numerico"):
            check_sources(self.data, self.roles)


class UniqueNoteUrlsTest(unittest.TestCase):
    def note(self, page, *urls):
        return {"pagina": page, "corpo": " ".join(f'link(dest: "{url}")' for url in urls)}

    def test_same_url_in_two_entries_on_one_page_is_rejected(self):
        with self.assertRaisesRegex(ValueError, "URL ripetuto"):
            check_unique_note_urls([self.note(2, "https://example.org/a"),
                                    self.note(2, "https://example.org/a")])

    def test_overlap_with_a_multi_url_note_is_rejected(self):
        with self.assertRaisesRegex(ValueError, "URL ripetuto"):
            check_unique_note_urls([self.note(2, "https://example.org/a", "https://example.org/b"),
                                    self.note(2, "https://example.org/b", "https://example.org/c")])

    def test_same_url_on_different_pages_is_allowed(self):
        result = check_unique_note_urls([self.note(2, "https://example.org/a"),
                                         self.note(3, "https://example.org/a")])
        self.assertEqual(result["url_pagina"], 2)

    def test_distinct_sections_and_queries_are_not_merged(self):
        result = check_unique_note_urls([
            self.note(2, "https://example.org/a#uno", "https://example.org/a?edizione=1"),
            self.note(2, "https://example.org/a#due", "https://example.org/a?edizione=2")])
        self.assertEqual(result["url_pagina"], 4)

    def test_repeated_reference_does_not_add_an_entry(self):
        result = check_unique_note_urls([self.note(2, "https://example.org/a")])
        self.assertEqual(result["voci"], 1)


if __name__ == "__main__":
    unittest.main()
