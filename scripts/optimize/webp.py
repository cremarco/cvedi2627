#!/usr/bin/env python3
"""Recode large still WebP images only when dimensions and visual quality hold."""

from __future__ import annotations

import argparse
import tempfile
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image


def psnr(before: Image.Image, after: Image.Image) -> float:
    old = np.asarray(before.convert("RGBA"), dtype=np.float32)
    new = np.asarray(after.convert("RGBA"), dtype=np.float32)
    if not np.array_equal(old[:, :, 3], new[:, :, 3]):
        return 0.0
    alpha = old[:, :, 3:4] / 255.0
    scores = []
    for background in (0.0, 255.0):
        a = old[:, :, :3] * alpha + background * (1.0 - alpha)
        b = new[:, :, :3] * alpha + background * (1.0 - alpha)
        error = float(np.mean((a - b) ** 2))
        scores.append(99.0 if error == 0 else 10.0 * np.log10(255.0**2 / error))
    return min(scores)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--year", type=Path, required=True)
    parser.add_argument("--report", type=Path, required=True)
    args = parser.parse_args()
    lines = ["status\told_bytes\tnew_bytes\tquality\tpsnr_db\tpath"]
    for source in sorted(args.year.rglob("*.webp"), key=lambda path: path.stat().st_size, reverse=True):
        old_bytes = source.stat().st_size
        if old_bytes < 200_000:
            continue
        try:
            with Image.open(source) as old:
                if getattr(old, "n_frames", 1) != 1:
                    continue
                old.load()
                chosen = None
                with tempfile.TemporaryDirectory(prefix="webp-recode-") as directory:
                    candidate = Path(directory) / "candidate.webp"
                    for quality in (90, 95, 98, 99):
                        result = subprocess.run(
                            ["cwebp", "-quiet", "-q", str(quality), "-m", "6", "-metadata", "all",
                             str(source), "-o", str(candidate)], capture_output=True, text=True,
                        )
                        if result.returncode:
                            raise RuntimeError(result.stderr[-100:])
                        new_bytes = candidate.stat().st_size
                        if new_bytes >= old_bytes * .8 or old_bytes - new_bytes < 50_000:
                            break
                        with Image.open(candidate) as new:
                            if new.size != old.size or old.info.get("icc_profile") != new.info.get("icc_profile"):
                                raise ValueError("image dimensions or ICC profile changed")
                            score = psnr(old, new)
                        if score >= 45.0:
                            source.write_bytes(candidate.read_bytes())
                            chosen = (new_bytes, quality, score)
                            break
                if chosen:
                    lines.append(f"replaced\t{old_bytes}\t{chosen[0]}\t{chosen[1]}\t{chosen[2]:.2f}\t{source}")
                    print(f"replaced {source}: {old_bytes} -> {chosen[0]} (q={chosen[1]}, PSNR={chosen[2]:.2f})", flush=True)
                else:
                    lines.append(f"kept\t{old_bytes}\t0\t\t\t{source}")
        except Exception as error:
            lines.append(f"error:{str(error).replace(chr(9), ' ')[:60]}\t{old_bytes}\t0\t\t\t{source}")
        args.report.parent.mkdir(parents=True, exist_ok=True)
        args.report.write_text("\n".join(lines) + "\n")
    args.report.write_text("\n".join(lines) + "\n")


if __name__ == "__main__":
    main()
