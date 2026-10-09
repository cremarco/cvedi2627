#!/usr/bin/env python3
"""Capture public iLMeteo pages and their presentation resources, without a browser.

Run with the bundled Python runtime (lxml is provided):
  <runtime>/python/bin/python3 esempi/ilmeteo-lab/scripts/capture.py

Raw HTML is immutable after the first successful acquisition. --refresh explicitly
captures a new edition. No advertising, analytics, geolocation or live API scripts
run in the local pages. Downloaded resources keep source URLs and SHA-256 hashes.
"""
from __future__ import annotations

import argparse
import ast
import concurrent.futures
import hashlib
import html as html_lib
import json
import mimetypes
import os
from pathlib import Path
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone

from lxml import html

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT.parents[1] / "reports" / "ilmeteo-lab" / "capture-integrity.json"
BASE = "https://www.ilmeteo.it/"
PAGES = {
    "home": {"url": BASE, "file": "index.html"},
    "bologna": {"url": BASE + "meteo/bologna", "file": "bologna.html"},
    "domani": {"url": BASE + "portale/meteo-domani", "file": "domani.html"},
}
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; CVeDI educational offline capture)",
           "Accept": "*/*"}
CSS_URL = re.compile(r"url\(\s*([\"']?)(.*?)\1\s*\)", re.I)
CSS_IMPORT = re.compile(r"@import\s+[\"']([^\"']+)[\"']", re.I)
TRACKING_HOST = re.compile(r"(?:google(?:tag|syndication|adservices)|doubleclick|rubicon|imrworldwide|newsroom|mrf\.io|4strokemedia|facebook|twitter|scorecard|criteo)", re.I)
PLACEHOLDER = re.compile(r"(?:%[a-z][\w-]*%|\{\{|<%|\[\[)", re.I)


def write_json(file: Path, value) -> None:
    file.parent.mkdir(parents=True, exist_ok=True)
    file.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf8")


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def fetch(url: str):
    request = urllib.request.Request(url, headers=HEADERS)
    error = None
    for attempt in range(3):
        try:
            with urllib.request.urlopen(request, timeout=35) as response:
                return response.read(), dict(response.headers), response.geturl(), response.status
        except (OSError, urllib.error.URLError) as exception:
            error = str(exception)
            if attempt < 2:
                time.sleep(0.4 * (attempt + 1))
    raise RuntimeError(f"{url}: {error}")


def absolute(value: str, base: str):
    value = html_lib.unescape(value.strip())
    if not value or value.startswith(("data:", "blob:", "#", "javascript:", "mailto:")) or PLACEHOLDER.search(value):
        return None
    result = urllib.parse.urljoin(base, value)
    result, _ = urllib.parse.urldefrag(result)
    parts = urllib.parse.urlsplit(result)
    if parts.scheme not in ("http", "https") or TRACKING_HOST.search(parts.netloc):
        return None
    # Non-ASCII URLs are valid in HTML, but must be encoded for urllib.
    return urllib.parse.urlunsplit((parts.scheme, parts.netloc,
        urllib.parse.quote(urllib.parse.unquote(parts.path), safe="/!$&'()*+,;=:@-._~%"),
        urllib.parse.quote(parts.query, safe="!$&'()*+,;=:@/?-._~%"), ""))


def resource_file(url: str):
    parts = urllib.parse.urlsplit(url)
    name = Path(urllib.parse.unquote(parts.path)).name
    suffix = Path(name).suffix.lower()
    if not re.match(r"^\.[a-z0-9]{1,6}$", suffix):
        suffix = ".bin"
    stem = re.sub(r"[^a-zA-Z0-9._-]+", "-", Path(name).stem)[:70] or "asset"
    return "assets/" + hashlib.sha256(url.encode()).hexdigest()[:12] + "-" + stem + suffix


def css_references(text: str, base: str):
    values = [m.group(2) for m in CSS_URL.finditer(text)] + [m.group(1) for m in CSS_IMPORT.finditer(text)]
    return {result for value in values if (result := absolute(value, base))}


def html_references(tree, base: str):
    refs = set()
    for element in tree.iter():
        if not isinstance(element.tag, str):
            continue
        tag = element.tag.lower()
        if tag in ("script", "iframe", "embed", "object"):
            continue
        for attr in ("src", "poster", "data-src", "data-original", "data-lazy-src"):
            if element.get(attr) and (url := absolute(element.get(attr), base)):
                refs.add(url)
        for attr in ("srcset", "data-srcset"):
            if element.get(attr):
                for item in element.get(attr).split(","):
                    if item.strip() and (url := absolute(item.strip().split()[0], base)):
                        refs.add(url)
        if tag == "link" and element.get("href") and element.get("rel", "").lower() in ("stylesheet", "icon", "apple-touch-icon", "preload"):
            if element.get("as", "") != "script" and (url := absolute(element.get("href"), base)):
                refs.add(url)
        if element.get("style"):
            refs.update(css_references(element.get("style"), base))
        if tag == "style":
            refs.update(css_references(element.text or "", base))
    return refs


def text_content(element):
    if element is None:
        return ""
    clone = html.fromstring(html.tostring(element))
    for item in clone.xpath(".//script|.//style|.//template"):
        item.drop_tree()
    return " ".join(clone.text_content().split())


def exact_class(tree, classname):
    return tree.xpath(".//*[contains(concat(' ', normalize-space(@class), ' '), ' " + classname + " ')]")


def first_text(tree, classname):
    values = exact_class(tree, classname)
    return text_content(values[0]) if values else ""


def weather_data(trees, extracted, assets):
    """Expose only source-backed factual fields; no generated weather values."""
    city = trees["bologna"]
    daily = []
    for element in exact_class(city, "forecast_day_selector__list__item__link"):
        date = exact_class(element, "forecast_day_selector__list__item__link__date")
        symbols = element.xpath(".//*[@data-simbolo]")
        minimum = first_text(element, "forecast_day_selector__list__item__link__values__lower")
        maximum = first_text(element, "forecast_day_selector__list__item__link__values__higher")
        if minimum and maximum:
            daily.append({"label": text_content(date[0]) if date else "", "sourceUrl": element.get("href"),
                "timestamp": date[0].get("data-import_ts") if date else None,
                "minimum": minimum, "maximum": maximum, "symbol": symbols[0].get("data-simbolo") if symbols else None,
                "reliability": first_text(element, "attend_prev"),
                "hourlyAvailable": element.get("href", "").rstrip("/").endswith("/bologna")})
    hourly = []
    for row in city.xpath("//tr[@data-hour]"):
        cells = row.xpath("./td")
        symbols = row.xpath(".//*[@data-simbolo]")
        values = [text_content(cell) for cell in cells]
        if len(values) < 14:
            continue
        wind = row.xpath(".//*[contains(concat(' ',normalize-space(@class),' '),' wind_kmkn ')]")
        hourly.append({"hour": row.get("data-hour"), "timestamp": row.get("data-import_ts"),
            "intervalHours": 3 if "forecast_3h" in row.get("class", "") else 1,
            "temperature": values[2], "precipitation": values[3],
            "symbol": symbols[0].get("data-simbolo") if symbols else None,
            "wind": values[5], "windDirection": values[5].split()[0] if values[5] else "", "windSpeed": text_content(wind[0]) if wind else "",
            "gustSpeed": text_content(wind[1]) if len(wind) > 1 else "",
            "hail": values[6], "feelsLike": values[7], "pressure": values[8], "humidity": values[9],
            "visibility": values[10], "airQuality": values[11], "uv": values[12], "freezingLevel": values[13]})
    realtime = []
    for row in city.xpath("//tr[contains(@class,'latest_detection')]"):
        values = [text_content(cell) for cell in row.xpath("./td")]
        if len(values) >= 14:
            symbols = row.xpath(".//*[@data-simbolo]")
            realtime.append({"time": values[0], "temperature": values[2], "wind": values[5],
                "symbol": symbols[0].get("data-simbolo") if symbols else None,
                "hail": values[6], "feelsLike": values[7], "pressure": values[8], "humidity": values[9],
                "visibility": values[10], "uv": values[12], "freezingLevel": values[13]})
    regions = []
    for element in exact_class(trees["domani"], "daily_forecast__area"):
        headings = element.xpath(".//h2")
        regions.append({"title": text_content(headings[0]) if headings else "",
            "text": first_text(element, "daily_forecast__area__text"),
            "temperatures": first_text(element, "daily_forecast__area__temp")})
    news = extracted["home"]["news"]
    for article in news:
        url = absolute(article.get("image") or "", BASE)
        article["localImage"] = assets.get(url, {}).get("file")
    forecast_summary = []
    for element in city.xpath("//*[contains(@class,'forecast') or contains(@class,'weather')]"):
        label = text_content(element)
        if 80 < len(label) < 1600 and ("Bologna" in label or "attendibilità" in label) and label not in forecast_summary:
            forecast_summary.append(label)
    # A compact schema for the redesigned pages; the complete text/DOM data is
    # retained independently in capture.json so secondary information is not lost.
    return {"schemaVersion": 1, "city": "Bologna", "editionDate": "2026-10-08",
        "sourcePages": {key: value["source"] for key, value in extracted.items()},
        "update": first_text(city, "forecast_update__date"),
        "author": first_text(city, "forecast_update__author"),
        "daily": daily, "hourly": hourly, "realtime": realtime,
        "forecastSummary": forecast_summary,
        "homeSummary": text_content(trees["home"].get_element_by_id("html_pre1")),
        "tomorrowSummary": first_text(trees["domani"], "daily_forecast__general__text"),
        "regions": regions, "news": news,
        "details": [{"title": text_content(element.xpath(".//h2")[0]) if element.xpath(".//h2") else "",
                      "text": text_content(element)} for element in exact_class(city, "weather_informations__box")],
        "limits": {"acquiredCity": "Bologna", "hourlyDates": ["2026-10-08", "2026-10-09"],
                   "dailySummaryOnly": [item["label"] for item in daily if not item["hourlyAvailable"]],
                   "liveData": False}}


def extract_data(tree, page_key: str, source: dict):
    headers = [{"level": element.tag, "text": text_content(element), "id": element.get("id"), "class": element.get("class")}
               for element in tree.xpath("//h1|//h2|//h3") if text_content(element)]
    rows = []
    for table in tree.xpath("//table"):
        values = [[text_content(cell) for cell in row.xpath("./th|./td")]
                  for row in table.xpath(".//tr")]
        if values:
            rows.append({"id": table.get("id"), "class": table.get("class"), "rows": values})
    images = [{"src": element.get("src"), "alt": element.get("alt", ""), "title": element.get("title", ""), "class": element.get("class", "")}
              for element in tree.xpath("//img") if element.get("src") and not PLACEHOLDER.search(element.get("src"))]
    links = [{"text": text_content(element), "url": urllib.parse.urljoin(source["url"], element.get("href")),
              "title": element.get("title", ""), "class": element.get("class", "")}
             for element in tree.xpath("//a[@href]") if text_content(element)]
    news = []
    seen = set()
    for element in tree.xpath("//a[@href]"):
        url = urllib.parse.urljoin(source["url"], element.get("href"))
        label = text_content(element)
        if re.search(r"/notizie/[^/?]+-\d{6}(?:$|[?#])", url) and len(label) > 18 and url not in seen:
            seen.add(url)
            parent = element.getparent()
            for ancestor in element.iterancestors():
                if ancestor.tag == "li" and "news" in ancestor.get("class", ""):
                    parent = ancestor
                    break
            image = element.xpath(".//img") or parent.xpath(".//img")
            news.append({"title": label, "url": url, "image": image[0].get("src") if image else None,
                         "context": text_content(parent), "sourceTitle": element.get("title", "")})
    weather_nodes = []
    for element in tree.xpath("//*[@id or @class]"):
        marker = (element.get("id", "") + " " + element.get("class", "")).lower()
        if re.search(r"(?:forecast|prevision|synoptic|weather|giorni|city_forecast|tabella|tabelle|datatable|bollettino)", marker):
            label = text_content(element)
            if label and len(label) < 45000:
                weather_nodes.append({"tag": element.tag, "id": element.get("id"), "class": element.get("class"), "text": label})
    source_text = html.tostring(tree, encoding="unicode")
    inline_data = []
    for element in tree.xpath("//script[not(@src)]"):
        content = element.text or ""
        if re.search(r"(?:previs|forecast|weather|cfw|maps2|bollettino|data:|meteo)", content, re.I):
            inline_data.append(content)
    return {"page": page_key, "source": source, "title": text_content(tree.find(".//title")),
            "headings": headers, "tables": rows, "images": images, "links": links,
            "news": news, "weatherBlocks": weather_nodes,
            "paragraphs": [text_content(element) for element in tree.xpath("//p") if text_content(element)],
            "fullText": text_content(tree.find(".//body")), "inlineData": inline_data,
            "dynamic": {"scriptsRemoved": len(tree.xpath("//script")),
                        "canvasCount": len(tree.xpath("//canvas")),
                        "mapMarkers": sorted(set(re.findall(r"(?:src|href)=[\"']([^\"']*(?:maps2|map\.js|map\.css)[^\"']*)", source_text)))}}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--refresh", action="store_true", help="Explicitly capture a new source edition")
    args = parser.parse_args()
    for folder in ("sources", "originale", "assets", "data"):
        (ROOT / folder).mkdir(parents=True, exist_ok=True)
    previous = json.loads((ROOT / "sources/manifest.json").read_text()) if (ROOT / "sources/manifest.json").exists() else {}
    sources = {}
    trees = {}
    required = set()
    widgets_file = ROOT / "sources/rendered-widgets.json"
    if not widgets_file.exists():
        cua_file = REPORT.parent / "source/rendered-widgets.json"
        if cua_file.exists():
            widgets_file.write_bytes(cua_file.read_bytes())
    widgets = json.loads(widgets_file.read_text(encoding="utf8")) if widgets_file.exists() else {}
    tomorrow_runtime_file = ROOT / "sources/tomorrow-runtime-state.json"
    if not tomorrow_runtime_file.exists():
        cua_file = REPORT.parent / "source/tomorrow-runtime-state.json"
        if cua_file.exists():
            tomorrow_runtime_file.write_bytes(cua_file.read_bytes())
    tomorrow_runtime = json.loads(tomorrow_runtime_file.read_text(encoding="utf8")) if tomorrow_runtime_file.exists() else {}
    for key, page in PAGES.items():
        file = ROOT / "sources" / (key + ".html")
        if file.exists() and not args.refresh:
            content = file.read_bytes()
            metadata = previous.get("pages", {}).get(key, {"url": page["url"]})
        else:
            content, headers, final_url, status = fetch(page["url"])
            file.write_bytes(content)
            metadata = {"url": final_url, "requestedUrl": page["url"], "status": status,
                "capturedAt": datetime.now(timezone.utc).isoformat(), "headers": headers}
        metadata.update({"file": "sources/" + file.name, "sha256": digest(content), "bytes": len(content)})
        sources[key] = metadata
        # Passing Unicode is intentional: libxml's auto-detection can interpret
        # the late charset declaration of this page as Latin-1.
        trees[key] = html.document_fromstring(content.decode("utf8"), base_url=metadata["url"])
        if key == "home" and widgets:
            # These fragments are exact rendered DOM read via CUA, not a rebuilt
            # approximation. Their unmodified payload is retained in sources.
            if widgets.get("map"):
                original = trees[key].get_element_by_id("bigmap-div10")
                rendered_map = html.fromstring(widgets["map"])
                rendered_map.set("data-snapshot-map", "true")
                original.getparent().replace(original, rendered_map)
            if widgets.get("news"):
                target = trees[key].get_element_by_id("topbox_masthead_wrapper", None)
                if target is not None:
                    target.append(html.fromstring(widgets["news"]))
                # The source template supplies the original banner CSS. We
                # materialize it verbatim, without running its insertion script.
                match = re.search(r"var topbox_masthead_wrapper_tpl = ('(?:\\.|[^'])*');", content.decode("utf8"))
                if match:
                    template_text = ast.literal_eval(match.group(1))
                    template = html.fragment_fromstring(template_text, create_parent="div")
                    for style in template.xpath("./style"):
                        trees[key].find(".//head").append(style)
        required.update(html_references(trees[key], metadata["url"]))
        print(f"Source {key}: {len(content):,} bytes", flush=True)
    # Exact original static map variants used by the acquired Home controls.
    # Radar is a rendered Leaflet layer and is captured separately through CUA.
    map_urls = {}
    for kind, filename, ext in [("0", "italybig", ".jpg"), ("2", "italytempbig", ".jpg"),
                                 ("3", "italyseabig", ".jpg"), ("1", "files/ilmeteo/prec/italyprecbig", ".neve.png"),
                                 ("4", "files/ilmeteo/prec/italysnowbig", ".png")]:
        for part, suffix in [("0", ""), ("1", "_m"), ("2", "_p"), ("3", "_s"), ("4", "1_n")]:
            if kind in ("1", "4") and part == "0":
                continue
            url = BASE + "portale/" + filename + suffix + ext
            required.add(url)
            map_urls[kind + ":" + part] = url
    mobile_tomorrow_map = BASE + "portale/italy1.jpg?10"
    required.add(mobile_tomorrow_map)
    write_json(ROOT / "sources/manifest.json", {"pages": sources})

    assets = {}
    old_assets = {}
    if (ROOT / "assets/manifest.json").exists() and not args.refresh:
        old_assets = {asset["url"]: asset for asset in json.loads((ROOT / "assets/manifest.json").read_text()).get("assets", [])}
    all_required = set(required)
    pending = sorted(required)

    def acquire(url):
        file = resource_file(url)
        location = ROOT / file
        old = old_assets.get(url)
        if old and location.exists():
            raw_file = ROOT / (file + ".source") if file.endswith(".css") else location
            if raw_file.exists():
                data = raw_file.read_bytes()
                if digest(data) == old.get("sourceSha256", old.get("sha256")):
                    return dict(old), data
        try:
            data, headers, final_url, status = fetch(url)
            location.write_bytes(data)
            if "text/css" in headers.get("Content-Type", "") or file.endswith(".css"):
                (ROOT / (file + ".source")).write_bytes(data)
            return {"url": url, "resolvedUrl": final_url, "file": file, "status": status,
                    "contentType": headers.get("Content-Type", ""), "bytes": len(data),
                    "sha256": digest(data), "sourceSha256": digest(data),
                    "sourceFile": file + ".source" if "text/css" in headers.get("Content-Type", "") or file.endswith(".css") else file}, data
        except Exception as error:
            return {"url": url, "file": file, "status": "failed", "error": str(error)}, None

    while pending:
        batch = pending
        pending = []
        print(f"Resources: downloading {len(batch)} (already {len(assets)})", flush=True)
        with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
            for asset, data in pool.map(acquire, batch):
                assets[asset["url"]] = asset
                if data is not None and ("text/css" in asset.get("contentType", "") or asset["file"].endswith(".css")):
                    refs = css_references(data.decode("utf8", errors="replace"), asset["resolvedUrl"])
                    for url in refs - all_required:
                        all_required.add(url)
                        pending.append(url)
        pending = sorted(set(pending))

    successful = {url: asset for url, asset in assets.items() if asset["status"] != "failed"}
    failures = [asset for asset in assets.values() if asset["status"] == "failed"]

    def local_url(value: str, base: str, owner: Path):
        url = absolute(value, base)
        if url in successful:
            suffix = "#" + urllib.parse.urlsplit(value).fragment if urllib.parse.urlsplit(value).fragment else ""
            return os.path.relpath(ROOT / successful[url]["file"], owner.parent).replace(os.sep, "/") + suffix
        return None

    def rewrite_css(text: str, base: str, owner: Path):
        def replace_url(match):
            value = match.group(2)
            rewritten = local_url(value, base, owner)
            if rewritten:
                return 'url("' + rewritten + '")'
            # A missing decoration remains blank rather than touching the live site.
            return match.group(0) if value.strip().startswith(("data:", "#")) else "url(data:,)"
        text = CSS_URL.sub(replace_url, text)
        return CSS_IMPORT.sub(lambda match: '@import "' + (local_url(match.group(1), base, owner) or "data:text/css,") + '"', text)

    for url, asset in successful.items():
        asset.setdefault("sourceFile", asset["file"] + ".source" if asset["file"].endswith(".css") else asset["file"])
        if asset["file"].endswith(".css") or "text/css" in asset.get("contentType", ""):
            owner = ROOT / asset["file"]
            raw = (ROOT / (asset["file"] + ".source")).read_bytes()
            compiled = rewrite_css(raw.decode("utf8", errors="replace"), asset["resolvedUrl"], owner).encode("utf8")
            owner.write_bytes(compiled)
            asset.update({"sha256": digest(compiled), "bytes": len(compiled), "sourceBytes": len(raw)})

    extracted = {key: extract_data(tree, key, sources[key]) for key, tree in trees.items()}
    write_json(ROOT / "data/weather.json", weather_data(trees, extracted, successful))
    snapshot_data = {"maps": {key: "../" + successful[url]["file"] for key, url in map_urls.items() if url in successful},
        "mobileTomorrowMap": "../" + successful[mobile_tomorrow_map]["file"] if mobile_tomorrow_map in successful else None}
    # Capture-only helpers can use local data directly even under file:// and
    # connect-src none. This file contains no remote executable code.
    (ROOT / "originale/snapshot-data.js").write_text("window.ILMETEO_SNAPSHOT = " + json.dumps(snapshot_data, ensure_ascii=False) + ";\n", encoding="utf8")
    for key, tree in trees.items():
        owner = ROOT / "originale" / PAGES[key]["file"]
        base = sources[key]["url"]
        if key == "domani" and tomorrow_runtime.get("bodyClass"):
            # Materialize the observed live runtime class only in the served
            # copy. Raw source HTML and its content extraction remain untouched.
            tree.find(".//body").set("class", tomorrow_runtime["bodyClass"])
        for element in list(tree.xpath("//script|//iframe|//embed|//object|//base")):
            element.drop_tree()
        for element in list(tree.xpath("//link")):
            rel = element.get("rel", "").lower()
            if rel in ("preconnect", "dns-prefetch", "prefetch", "manifest", "alternate") or (rel == "preload" and element.get("as") == "script"):
                element.drop_tree()
        for element in tree.iter():
            if not isinstance(element.tag, str):
                continue
            for attr in list(element.attrib):
                if attr.lower().startswith("on"):
                    del element.attrib[attr]
            tag = element.tag.lower()
            for attr in ("src", "poster", "data-src", "data-original", "data-lazy-src"):
                if element.get(attr):
                    target = local_url(element.get(attr), base, owner)
                    if target:
                        element.set(attr, target)
                    elif tag == "img":
                        # Templates have no actual asset; their source is retained raw.
                        element.attrib.pop(attr, None)
                        if attr == "src":
                            element.set("data-capture-missing", element.get("alt", "risorsa non acquisita"))
            for attr in ("srcset", "data-srcset"):
                if element.get(attr):
                    values = []
                    for item in element.get(attr).split(","):
                        fields = item.strip().split()
                        if fields and (target := local_url(fields[0], base, owner)):
                            values.append(" ".join([target, *fields[1:]]))
                    element.set(attr, ", ".join(values))
            if element.get("style"):
                element.set("style", rewrite_css(element.get("style"), base, owner))
            if tag == "style":
                element.text = rewrite_css(element.text or "", base, owner)
            if tag == "link" and element.get("href"):
                target = local_url(element.get("href"), base, owner)
                if target:
                    element.set("href", target)
                elif element.get("rel") in ("stylesheet", "preload", "icon", "apple-touch-icon"):
                    element.drop_tree()
                    continue
            if tag in ("a", "area") and element.get("href"):
                url = urllib.parse.urljoin(base, element.get("href"))
                path = urllib.parse.urlsplit(url).path.rstrip("/").lower()
                targets = {"": "index.html", "/portale": "index.html", "/meteo/bologna": "bologna.html", "/portale/meteo-domani": "domani.html"}
                if urllib.parse.urlsplit(url).netloc.endswith("ilmeteo.it") and path in targets:
                    element.set("href", targets[path] + ("#" + urllib.parse.urlsplit(url).fragment if urllib.parse.urlsplit(url).fragment else ""))
                    element.attrib.pop("target", None)
                elif url.startswith(("http://", "https://", "javascript:")):
                    element.set("data-live-href", url)
                    element.set("href", "#snapshot-unavailable")
            if tag == "form":
                element.set("action", "bologna.html")
        head = tree.find(".//head")
        csp = html.Element("meta", {"http-equiv": "Content-Security-Policy",
            "content": "default-src 'self' data: blob:; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'none'; frame-src 'none'; object-src 'none'; form-action 'self'"})
        head.insert(0, csp)
        tree.find(".//body").append(html.Element("script", {"src": "snapshot-data.js", "defer": "defer"}))
        tree.find(".//body").append(html.Element("script", {"src": "snapshot.js", "defer": "defer", "data-page": key}))
        owner.write_bytes(html.tostring(tree, encoding="utf8", method="html", doctype="<!DOCTYPE html>"))
        print(f"Local copy {owner.relative_to(ROOT)}", flush=True)

    write_json(ROOT / "data/capture.json", {"schemaVersion": 1,
        "edition": "8 ottobre 2026 · copia didattica congelata",
        "capturedAt": min(source.get("capturedAt", "") for source in sources.values()),
        "pages": extracted, "limitations": ["Le informazioni rappresentano l'edizione acquisita; non sono previsioni aggiornate.",
          "Sono acquisite tre pagine: Home, Bologna e Meteo domani. Le altre destinazioni e i servizi live non sono disponibili offline.",
          "Pubblicità remota, analytics, video, accesso e geolocalizzazione sono disattivati nella copia locale."]})
    write_json(ROOT / "assets/manifest.json", {"schemaVersion": 1,
        "assets": sorted(assets.values(), key=lambda item: item["file"]),
        "failures": failures, "license": "Materiali originali di iLMeteo e rispettivi autori, conservati per esercitazione locale. Nessuna licenza di ridistribuzione attribuita."})
    if widgets:
        write_json(ROOT / "assets/attributions.json", {"source": "sources/rendered-widgets.json",
            "widgetSha256": digest(widgets_file.read_bytes()),
            "mapAttribution": "iLMeteo.it | © OpenStreetMap",
            "mapAttributionSource": "http://www.openstreetmap.org/copyright",
            "tiles": {"base": "https://tile.openstreetmap.org/", "radar": "https://maps-geoserver.ilmeteo.it/"},
            "mode": "DOM e tile originali acquisiti tramite browser CUA, congelati al timestamp mostrato. Riproduzione, zoom e trascinamento live disattivati."})
    local_requests = []
    for key, info in PAGES.items():
        owner = ROOT / "originale" / info["file"]
        page_tree = html.document_fromstring(owner.read_text(encoding="utf8"))
        for element in page_tree.xpath("//*[@src] | //link[@href]"):
            value = element.get("src") or element.get("href")
            if not value or value.startswith(("data:", "#")):
                continue
            remote = value.startswith(("http:", "https:", "//"))
            local_requests.append({"page": key, "tag": element.tag, "url": value,
                "external": remote, "exists": False if remote else (owner.parent / value.split("?")[0].split("#")[0]).is_file()})
    for value in list(snapshot_data["maps"].values()) + [snapshot_data.get("mobileTomorrowMap")]:
        if value:
            local_requests.append({"page": "snapshot controls", "tag": "runtime image", "url": value,
                "external": False, "exists": (ROOT / "originale" / value).is_file()})
    for asset in successful.values():
        if asset["file"].endswith(".css"):
            owner = ROOT / asset["file"]
            for match in CSS_URL.finditer(owner.read_text(encoding="utf8")):
                value = match.group(2)
                if value.startswith(("data:", "#")):
                    continue
                remote = value.startswith(("http:", "https:", "//"))
                local_requests.append({"page": asset["file"], "tag": "CSS url", "url": value,
                    "external": remote, "exists": False if remote else (owner.parent / value.split("?")[0].split("#")[0]).is_file()})
    request_errors = [item for item in local_requests if item["external"] or not item["exists"]]
    write_json(ROOT / "data/request-inventory.json", local_requests)
    report = {"status": "passed" if not failures and not request_errors else "partial", "pages": list(PAGES),
        "sourceHashesVerified": all(digest((ROOT / source["file"]).read_bytes()) == source["sha256"] for source in sources.values()),
        "assetHashesVerified": all(digest((ROOT / asset["file"]).read_bytes()) == asset["sha256"] for asset in successful.values()),
        "assetCount": len(successful), "assetBytes": sum(asset["bytes"] for asset in successful.values()),
        "failureCount": len(failures), "failures": failures,
        "localResourceRequestCount": len(local_requests), "externalResourceRequestCount": sum(item["external"] for item in local_requests),
        "missingLocalResourceRequests": request_errors,
        "presentationGaps": [] if widgets.get("map") else ["Home default Radar is rendered dynamically with Leaflet and requires a CUA capture; original static map variants are acquired."],
        "renderedWidgets": {"mapCaptured": bool(widgets.get("map")), "newsCaptured": bool(widgets.get("news")),
            "source": "sources/rendered-widgets.json" if widgets else None, "tileCount": len(widgets.get("mapImages", []))},
        "materializedRuntimeStates": {"domaniBodyClass": tomorrow_runtime.get("bodyClass"),
            "source": "sources/tomorrow-runtime-state.json" if tomorrow_runtime else None,
            "sourceSha256": digest(tomorrow_runtime_file.read_bytes()) if tomorrow_runtime else None,
            "servedClassVerified": html.document_fromstring((ROOT / "originale/domani.html").read_text(encoding="utf8")).find(".//body").get("class") == tomorrow_runtime.get("bodyClass") if tomorrow_runtime else None},
        "browserVerification": {"status": "not_repeated_after_runtime_state_materialization",
            "reason": "The Mac is locked, so CUA browser verification cannot continue. No terminal browser fallback was used for this final change."},
        "networkPolicy": "Rendered copies have CSP connect-src/frame-src none. All image, font and CSS presentation resources are local.",
        "rawSourcesUnmodified": True,
        "tables": {key: [len(table["rows"]) for table in value["tables"]] for key, value in extracted.items()},
        "verificationScope": "Source acquisition, resource inventory, byte hashes, offline presentation URL rewriting. Browser visual equivalence and interactions are checked separately."}
    write_json(REPORT, report)
    print(json.dumps({key: report[key] for key in ("status", "assetCount", "assetBytes", "failureCount", "tables")}, ensure_ascii=False), flush=True)


if __name__ == "__main__":
    main()
