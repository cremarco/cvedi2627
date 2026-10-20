import contextlib
import importlib.util
import io
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
SPEC = importlib.util.spec_from_file_location("uniform_samples", ROOT / "assets/booklet/tipografia-campioni-uniformi/late/generate_samples.py")
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)
MODULE.OUTPUT_DIRECTORY = Path("assets/booklet/tipografia-campioni-uniformi/classificazioni")
MODULE.SOURCES = [
    {"slug": "unifrakturmaguntia-book", "path": str(ROOT / "assets/booklet/tipografia-campioni-uniformi/classificazioni/originali/UnifrakturMaguntia-Book.ttf"), "family": "UnifrakturMaguntia", "style": "Book", "reference": "https://github.com/google/fonts/tree/main/ofl/unifrakturmaguntia", "license": "SIL Open Font License 1.1", "licensePath": "assets/booklet/tipografia-campioni-uniformi/classificazioni/originali/OFL.txt"},
    {"slug": "rockwell-regular", "path": "/System/Library/Fonts/Supplemental/Rockwell.ttc", "family": "Rockwell", "style": "Regular", "reference": "https://learn.microsoft.com/en-us/typography/font-list/rockwell"},
    {"slug": "baskerville-regular", "path": "/System/Library/Fonts/Supplemental/Baskerville.ttc", "family": "Baskerville", "style": "Regular", "reference": "https://garamond.culture.gouv.fr/fr/node/19"},
    {"slug": "copperplate-regular", "path": "/System/Library/Fonts/Supplemental/Copperplate.ttc", "family": "Copperplate", "style": "Regular", "reference": "https://learn.microsoft.com/en-us/typography/font-list/copperplate-gothic"},
    {"slug": "bradley-hand-bold", "path": "/System/Library/Fonts/Supplemental/Bradley Hand Bold.ttf", "family": "Bradley Hand", "style": "Bold", "reference": "https://learn.microsoft.com/en-us/typography/font-list/bradley-hand-itc"},
    {"slug": "academy-engraved-let-plain", "path": "/System/Library/Fonts/Supplemental/Academy Engraved LET Fonts.ttf", "family": "Academy Engraved LET", "style": "Plain", "reference": None},
]

ORIGINAL_MAKE_SAMPLE = MODULE.make_sample


def make_sample(source):
    artifact, metadata = ORIGINAL_MAKE_SAMPLE(source)
    metadata["fontBinaryCopied"] = source.get("license") == "SIL Open Font License 1.1"
    return artifact, metadata


MODULE.make_sample = make_sample


if __name__ == "__main__":
    output = io.StringIO()
    with contextlib.redirect_stdout(output):
        MODULE.main()
    payload = json.loads(output.getvalue())
    payload["manifest"]["generatorInvocation"] = "PYTHONPATH=/private/tmp/comment357-fonttools python3 assets/booklet/tipografia-campioni-uniformi/classificazioni/generate_samples.py"
    payload["files"][-1]["content"] = json.dumps(payload["manifest"], ensure_ascii=False, indent=2) + "\n"
    print(json.dumps(payload, ensure_ascii=False))
