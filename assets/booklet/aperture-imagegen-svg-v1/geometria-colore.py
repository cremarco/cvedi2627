"""Regolarizza Colore con ellissi e tangenti esatte, senza cubiche libere."""
from pathlib import Path
import json
import math
import xml.etree.ElementTree as ET

BASE = Path(__file__).resolve().parent
ET.register_namespace("", "http://www.w3.org/2000/svg")


def fmt(value):
    return f"{value:.6f}".rstrip("0").rstrip(".")


def point(p):
    return " ".join(fmt(v) for v in p)


def arc(r, sweep, end):
    return f"A{point(r)} 0 0 {sweep} {point(end)}"


def tangent(c1, r1, c2, r2):
    # Tangente interna comune a due ellissi con assi paralleli.
    # Il supporto dell'ellisse fornisce il punto di tangenza esatto.
    def support(r, n):
        h = math.hypot(r[0] * n[0], r[1] * n[1])
        return (r[0] ** 2 * n[0] / h, r[1] ** 2 * n[1] / h)

    def residual(t):
        n = (-math.cos(t), math.sin(t))
        distance = sum(n[i] * (c2[i] - c1[i]) for i in range(2))
        return distance - math.hypot(r1[0] * n[0], r1[1] * n[1]) - math.hypot(r2[0] * n[0], r2[1] * n[1])

    lo, hi = 0., math.pi / 2
    assert residual(lo) < 0 < residual(hi), "Le ellissi non ammettono la tangente prevista."
    for _ in range(90):
        mid = (lo + hi) / 2
        if residual(mid) > 0:
            hi = mid
        else:
            lo = mid
    t = (lo + hi) / 2
    n = (-math.cos(t), math.sin(t))
    s1, s2 = support(r1, n), support(r2, n)
    a = tuple(c1[i] + s1[i] for i in range(2))
    b = tuple(c2[i] - s2[i] for i in range(2))
    direction = tuple(b[i] - a[i] for i in range(2))
    assert abs(sum(direction[i] * n[i] for i in range(2))) < 1e-8
    return a, b


def main():
    g = json.loads((BASE / "geometria-colore.json").read_text())
    a, b = g["giro_alto"], g["giro_destro"]
    ca, cb = a["centro"], b["centro"]
    cai = a.get("centro_interno", ca)
    oa, ia = a["raggi_esterni"], a["raggi_interni"]
    ob, ib = b["raggi_esterni"], b["raggi_interni"]
    p1, p2 = tangent(ca, oa, cb, ib)
    q1, q2 = tangent(cai, ia, cb, ob)
    lower, flare, cap = g["giro_basso"], g["uscita_bassa"], g["uscita_alta"]
    start, end = lower["inizio_esterno"], lower["fine_esterno"]
    rx = lower["raggio_x_esterno"]
    sine = math.sqrt(1 - ((end[0] - start[0]) / rx) ** 2)
    cy = (end[1] + sine * start[1]) / (1 + sine)
    lower_r = (rx, cy - start[1])
    lc, lr = lower["centro_interno"], lower["raggi_interni"]
    fc, fr = flare["centro"], flare["raggi"]
    cc, co, ci = cap["centro"], cap["raggi_esterni"], cap["raggi_interni"]
    assert cb[1] + ib[1] == start[1]
    assert cb[1] + ob[1] == lc[1] - lr[1]
    assert lc[1] + lr[1] == fc[1] - fr[1] and lc[0] == fc[0]
    assert ca[1] - oa[1] == cc[1] + co[1]
    assert cai[1] - ia[1] == cc[1] + ci[1]
    d = " ".join([
        f"M{point((cc[0], cc[1] + co[1]))}",
        f"H{fmt(ca[0])}", arc(oa, 0, p1), f"L{point(p2)}",
        arc(ib, 1, (cb[0], cb[1] + ib[1])), f"H{fmt(start[0])}",
        arc(lower_r, 0, end), f"H{fmt(fc[0] + fr[0])}",
        arc(fr, 0, (fc[0], fc[1] - fr[1])), arc(lr, 1, (lc[0], lc[1] - lr[1])),
        f"H{fmt(cb[0])}", arc(ob, 0, q2), f"L{point(q1)}",
        arc(ia, 1, (cai[0], cai[1] - ia[1])), f"H{fmt(cc[0])}",
        arc(ci, 0, (cc[0] + ci[0], cc[1])), f"H{fmt(cc[0] + co[0])}",
        arc(co, 1, (cc[0], cc[1] + co[1])), "Z",
    ])
    source = BASE / "disegni/05-colore.svg"
    tree = ET.parse(source)
    root = tree.getroot()
    root.set("overflow", "hidden")
    replacements = {
        "contorno-nastro": d,
        "campo-giallo": "M0 451H170A234 199 0 0 1 404 650V1008H0Z",
        "campo-menta": "M521 580H305A260 276 0 0 0 45 856V1491H521Z",
        "campo-bianco": "M45 1225H245A317 266 0 0 1 562 1491H45Z",
        "campo-violetto": "M939 335A116 117 0 0 1 1055 218V690H939Z",
        "contesto-inferiore": "M1055 1098H894A266 240 0 0 0 628 1338V1491H1055Z",
        # Il campo scuro entra sotto il nastro, evitando un secondo bordo visibile.
        "contesto-superiore": "M754 0H1055V690H939L730 625L754 573A250 222 0 0 1 754 129V0Z",
    }
    for identifier, path in replacements.items():
        el = root.find(f'.//*[@id="{identifier}"]')
        assert el is not None, identifier
        el.set("d", path)
    # Le sagome esterne ora contengono soltanto archi A e rette H/V/L.
    for el in root.iter():
        if el.tag.endswith("path"):
            assert not any(command in el.get("d", "") for command in ("C", "c", "Q", "q", "S", "s"))
    ET.indent(root, space="  ")
    tree.write(source, encoding="utf-8", xml_declaration=True)
    out = BASE.parents[2] / "reports/booklet-aperture-svg-v1/geometria-colore.json"
    out.write_text(json.dumps({"curve": "Archi ellittici nativi", "rette": "Tangenti interne comuni alle ellissi",
        "tangente_bordo_1": [p1, p2], "tangente_bordo_2": [q1, q2],
        "curva_inferiore_esterna": {"centro": [start[0], cy], "raggi": lower_r},
        "cubiche_libere": 0}, ensure_ascii=False, indent=2) + "\n")
    print("Colore ricostruito con soli archi ellittici e rette; tangenti verificate matematicamente.")


if __name__ == "__main__":
    main()
