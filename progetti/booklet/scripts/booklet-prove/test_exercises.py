"""Regressioni della relazione fra box al piede e fondo della pagina."""

from copy import deepcopy
from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from booklet.common import PT_MM
from booklet.inventory import check_exercises


class ExerciseLayoutTests(unittest.TestCase):
    def data(self):
        return (
            [{"id": "prova", "origine": {"pagina": 3, "x": 18 * PT_MM,
                                         "y": 100 * PT_MM}, "y_fondo": 92 * PT_MM}],
            [{"id": "prova", "pagina": 3, "dichiarata": 3, "ancora": 3}],
            [{"id": "prova", "origine": {"pagina": 3, "y": 180 * PT_MM}}],
        )

    def test_background_and_end_follow_the_exercise(self):
        check_exercises(*self.data())
        check_exercises([], [], [])

    def test_background_repeated_on_an_unrelated_page_is_rejected(self):
        exercises, backgrounds, ends = self.data()
        extra = deepcopy(backgrounds[0])
        extra.update(pagina=2, dichiarata=2)
        with self.assertRaisesRegex(ValueError, "pagine estranee"):
            check_exercises(exercises, backgrounds + [extra], ends)

    def test_background_on_another_page_is_rejected(self):
        exercises, backgrounds, ends = self.data()
        backgrounds[0].update(pagina=2, dichiarata=2)
        with self.assertRaisesRegex(ValueError, "pagina diversa"):
            check_exercises(exercises, backgrounds, ends)

    def test_overflow_or_a_second_page_is_rejected(self):
        for change in ({"pagina": 4}, {"y": 224 * PT_MM}):
            exercises, backgrounds, ends = self.data()
            ends[0]["origine"].update(change)
            with self.subTest(change=change), self.assertRaises(ValueError):
                check_exercises(exercises, backgrounds, ends)


if __name__ == "__main__":
    unittest.main()
