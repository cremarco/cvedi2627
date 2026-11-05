"""Compatibility entry point for the original usability caption command."""
import runpy
import sys
from pathlib import Path

if "--lesson" not in sys.argv:
    sys.argv.extend(["--lesson", "test-usabilita"])
runpy.run_path(str(Path(__file__).with_name("lesson-captions.py")), run_name="__main__")
