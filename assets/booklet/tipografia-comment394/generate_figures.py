import argparse
import hashlib
import html
import json
import math
from pathlib import Path

import fontTools
import uharfbuzz as harfbuzz
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont


DIRECTORY = Path(__file__).resolve().parent
WORKSPACE = DIRECTORY.parents[2]
INK = "#2E3138"
ACCENT = "#AFC7E8"
FONT_FILES = {
    "dm-sans": "DMSans[opsz,wght].ttf",
    "roboto-serif": "RobotoSerif[GRAD,opsz,wdth,wght].ttf",
    "roboto-serif-italic": "RobotoSerif-Italic[GRAD,opsz,wdth,wght].ttf",
    "eb-garamond": "EBGaramond[wght].ttf",
}
SOURCE_URLS = {
    "dm-sans": "https://github.com/google/fonts/tree/main/ofl/dmsans",
    "roboto-serif": "https://github.com/google/fonts/tree/main/ofl/robotoserif",
    "roboto-serif-italic": "https://github.com/google/fonts/tree/main/ofl/robotoserif",
    "eb-garamond": "https://github.com/google/fonts/tree/main/ofl/ebgaramond",
}
FAMILY_NAMES = {
    "dm-sans": "DM Sans",
    "roboto-serif": "Roboto Serif",
    "roboto-serif-italic": "Roboto Serif Italic",
    "eb-garamond": "EB Garamond",
}


def number(value):
    return f"{value:.3f}".rstrip("0").rstrip(".") or "0"


def checksum(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


class Font:
    def __init__(self, key, size, weight=400, optical_size=None):
        self.key = key
        self.size = size
        self.path = DIRECTORY / "originals" / FONT_FILES[key]
        self.original = TTFont(self.path)
        self.location = {axis.axisTag: axis.defaultValue for axis in self.original["fvar"].axes}
        self.location.update(wght=weight)
        if "opsz" in self.location:
            self.location["opsz"] = optical_size or size
        self.instanced = instantiateVariableFont(self.original, self.location, inplace=False)
        self.glyphs = self.instanced.getGlyphSet()
        self.order = self.instanced.getGlyphOrder()
        self.units = self.instanced["head"].unitsPerEm
        self.scale = size / self.units
        self.hb_font = harfbuzz.Font(harfbuzz.Face(self.path.read_bytes()))
        self.hb_font.scale = (self.units, self.units)
        self.hb_font.set_variations(self.location)
        harfbuzz.ot_font_set_funcs(self.hb_font)
        self.paths = {}

    def shape(self, text, tracking=0, word_spacing=0):
        buffer = harfbuzz.Buffer()
        buffer.add_str(text)
        buffer.guess_segment_properties()
        buffer.direction = "ltr"
        buffer.script = "Latn"
        buffer.language = "it"
        harfbuzz.shape(self.hb_font, buffer, {"kern": True, "liga": True})
        result = []
        cursor = 0
        for index, (info, position) in enumerate(zip(buffer.glyph_infos, buffer.glyph_positions)):
            if info.codepoint == 0:
                raise ValueError(f"Missing glyph in {self.key}: {text!r}")
            result.append((self.order[info.codepoint], cursor + position.x_offset, position.y_offset))
            cursor += position.x_advance
            if info.cluster < len(text) and text[info.cluster] == " ":
                cursor += word_spacing / self.scale
            if index + 1 < len(buffer.glyph_infos):
                cursor += tracking / self.scale
        return result, cursor * self.scale

    def glyph_path(self, name):
        if name not in self.paths:
            pen = SVGPathPen(self.glyphs, ntos=number)
            self.glyphs[name].draw(pen)
            self.paths[name] = pen.getCommands()
        return self.paths[name]


FONT_CACHE = {}


def font(key="dm-sans", size=12, weight=400, optical_size=None):
    identity = key, size, weight, optical_size
    if identity not in FONT_CACHE:
        FONT_CACHE[identity] = Font(*identity)
    return FONT_CACHE[identity]


class Figure:
    def __init__(self, filename, width, height, title, parameters, caption):
        self.filename = filename
        self.width = width
        self.height = height
        self.title = title
        self.parameters = parameters
        self.caption = caption
        self.elements = []
        self.runs = []

    def text(self, text, horizontal, baseline, face=None, tracking=0, word_spacing=0, shear=0, role=None):
        role = role or ("label" if face is None else "sample")
        face = face or font(size=10, weight=500, optical_size=14)
        positions, advance = face.shape(text, tracking, word_spacing)
        slope = math.tan(math.radians(shear))
        paths = []
        bounds_pen = BoundsPen(face.glyphs)
        for name, offset_x, offset_y in positions:
            transform = (
                face.scale, 0, face.scale * slope, -face.scale,
                horizontal + (offset_x + slope * offset_y) * face.scale,
                baseline - offset_y * face.scale,
            )
            face.glyphs[name].draw(TransformPen(bounds_pen, transform))
            commands = face.glyph_path(name)
            if commands:
                matrix = " ".join(f"{value:.9f}".rstrip("0").rstrip(".") if index == 2 and value else number(value) for index, value in enumerate(transform))
                paths.append(f'<path d="{commands}" transform="matrix({matrix})"/>')
        bounds = list(bounds_pen.bounds) if bounds_pen.bounds else None
        if bounds:
            if bounds[0] < -0.02 or bounds[1] < -0.02 or bounds[2] > self.width + 0.02 or bounds[3] > self.height + 0.02:
                raise ValueError(f"Ink outside {self.filename}: {text!r}, {bounds}")
        self.elements.append(f'<g fill="{INK}" aria-label="{html.escape(text, quote=True)}">{"".join(paths)}</g>')
        self.runs.append({
            "role": role, "text": text, "font": face.key, "nominalSize": face.size,
            "variationLocation": face.location, "x": horizontal, "baseline": baseline,
            "advance": advance, "inkBounds": bounds, "tracking": tracking,
            "wordSpacing": word_spacing, "geometricShearDegrees": shear,
        })
        return advance

    def line(self, x1, y1, x2, y2):
        self.elements.append(f'<path d="M{number(x1)} {number(y1)}L{number(x2)} {number(y2)}" fill="none" stroke="{ACCENT}" stroke-width="0.5"/>')

    def paragraph(self, text, horizontal, baseline, width, face, leading):
        words = text.split(" ")
        lines = []
        current = ""
        for word in words:
            candidate = f"{current} {word}" if current else word
            if face.shape(candidate)[1] > width and current:
                lines.append(current)
                current = word
            else:
                current = candidate
        if current:
            lines.append(current)
        if " ".join(lines) != text:
            raise ValueError("Paragraph content changed")
        for index, line in enumerate(lines):
            if face.shape(line)[1] > width:
                raise ValueError(f"Unbreakable word exceeds measure: {line}")
            self.text(line, horizontal, baseline + index * leading, face)
        return lines

    def export(self):
        families = ", ".join(dict.fromkeys(FAMILY_NAMES[run["font"]] for run in self.runs))
        description = f"Original educational diagram. Genuine glyph outlines shaped with HarfBuzz from {families}, SIL OFL 1.1. No font substitution, horizontal scaling or clipping. Only the explicitly labelled simulated italic applies a geometric shear. Source fonts, hashes, locations and text runs are recorded in manifest.json. External editorial caption and rights are not embedded."
        svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{number(self.width)}" height="{number(self.height)}" viewBox="0 0 {number(self.width)} {number(self.height)}"><title>{html.escape(self.title)}</title><desc>{description}</desc><rect width="{number(self.width)}" height="{number(self.height)}" fill="#FFFFFF"/>{"".join(self.elements)}</svg>\n'
        path = DIRECTORY / self.filename
        path.write_text(svg)
        return {
            "file": self.filename, "width": self.width, "height": self.height,
            "title": self.title, "parameters": self.parameters, "textRuns": self.runs,
            "nativeCaptionProposal": self.caption, "sha256": checksum(path),
            "bytes": path.stat().st_size, "allInkInsideViewport": True,
            "clipPaths": False, "background": "#FFFFFF", "ink": INK, "accent": ACCENT,
        }


def figure_one():
    figure = Figure("01-segni-da-distinguere.svg", 388.35, 156, "Segni da distinguere", {"sameStrings": ["Il1", "rn m", "O0"], "nominalSize": 24, "weight": 400, "opticalSize": 24, "rankingClaim": False}, "Gli stessi segni, nello stesso ordine e allo stesso corpo, sono mostrati in DM Sans e Roboto Serif. Osserva I, l e 1, la sequenza rn rispetto a m, e O rispetto a 0; il confronto non stabilisce una classifica universale di leggibilità.")
    for label, horizontal in [("I / l / 1", 112), ("rn / m", 215), ("O / 0", 322)]:
        figure.text(label, horizontal, 16)
    for key, baseline in [("dm-sans", 64), ("roboto-serif", 116)]:
        figure.text(FAMILY_NAMES[key], 0, baseline - 5)
        for text, horizontal in [("Il1", 112), ("rn m", 215), ("O0", 322)]:
            figure.text(text, horizontal, baseline, font(key, 24))
    figure.text("Stesso corpo: 24 pt", 0, 147)
    return figure


def figure_two():
    figure = Figure("02-corpo-e-altezza-apparente.svg", 388.35, 146, "Corpo nominale e altezza della x", {"nominalSize": 12, "weight": 400, "opticalSize": 12, "sameBaselines": [44, 90, 104], "scaleCompensation": False}, "DM Sans e Roboto Serif sono composti a 12 pt, senza deformazioni né compensazioni di scala. Le guide indicano la baseline e l’altezza del glifo x: il medesimo corpo nominale non impone identiche proporzioni apparenti.")
    for key, horizontal in [("dm-sans", 0), ("roboto-serif", 201.26)]:
        face = font(key, 12)
        figure.text(f"{FAMILY_NAMES[key]} · 12 pt", horizontal, 12)
        bounds = BoundsPen(face.glyphs)
        face.glyphs[face.instanced.getBestCmap()[ord("x")]].draw(bounds)
        x_height = bounds.bounds[3] * face.scale
        figure.line(horizontal, 44, horizontal + 187.09, 44)
        figure.line(horizontal, 44 - x_height, horizontal + 187.09, 44 - x_height)
        figure.text("xxx H ag", horizontal, 44, face)
        figure.text(f"Altezza della x: {x_height:.2f} pt".replace(".", ","), horizontal, 65)
        figure.text("Il corpo nominale è uguale.", horizontal, 90, face)
        figure.text("Osserva x, H, a e g.", horizontal, 104, face)
    figure.text("Baseline comune · nessuna compensazione di scala", 0, 137)
    return figure


def figure_three():
    figure = Figure("03-interlinea.svg", 388.35, 136, "Interlinea a confronto", {"font": "dm-sans", "nominalSize": 12, "leading": [12, 16], "measure": 187.09, "sameLines": ["Il paragrafo continua.", "Ritrova l’inizio della riga.", "Mantieni lo stesso testo."]}, "Testo, font, corpo e giustezza sono uguali. Cambia soltanto l’interlinea, da 12 a 16 pt. Le tre righe mantengono le stesse parole e le stesse interruzioni; le guide rendono osservabile la distanza tra le baseline.")
    lines = figure.parameters["sameLines"]
    for leading, horizontal in [(12, 0), (16, 201.26)]:
        figure.text(f"Corpo 12 / interlinea {leading}", horizontal, 12)
        for index, text in enumerate(lines):
            baseline = 38 + index * leading
            figure.line(horizontal, baseline, horizontal + 187.09, baseline)
            figure.text(text, horizontal, baseline, font(size=12))
    figure.text("Uguali: testo, font, corpo e giustezza", 0, 125)
    return figure


def figure_four():
    text = "Parole e spazi fanno ritmo."
    figure = Figure("04-spaziatura.svg", 388.35, 172, "Spaziatura tra caratteri e parole", {"font": "dm-sans", "text": text, "nominalSize": 12, "trackingDefinition": "Added between successive shaped glyphs, including around spaces; no trailing addition.", "rows": [{"tracking": 0, "wordSpacing": 0}, {"tracking": 0.6, "wordSpacing": 0}, {"tracking": 0, "wordSpacing": 3}]}, "La stessa frase è composta in DM Sans a 12 pt. Rispetto alla spaziatura originale, nel secondo campione aumenta di 0,6 pt la distanza fra caratteri successivi; nel terzo aumentano di 3 pt soltanto gli spazi tra parole. Ogni variante modifica un solo parametro rispetto al riferimento.")
    for label, label_y, sample_y, tracking, spacing in [("Spaziatura originale", 12, 35, 0, 0), ("Fra tutti i caratteri: +0,6 pt", 69, 92, 0.6, 0), ("Solo tra le parole: +3 pt", 126, 149, 0, 3)]:
        figure.text(label, 0, label_y)
        figure.text(text, 0, sample_y, font(size=12), tracking=tracking, word_spacing=spacing)
    return figure


def figure_five():
    text = "La visita al laboratorio inizia alle 14:30. Porta il codice di prenotazione e controlla il giorno scelto prima di confermare."
    figure = Figure("05-reflow-impilato.svg", 187.09, 390, "Ricomposizione in due giustezze", {"font": "dm-sans", "text": text, "nominalSize": 12, "leading": 16, "measures": [187.09, 108], "sameContent": True, "wordBreaking": "Whitespace only; no hyphenation, truncation or horizontal scaling."}, "Lo stesso paragrafo in DM Sans a 12/16 pt occupa una giustezza di 187,09 pt e poi di 108 pt. Cambiano i ritorni a capo e l’ingombro verticale, non le parole, il corpo o l’interlinea. Entrambi i campioni mantengono integralmente il contenuto.")
    figure.text("Giustezza 187,09 pt", 0, 12)
    first_lines = figure.paragraph(text, 0, 36, 187.09, font(size=12), 16)
    second_label = 36 + (len(first_lines) - 1) * 16 + 34
    figure.text("Giustezza 108 pt", 0, second_label)
    second_lines = figure.paragraph(text, 0, second_label + 24, 108, font(size=12), 16)
    last_baseline = second_label + 24 + (len(second_lines) - 1) * 16
    figure.height = last_baseline + 16
    figure.parameters["lineBreaks"] = [first_lines, second_lines]
    figure.parameters["lastBaseline"] = last_baseline
    if figure.height > 420:
        raise ValueError("Stacked reflow exceeds available height")
    return figure


def figure_six():
    figure = Figure("06-corsivo-originale-e-simulato.svg", 187.09, 210, "Corsivo originale e inclinazione simulata", {"text": "apparato", "nominalSize": 24, "weight": 400, "opticalSize": 24, "widthAxis": 100, "grade": 0, "authenticItalicFont": "roboto-serif-italic", "simulatedFont": "roboto-serif", "simulatedShearDegrees": 12}, "La parola apparato è mostrata nel corsivo originale di Roboto Serif e nel tondo della stessa famiglia inclinato geometricamente di 12°. Corpo 24 pt, peso 400, larghezza 100 e dimensione ottica 24 restano costanti. Il secondo campione è una simulazione dichiarata: l’inclinazione non introduce il disegno del corsivo.")
    figure.text("Roboto Serif · corsivo originale", 0, 12)
    figure.text("apparato", 0, 54, font("roboto-serif-italic", 24))
    figure.text("Tondo inclinato di 12° · simulazione", 0, 104)
    figure.text("apparato", 0, 146, font("roboto-serif", 24), shear=12)
    figure.text("Stesso corpo: 24 pt", 0, 194)
    return figure


def figure_one_compact():
    text = "I l 1   rn m   O 0"
    figure = Figure("01-segni-compatto.svg", 187.09, 48, "Segni da distinguere · campione compatto", {"font": "dm-sans", "text": text, "nominalSize": 26, "weight": 400, "opticalSize": 26, "rankingClaim": False, "horizontalScaling": False}, "Stesso font e corpo: osserva I, l e 1, rn e m, O e 0 senza cambiare scala.")
    figure.text("DM Sans · 26 pt", 0, 10)
    figure.text(text, 0, 44, font(size=26))
    return figure


def figure_seven():
    lines = ["Leggi il nome e controlla", "il codice prima di confermare."]
    figure = Figure("07-densita-compatto.svg", 388.35, 44, "Densità del testo · due pesi autentici", {"font": "dm-sans", "nominalSize": 12, "leading": 14, "weightValues": [400, 700], "opticalSize": 12, "measure": 187.09, "sameLines": lines, "sameRelativeBaselines": [26, 40], "sameInkColor": INK, "horizontalScaling": False}, "Stesse parole, corpo 12/14 e giustezza; cambia solo il peso, da 400 a 700. Osserva il ritmo e gli spazi interni.")
    for weight, horizontal in [(400, 0), (700, 201.26)]:
        figure.text(f"Peso {weight}", horizontal, 10)
        face = font(size=12, weight=weight)
        for index, text in enumerate(lines):
            if face.shape(text)[1] > 187.09:
                raise ValueError("Density comparison does not fit the declared measure")
            figure.text(text, horizontal, 26 + 14 * index, face)
    return figure


def figure_eight():
    lines = ["Leggi il nome", "prima di agire."]
    figure = Figure("08-interlinea-compatto.svg", 187.09, 44, "Interlinea · confronto compatto", {"font": "dm-sans", "nominalSize": 12, "weight": 400, "opticalSize": 12, "leading": [14, 18], "measure": 86.46, "columnGap": 14.17, "sameLines": lines, "baselines": [[22, 36], [22, 40]], "horizontalScaling": False}, "Stesse parole e stesso corpo di 12 pt: cambia solo l’interlinea, da 14 a 18 pt.")
    face = font(size=12)
    for leading, horizontal in [(14, 0), (18, 100.63)]:
        figure.text(f"{leading} pt", horizontal, 10)
        for index, text in enumerate(lines):
            if face.shape(text)[1] > 86.46:
                raise ValueError("Compact leading comparison exceeds its column")
            figure.text(text, horizontal, 22 + leading * index, face)
    return figure


def figure_nine():
    figure = Figure("09-corpo-apparente-compatto.svg", 187.09, 36, "Stesso corpo nominale · proporzioni autentiche", {"fontFamilies": ["dm-sans", "roboto-serif"], "sameText": "xH", "nominalSize": 24, "weight": 400, "opticalSize": 24, "sameBaseline": 35, "measure": 86.46, "columnGap": 14.17, "baselineGuide": {"y": 35, "strokeWidth": 0.5, "color": ACCENT}, "scaleCompensation": False, "horizontalScaling": False, "rankingClaim": False}, "DM Sans e Roboto Serif a 24 pt, sulla stessa baseline: il corpo nominale uguale non impone identiche proporzioni.")
    figure.line(0, 35, 187.09, 35)
    glyph_heights = {}
    for key, horizontal in [("dm-sans", 0), ("roboto-serif", 100.63)]:
        face = font(key, 24)
        figure.text(FAMILY_NAMES[key], horizontal, 9)
        figure.text("xH", horizontal, 35, face)
        glyph_heights[key] = {}
        for character in "xH":
            bounds = BoundsPen(face.glyphs)
            face.glyphs[face.instanced.getBestCmap()[ord(character)]].draw(bounds)
            glyph_heights[key][character] = {
                "height": (bounds.bounds[3] - bounds.bounds[1]) * face.scale,
                "aboveBaseline": bounds.bounds[3] * face.scale,
                "belowBaseline": -bounds.bounds[1] * face.scale,
            }
    figure.parameters["actualGlyphMetricsPt"] = glyph_heights
    if math.isclose(glyph_heights["dm-sans"]["x"]["height"], glyph_heights["roboto-serif"]["x"]["height"], abs_tol=0.001):
        raise ValueError("The x-height comparison unexpectedly has identical heights")
    return figure


def figure_nine_b():
    figure = Figure("09b-corpo-apparente-eb-garamond.svg", 187.09, 36, "Stesso corpo nominale · DM Sans ed EB Garamond", {"fontFamilies": ["dm-sans", "eb-garamond"], "sameText": "xH", "nominalSize": 24, "weight": 400, "opticalSize": {"dm-sans": 24, "eb-garamond": None}, "ebGaramondOpticalSizeNote": "No opsz axis in this authentic EB Garamond font; no optical-size simulation.", "sameBaseline": 35, "measure": 86.46, "columnGap": 14.17, "baselineGuide": {"y": 35, "strokeWidth": 0.5, "color": ACCENT}, "scaleCompensation": False, "horizontalScaling": False, "rankingClaim": False}, "DM Sans ed EB Garamond a 24 pt sulla stessa baseline: osserva la diversa altezza della x, senza compensazioni di scala.")
    figure.line(0, 35, 187.09, 35)
    glyph_heights = {}
    for key, horizontal in [("dm-sans", 0), ("eb-garamond", 100.63)]:
        face = font(key, 24)
        figure.text(FAMILY_NAMES[key], horizontal, 9)
        figure.text("xH", horizontal, 35, face)
        glyph_heights[key] = {}
        for character in "xH":
            bounds = BoundsPen(face.glyphs)
            face.glyphs[face.instanced.getBestCmap()[ord(character)]].draw(bounds)
            glyph_heights[key][character] = {
                "height": (bounds.bounds[3] - bounds.bounds[1]) * face.scale,
                "aboveBaseline": bounds.bounds[3] * face.scale,
                "belowBaseline": -bounds.bounds[1] * face.scale,
            }
    figure.parameters["actualGlyphMetricsPt"] = glyph_heights
    if glyph_heights["dm-sans"]["x"]["height"] - glyph_heights["eb-garamond"]["x"]["height"] < 2:
        raise ValueError("The requested apparent-size comparison has insufficient authentic x-height difference")
    return figure


def figure_ten():
    text = "Controlla il codice prima di agire."
    measure = (388.35 - 2 * 14.17) / 3
    face = font(size=12)
    words = text.split(" ")
    lines = []
    current = ""
    for word in words:
        candidate = f"{current} {word}" if current else word
        if face.shape(candidate)[1] > measure and current:
            lines.append(current)
            current = word
        else:
            current = candidate
    if current:
        lines.append(current)
    if len(lines) != 2 or " ".join(lines) != text:
        raise ValueError("The compact alignment figure requires two complete lines at 12 pt")
    figure = Figure("10-allineamenti-compatto.svg", 388.35, 44, "Allineamenti · stessa composizione", {"font": "dm-sans", "nominalSize": 12, "weight": 400, "opticalSize": 12, "leading": 14, "text": text, "greedyLineBreaking": "Whitespace only, identical measure and resulting line breaks for all panels; no hyphenation or truncation.", "sameLines": lines, "measure": measure, "columnGap": 14.17, "sameBaselines": [26, 40], "justification": "Only word spaces in non-final lines expand; final line remains left aligned. No tracking change or glyph deformation.", "horizontalScaling": False}, "Stesso testo, corpo 12/14 e giustezza: cambiano solo l’allineamento e, nella riga giustificata non finale, gli spazi tra parole.")
    panels = []
    base_space = face.shape(" ")[1]
    for panel_index, alignment in enumerate(["Sinistra", "Centrato", "Giustificato"]):
        origin = panel_index * (measure + 14.17)
        figure.text(alignment, origin, 10)
        panel = {"alignment": alignment, "x": origin, "width": measure, "lines": []}
        for line_index, line in enumerate(lines):
            original_advance = face.shape(line)[1]
            space_count = line.count(" ")
            offset = (measure - original_advance) / 2 if alignment == "Centrato" else 0
            extra_space = (measure - original_advance) / space_count if alignment == "Giustificato" and line_index < len(lines) - 1 and space_count else 0
            actual_advance = figure.text(line, origin + offset, 26 + line_index * 14, face, word_spacing=extra_space)
            if actual_advance > measure + 0.001:
                raise ValueError("Alignment sample exceeds its panel measure")
            panel["lines"].append({"text": line, "baseline": 26 + line_index * 14, "relativeX": offset, "originalAdvance": original_advance, "resultAdvance": actual_advance, "baseSpaceAdvance": base_space, "addedSpacePerWordBoundary": extra_space, "resultSpaceAdvance": base_space + extra_space, "wordSpaces": [{"afterWord": word, "baseAdvance": base_space, "addedAdvance": extra_space, "resultAdvance": base_space + extra_space} for word in line.split(" ")[:-1]]})
        panels.append(panel)
    figure.parameters["panels"] = panels
    return figure


def figure_eleven():
    text = "Leggi il nome prima di agire."
    figure = Figure("11-giustezza-compatto.svg", 187.09, 58, "Giustezza · stesso testo e corpo", {"font": "dm-sans", "nominalSize": 12, "weight": 400, "opticalSize": 12, "leading": 14, "text": text, "measures": [86.46, 68], "columnOrigins": [0, 100.63], "firstBaseline": 26, "wordBreaking": "Greedy whitespace wrapping only; no hyphenation, truncation, ellipsis or scaling.", "horizontalScaling": False}, "Stesso testo e corpo 12/14: la giustezza passa da 86,46 a 68 pt. Cambiano i ritorni a capo, non le parole o la scala.")
    panels = []
    for horizontal, measure, label, expected_count in [(0, 86.46, "86,46 pt", 2), (100.63, 68, "68 pt", 3)]:
        figure.text(label, horizontal, 10)
        lines = figure.paragraph(text, horizontal, 26, measure, font(size=12), 14)
        if len(lines) != expected_count:
            raise ValueError(f"Requested measure {measure} yields {len(lines)} lines instead of {expected_count}")
        panels.append({"x": horizontal, "width": measure, "text": text, "lineBreaks": lines, "baselines": [26 + 14 * index for index in range(len(lines))]})
    figure.parameters["panels"] = panels
    return figure


def figure_twelve():
    figure = Figure("12-spaziatura-compatto.svg", 187.09, 44, "Tracking e spazio tra parole · confronto compatto", {"font": "dm-sans", "nominalSize": 12, "weight": 400, "opticalSize": 12, "measure": 86.46, "columnGap": 14.17, "sameBaselines": [26, 40], "trackingDefinition": "Added between successive shaped glyphs, with no trailing addition;0 means no extra beyond the font's original advances.", "wordSpacingDefinition": "Added only to existing word spaces;0 means no extra beyond the font's original space advance.", "horizontalScaling": False}, "In alto, spaziatura originale. In basso, tracking +0,6 pt in «Leggi» e solo spazio tra parole +3 pt in «il nome». Font, corpo e peso restano uguali.")
    face = font(size=12)
    panels = []
    for horizontal, label, text, rows in [(0, "Tracking", "Leggi", [(0, 0), (0.6, 0)]), (100.63, "Fra parole", "il nome", [(0, 0), (0, 3)])]:
        figure.text(label, horizontal, 10)
        panel = {"x": horizontal, "width": 86.46, "text": text, "rows": []}
        for index, (tracking, word_spacing) in enumerate(rows):
            advance = figure.text(text, horizontal, 26 + 14 * index, face, tracking=tracking, word_spacing=word_spacing)
            if advance > 86.46:
                raise ValueError("Compact spacing comparison exceeds its column")
            positions, original_advance = face.shape(text)
            panel["rows"].append({"baseline": 26 + 14 * index, "trackingAddedPt": tracking, "wordSpacingAddedPt": word_spacing, "originalAdvance": original_advance, "resultAdvance": advance, "shapedGlyphCount": len(positions), "trackingBoundaryCount": len(positions) - 1, "wordSpaceCount": text.count(" "), "originalSpaceAdvance": face.shape(" ")[1], "resultSpaceAdvance": face.shape(" ")[1] + word_spacing})
        panels.append(panel)
    figure.parameters["panels"] = panels
    return figure


def font_metadata(key):
    path = DIRECTORY / "originals" / FONT_FILES[key]
    face = TTFont(path)
    license_name = "DMSans-OFL.txt" if key == "dm-sans" else "EBGaramond-OFL.txt" if key == "eb-garamond" else "RobotoSerif-OFL.txt"
    license_path = DIRECTORY / "originals" / license_name
    source_directory = "dmsans" if key == "dm-sans" else "ebgaramond" if key == "eb-garamond" else "robotoserif"
    return {
        "family": FAMILY_NAMES[key], "path": str(path.relative_to(WORKSPACE)),
        "sha256": checksum(path), "version": face["name"].getDebugName(5),
        "postscriptName": face["name"].getDebugName(6),
        "copyright": face["name"].getDebugName(0), "sourceUrl": SOURCE_URLS[key],
        "rawFontUrl": "https://raw.githubusercontent.com/google/fonts/main/ofl/" + source_directory + "/" + FONT_FILES[key].replace("[", "%5B").replace("]", "%5D").replace(",", "%2C"),
        "acquiredAt": "2026-10-20",
        "license": "SIL Open Font License 1.1", "licensePath": str(license_path.relative_to(WORKSPACE)),
        "licenseSha256": checksum(license_path),
        "axes": [{"tag": axis.axisTag, "min": axis.minValue, "default": axis.defaultValue, "max": axis.maxValue} for axis in face["fvar"].axes],
        **({"metadataPath": str((DIRECTORY / "originals" / "EBGaramond-METADATA.pb").relative_to(WORKSPACE)), "metadataSha256": checksum(DIRECTORY / "originals" / "EBGaramond-METADATA.pb"), "copiedUnchangedFrom": "assets/booklet/tipografia-campioni-uniformi/early/originali/"} if key == "eb-garamond" else {}),
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--figures", default="1,2,3,4,5,6,1c,7,8,9,9b,10,11,12")
    args = parser.parse_args()
    choices = {"1": figure_one, "2": figure_two, "3": figure_three, "4": figure_four, "5": figure_five, "6": figure_six, "1c": figure_one_compact, "7": figure_seven, "8": figure_eight, "9": figure_nine, "9b": figure_nine_b, "10": figure_ten, "11": figure_eleven, "12": figure_twelve}
    selected = args.figures.split(",")
    records = [choices[value]().export() for value in selected]
    manifest_path = DIRECTORY / "manifest.json"
    previous = json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
    merged = {entry["file"]: entry for entry in previous.get("figures", [])}
    merged.update({entry["file"]: entry for entry in records})
    manifest = {
        "comment": 394, "date": "2026-10-20", "status": "LOCAL_SOURCE_ASSETS_READY_FIGMA_APPLICATION_TRACKED_SEPARATELY",
        "fonts": {key: font_metadata(key) for key in FONT_FILES},
        "shaping": {"engine": "HarfBuzz", "pythonBinding": harfbuzz.__version__, "fontTools": fontTools.__version__, "features": {"kern": True, "liga": True}, "direction": "ltr", "script": "Latn", "language": "it", "pathPrecision": "0.001 font units; translations 0.001 pt; simulated shear matrix term 0.000000001; no redraw or fallback"},
        "model": {"background": "#FFFFFF", "ink": INK, "accent": ACCENT, "labels": "DM Sans Medium 10/12, opsz14, genuine paths", "ordinaryBody": "DM Sans Regular 12, opsz12 unless explicitly specified", "nativeEditorialCaption": "Not embedded; nativeCaptionProposal is editorial text for a future native Figma caption and separate rights block."},
        "sourcePreservation": "All four original OFL font binaries, licence texts and official METADATA are preserved in originals/. Roboto Serif roman and EB Garamond were copied unchanged from existing repository sources, retaining their existing provenance; DM Sans and Roboto Serif Italic came from official google/fonts raw files. EB Garamond source: assets/booklet/tipografia-campioni-uniformi/early/originali/.",
        "figures": [merged[key] for key in sorted(merged)],
        "limitations": ["No universal better-font ranking or measured reading-performance claim.", "No Figma import, native rendering, current-page fit or final caption-style certification.", "Font outlines do not establish that a particular browser or printing system will rasterize identically."],
    }
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({"files": [{key: entry[key] for key in ["file", "width", "height", "bytes", "allInkInsideViewport"]} for entry in records]}, ensure_ascii=False))


if __name__ == "__main__":
    main()
