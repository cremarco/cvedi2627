#!/usr/bin/env python3
"""Check local HTML and CSS asset links in the CVeDI static archive."""

from __future__ import annotations

import argparse
import re
import urllib.parse
from collections import Counter
from pathlib import Path

from bs4 import BeautifulSoup


CSS_URL = re.compile(r"url\(\s*['\"]?([^)'\"]+)", re.I)
SKIP = ("http:", "https:", "//", "data:", "mailto:", "tel:", "javascript:", "#")


def urls(path: Path):
    text = path.read_text(encoding="utf-8", errors="replace")
    if path.suffix.lower() in {".html", ".htm"}:
        soup = BeautifulSoup(text, "html.parser")
        for tag in soup.find_all(True):
            for attr in ("src", "href", "poster", "data-src", "data-full-image"):
                value = tag.get(attr)
                if isinstance(value, str):
                    yield value
            srcset = tag.get("srcset")
            if isinstance(srcset, str):
                for item in srcset.split(","):
                    yield item.strip().split(" ")[0]
    for match in CSS_URL.finditer(text):
        yield match.group(1).strip()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("root", type=Path)
    parser.add_argument("--examples", type=int, default=12)
    args = parser.parse_args()
    root = args.root.resolve()
    issues = Counter()
    examples = []
    checked = 0
    for path in root.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in {".html", ".htm", ".css"}:
            continue
        if "node_modules" in path.parts or path.stat().st_size > 2_000_000:
            continue
        for url in urls(path):
            if not url or url.startswith(SKIP) or url.startswith("{"):
                continue
            clean = urllib.parse.unquote(urllib.parse.urlsplit(url).path)
            if not clean or "${" in clean or "{{" in clean or "}" in clean:
                continue
            target = root / clean.lstrip("/") if clean.startswith("/") else path.parent / clean
            checked += 1
            if not target.exists():
                category = "media" if target.suffix.lower() in {".png", ".jpg", ".jpeg", ".jfif", ".webp", ".svg", ".gif", ".mp4", ".mov", ".pdf", ".mp3"} else "other"
                issues[category] += 1
                if len(examples) < args.examples:
                    examples.append(f"{path.relative_to(root)} -> {url}")
    print(f"checked {checked} references; missing {sum(issues.values())}: {dict(issues)}")
    for example in examples:
        print(example)


if __name__ == "__main__":
    main()
