#!/usr/bin/env python3
"""Hook PreToolUse: impedisce di caricare i PDF del booklet in Codex.

Nessuna lettura del contenuto dei PDF: bastano percorso e dimensione.
La compilazione e i controlli CLI restano disponibili.
"""

import json
from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parents[1]
BOOKLET = ROOT / "progetti/booklet"
MAX_PDF_BYTES = 20 * 1024 * 1024
REASON = (
    "Anteprima PDF bloccata per evitare il crash di Codex. "
    "Per il booklet usa `pnpm preview:booklet --pages 8-9` "
    "(massimo 8 pagine fisiche) e apri soltanto i PNG prodotti. "
    "Compila e verifica i PDF tramite CLI; consulta il volume completo in un lettore esterno."
)


def denied_reason(event):
    """Limita il controllo allo strumento che apre i pannelli di Codex."""
    name = event.get("tool_name", "")
    if not isinstance(name, str) or not name.endswith("open_in_codex"):
        return None
    payload = event.get("tool_input", {})
    if not isinstance(payload, dict):
        return None
    target = payload.get("target", {})
    if not isinstance(target, dict) or target.get("type") != "file":
        return None
    value = target.get("path")
    if not isinstance(value, str) or Path(value).suffix.lower() != ".pdf":
        return None
    cwd = Path(event.get("cwd") or ROOT)
    requested = Path(value)
    path = (cwd / requested).resolve()
    # Tutti i PDF del booklet, anche anteprime piccole o file non ancora prodotti.
    # Controllare pure il percorso lessicale conserva il blocco sui symlink.
    if path.is_relative_to(BOOKLET) or (cwd / requested).is_relative_to(BOOKLET):
        return REASON
    # Una copia rinominata del volume resta pericolosa. La soglia si applica
    # soltanto a questo progetto; gli altri lavori dell'utente restano autonomi.
    if cwd.resolve().is_relative_to(ROOT) or path.is_relative_to(ROOT):
        try:
            if path.stat().st_size >= MAX_PDF_BYTES:
                return REASON
        except OSError:
            pass  # Il tool gestirà il file assente senza caricare un PDF.
    return None


def main():
    try:
        event = json.load(sys.stdin)
        if not isinstance(event, dict):
            raise ValueError("Evento hook non valido")
        reason = denied_reason(event)
    except (ValueError, OSError, TypeError, RuntimeError) as error:
        # Un errore del hook non deve lasciare procedere il caricamento.
        reason = "Controllo anteprima non riuscito; apertura sospesa: " + str(error)
    if reason:
        print(json.dumps({"hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": reason,
        }}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
