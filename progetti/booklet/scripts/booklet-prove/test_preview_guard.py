"""Prove del blocco prima dell'apertura, senza invocare la preview di Codex."""

import importlib.util
import json
from pathlib import Path
import re
import subprocess
import sys
import tempfile
import unittest


SCRIPT = Path(__file__).resolve().parents[4] / "scripts/booklet-preview-guard.py"
SPEC = importlib.util.spec_from_file_location("preview_guard", SCRIPT)
guard = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(guard)


def event(path, *, cwd=None, tool="mcp__codex_app__open_in_codex"):
    return {"hook_event_name": "PreToolUse", "tool_name": tool,
            "cwd": str(cwd or guard.ROOT),
            "tool_input": {"target": {"type": "file", "path": str(path)}}}


class PreviewGuardTests(unittest.TestCase):
    def test_volume_and_chapter_pdfs_blocked_even_when_missing_or_small(self):
        for name in ("build/booklet.pdf", "build/anteprime/06-tipografia.pdf", "new.PDF"):
            for path in (guard.BOOKLET / name, Path("progetti/booklet") / name):
                with self.subTest(path=str(path)):
                    self.assertIsNotNone(guard.denied_reason(event(path)))

    def test_relative_paths_from_subdirectory_and_parent_segments(self):
        self.assertIsNotNone(guard.denied_reason(event(
            "../build/booklet.pdf", cwd=guard.BOOKLET / "capitoli")))
        self.assertIsNotNone(guard.denied_reason(event(
            "progetti/booklet/build/../build/booklet.pdf")))

    def test_png_sources_and_other_tools_are_unaffected(self):
        self.assertIsNone(guard.denied_reason(event(guard.BOOKLET / "build/pagina.png")))
        self.assertIsNone(guard.denied_reason(event(guard.BOOKLET / "main.typ")))
        self.assertIsNone(guard.denied_reason(event(guard.BOOKLET / "build/booklet.pdf", tool="Bash")))
        self.assertIsNone(guard.denied_reason({"tool_name": "open_in_codex",
                                             "tool_input": {"target": {"type": "review"}}}))

    def test_renamed_large_pdf_copy_blocked_only_for_this_project(self):
        with tempfile.TemporaryDirectory() as temp:
            path = Path(temp) / "copia.pdf"
            with path.open("wb") as f:
                f.truncate(guard.MAX_PDF_BYTES)
            self.assertIsNotNone(guard.denied_reason(event(path)))
            self.assertIsNone(guard.denied_reason(event(path, cwd=temp)))
            path.write_bytes(b"small")
            self.assertIsNone(guard.denied_reason(event(path)))

    def test_symlink_to_booklet_is_blocked(self):
        with tempfile.TemporaryDirectory() as temp:
            link = Path(temp) / "volume.pdf"
            link.symlink_to(guard.BOOKLET / "build/booklet.pdf")
            self.assertIsNotNone(guard.denied_reason(event(link, cwd=temp)))

    def test_hook_json_denial_and_invalid_input(self):
        for payload in (json.dumps(event(guard.BOOKLET / "build/booklet.pdf")), "invalid"):
            result = subprocess.run([sys.executable, str(SCRIPT)], input=payload,
                                    text=True, capture_output=True, check=True)
            output = json.loads(result.stdout)["hookSpecificOutput"]
            self.assertEqual(output["hookEventName"], "PreToolUse")
            self.assertEqual(output["permissionDecision"], "deny")
        allowed = subprocess.run([sys.executable, str(SCRIPT)],
                                 input=json.dumps(event("pagina.png")),
                                 text=True, capture_output=True, check=True)
        self.assertEqual(allowed.stdout, "")

    def test_installed_config_invokes_the_guard_from_a_subdirectory(self):
        config = json.loads((guard.ROOT / ".codex/hooks.json").read_text())
        groups = config["hooks"]["PreToolUse"]
        self.assertEqual(len(groups), 1)
        group = groups[0]
        for name in ("mcp__codex_app__open_in_codex", "open_in_codex"):
            self.assertRegex(name, group["matcher"])
        self.assertIsNone(re.search(group["matcher"], "exec_command"))
        handler = group["hooks"][0]
        self.assertEqual(handler["type"], "command")
        self.assertLessEqual(handler["timeout"], 5)
        result = subprocess.run(handler["command"], shell=True,
                                cwd=guard.BOOKLET / "capitoli",
                                input=json.dumps(event(guard.BOOKLET / "build/non-esiste.pdf")),
                                text=True, capture_output=True, check=True)
        self.assertEqual(json.loads(result.stdout)["hookSpecificOutput"]["permissionDecision"], "deny")


if __name__ == "__main__":
    unittest.main()
