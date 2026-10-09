#!/usr/bin/env python3
"""Inventory the frozen iLMeteo edition, without network or browser access.

The immutable source DOM is authoritative. This extractor preserves source text,
URLs and values as strings, adds unique XPath provenance, and keeps closed dialogs
and responsive/hidden copies distinct. Run normally to regenerate the inventory
and report; --check verifies their reproducibility without writing any files.
"""
from __future__ import annotations

import argparse
from collections import Counter, defaultdict
from datetime import date
import hashlib
import json
from pathlib import Path
import re
from urllib.parse import urljoin, urlsplit

from lxml import html

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "data/supplementary.json"
REPORT_ROOT = ROOT.parents[1] / "reports/ilmeteo-lab"
SCRIPT = Path(__file__).resolve()
IGNORED_TEXT_TAGS = {"script", "style", "template", "noscript"}
STATE_CLASSES = {"hidden", "off", "mobile-only", "desktop-only", "mobile_only",
                 "desktop_only", "modal", "side_menu", "forecast_1h", "forecast_3h"}


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def load(relative: str):
    return json.loads((ROOT / relative).read_text(encoding="utf8"))


def serialized(value) -> str:
    return json.dumps(value, ensure_ascii=False, indent=2) + "\n"


def class_xpath(name: str) -> str:
    return "//*[contains(concat(' ', normalize-space(@class), ' '), ' " + name + " ')]"


def has_class(element, name: str) -> bool:
    return name in element.get("class", "").split()


def exact_text(element) -> str:
    if element is None:
        return ""
    values = []
    for value in element.xpath(".//text()"):
        owner = value.getparent()
        container = owner.getparent() if value.is_tail else owner
        if container.tag not in IGNORED_TEXT_TAGS and not any(
                ancestor.tag in IGNORED_TEXT_TAGS for ancestor in container.iterancestors()):
            values.append(str(value))
    return "".join(values)


def display_text(element) -> str:
    return " ".join(exact_text(element).split())


def source_state(element) -> dict:
    signals = []
    for item in [element, *element.iterancestors()]:
        if not isinstance(item.tag, str):
            continue
        tags = sorted(STATE_CLASSES.intersection(item.get("class", "").split()))
        attrs = {key: item.get(key) for key in ("hidden", "aria-hidden", "open")
                 if key in item.attrib}
        inline = item.get("style", "")
        if re.search(r"(?:display\s*:\s*none|visibility\s*:\s*hidden|height\s*:\s*0(?:px)?)", inline, re.I):
            attrs["style"] = inline
        if item.tag == "dialog":
            attrs["dialogOpenAttributePresent"] = "open" in item.attrib
        if tags or attrs:
            signals.append({"xpath": item.getroottree().getpath(item),
                            "classes": tags, "attributes": attrs})
    closed_dialog = any(item.tag == "dialog" and "open" not in item.attrib
                        for item in [element, *element.iterancestors()])
    modal = any(has_class(item, "modal") for item in [element, *element.iterancestors()])
    hidden = any("hidden" in signal["classes"] or "off" in signal["classes"]
                 or "hidden" in signal["attributes"]
                 or signal["attributes"].get("aria-hidden") == "true"
                 or "style" in signal["attributes"] for signal in signals)
    return {"classification": "closed-dialog" if closed_dialog else
            "modal-content" if modal else "source-hidden" if hidden else "primary-or-responsive",
            "sourceSignals": signals,
            "computedVisibilityAssessed": False}


class Inventory:
    def __init__(self):
        self.manifest = load("sources/manifest.json")
        self.asset_manifest = load("assets/manifest.json")
        self.asset_lookup = {}
        for asset in self.asset_manifest["assets"]:
            for key in ("url", "resolvedUrl"):
                if asset.get(key):
                    self.asset_lookup[asset[key]] = asset
        self.documents = {}
        self.trees = {}
        self.records = {}
        self.coverage = {}
        for page, source in self.manifest["pages"].items():
            data = (ROOT / source["file"]).read_bytes()
            assert digest(data) == source["sha256"], f"Source hash changed: {page}"
            assert len(data) == source["bytes"], f"Source size changed: {page}"
            self.documents[page] = {**source, "evidenceType": "captured-response-html"}
            # Late charset declarations make libxml guess Latin-1 for domani.
            # Decode the captured UTF-8 bytes explicitly, like capture.py.
            self.trees[page] = html.document_fromstring(data.decode("utf8"), base_url=source["url"])
        widgets_file = ROOT / "sources/rendered-widgets.json"
        widgets = load("sources/rendered-widgets.json")
        for fragment in ("map", "news"):
            key = "home-rendered-" + fragment
            self.documents[key] = {"file": "sources/rendered-widgets.json",
                "jsonPointer": "/" + fragment, "sha256": digest(widgets_file.read_bytes()),
                "url": self.documents["home"]["url"],
                "evidenceType": "captured-rendered-dom-fragment"}
            self.trees[key] = html.fromstring(widgets[fragment])

    def source(self, page, element) -> dict:
        result = {"document": page, "file": self.documents[page]["file"],
                  "sha256": self.documents[page]["sha256"],
                  "xpath": element.getroottree().getpath(element), "line": element.sourceline}
        if "jsonPointer" in self.documents[page]:
            result["jsonPointer"] = self.documents[page]["jsonPointer"]
        return result

    def record(self, page, element, kind="content"):
        if element is None:
            return None
        xpath = element.getroottree().getpath(element)
        identifier = page + ":" + digest(xpath.encode())[:12]
        if identifier not in self.records:
            self.records[identifier] = {"source": self.source(page, element),
                "tag": element.tag, "attributes": dict(element.attrib),
                "textContent": exact_text(element), "text": display_text(element),
                "state": source_state(element), "kinds": []}
        record = self.records[identifier]
        if kind not in record["kinds"]:
            record["kinds"].append(kind)
        if element.tag in ("a", "area"):
            record["url"] = self.resolve_url(page, element.get("href"))
        if element.tag == "img":
            references = []
            for attr in ("src", "data-src", "data-original", "data-lazy-src", "poster"):
                if element.get(attr):
                    url = urljoin(self.documents[page]["url"], element.get(attr))
                    asset = self.asset_lookup.get(url)
                    references.append({"attribute": attr, "sourceValue": element.get(attr),
                        "sourceUrl": url, "localPath": asset.get("file") if asset else None,
                        "sha256": asset.get("sha256") if asset else None,
                        "sourceFile": asset.get("sourceFile") if asset else None,
                        "sourceSha256": asset.get("sourceSha256") if asset else None,
                        "status": "captured-local-asset" if asset else
                        "uncaptured-geolocation-placeholder" if "%cfw-" in url else
                        "excluded-tracking-pixel" if "googleads.g.doubleclick.net" in url else
                        "not-in-asset-manifest"})
            record["assetReferences"] = references
        return identifier

    def refs(self, page, xpath, kind="content", root=None):
        context = self.trees[page] if root is None else root
        return [self.record(page, element, kind) for element in context.xpath(xpath)
                if isinstance(element.tag, str)]

    def first(self, page, xpath, kind="content", root=None):
        values = self.refs(page, xpath, kind, root)
        return values[0] if values else None

    def resolve_url(self, page, value):
        if value is None:
            return None
        if value.startswith("javascript:"):
            return {"sourceValue": value, "absoluteUrl": None, "kind": "script-control"}
        absolute = urljoin(self.documents[page]["url"], value)
        return {"sourceValue": value, "absoluteUrl": absolute,
                "kind": "fragment-control" if value.startswith("#") else
                "external-service" if urlsplit(absolute).scheme in ("http", "https") else
                "other-link"}

    def selector_inventory(self, page):
        tree = self.trees[page]
        links = self.refs(page, "//a[@href]|//area[@href]", "link")
        images = self.refs(page, "//img", "image")
        controls = self.refs(page, "//select|//button|//input|//textarea", "control")
        directories = []
        for select in tree.xpath("//select"):
            directories.append({"selectRef": self.record(page, select, "directory"),
                "options": self.refs(page, ".//option", "directory-option", select),
                "handlerSource": select.get("onchange"),
                "optionValuesAreUrls": False,
                "note": "Valori e handler originali conservati; nessun handler viene eseguito."})
        onclick_targets = []
        for element in tree.xpath("//*[@onclick]"):
            # Only literal assignments. Preserve dynamic controls separately;
            # never evaluate source JavaScript or reconstruct dynamic URLs.
            match = re.search(r"(?:location(?:\.href)?|window\.location(?:\.href)?)\s*=\s*(['\"])(.*?)\1", element.get("onclick"))
            if match:
                onclick_targets.append({"ref": self.record(page, element, "literal-link-handler"),
                                       "url": self.resolve_url(page, match.group(2))})
        return {"links": links, "images": images, "controls": controls,
                "directories": directories, "literalHandlerTargets": onclick_targets}

    def text_nodes(self, page):
        tree = self.trees[page]
        counters = Counter()
        result = []
        scope = "/html/body//text()" if page in self.manifest["pages"] else ".//text()"
        for node in tree.xpath(scope):
            owner = node.getparent()
            container = owner.getparent() if node.is_tail else owner
            if container is None:
                continue
            path = container.getroottree().getpath(container)
            counters[path] += 1
            if not str(node).strip() or container.tag in IGNORED_TEXT_TAGS or any(
                    item.tag in IGNORED_TEXT_TAGS for item in container.iterancestors()):
                continue
            xpath = path + "/text()[" + str(counters[path]) + "]"
            # A tail belongs to the surrounding container, not to a script/style.
            assert tree.xpath(xpath) == [node], f"Text selector mismatch: {page} {xpath}"
            result.append({"sourceXPath": xpath, "text": str(node),
                "displayText": " ".join(str(node).split()), "state": source_state(container)})
        return result

    def page_inventory(self, page):
        tree = self.trees[page]
        primary = []
        for column in tree.xpath(class_xpath("main_content__col1")):
            for element in column:
                if not isinstance(element.tag, str) or element.tag in IGNORED_TEXT_TAGS | {"dialog"} or has_class(element, "modal"):
                    continue
                if display_text(element) or element.xpath(".//img|.//a|.//select|.//area"):
                    primary.append(self.record(page, element, "primary-block"))
        return {"sourceDocument": page,
            "title": self.first(page, "//h1", "page-title"),
            "primaryBlocks": primary,
            "asideBlocks": self.refs(page, "//aside/*[.//h3 or .//img or .//a]", "aside-block"),
            "header": self.first(page, "//header", "header"),
            "navigationGroups": self.refs(page, "//nav//li[./a]", "navigation-group"),
            "footer": self.first(page, "//footer", "footer"),
            "hiddenContent": self.refs(page, "//dialog|//*[contains(concat(' ', normalize-space(@class), ' '), ' modal ')]", "hidden-content"),
            "headings": self.refs(page, "//h1|//h2|//h3|//h4", "heading"),
            **self.selector_inventory(page), "textNodeInventory": self.text_nodes(page)}

    def bologna_secondary(self):
        page = "bologna"
        tree = self.trees[page]
        explanation = self.first(page, "//*[contains(concat(' ',normalize-space(@class),' '),' notizia-geo ')]//p[contains(.,'attendibilità')]", "reliability-explanation")
        author = self.first(page, class_xpath("forecast_update__author"), "meteorologist-attribution")
        profile_match = re.search(r"location\.href=(['\"])(.*?)\1", self.records[author]["attributes"]["onclick"])
        location = self.first(page, class_xpath("infoloc"), "location-facts")
        location_paragraph = self.first(page, "//*[contains(concat(' ',normalize-space(@class),' '),' infoloc ')]/p", "location-values")
        sun_moon = self.first(page, class_xpath("eff"), "sun-moon")
        climate = []
        for element in tree.xpath(class_xpath("weather_informations__box__sub_box")):
            climate.append({"sectionRef": self.record(page, element, "climate-or-history"),
                "titleRef": self.first(page, ".//h3", "climate-title", element),
                "paragraphRefs": self.refs(page, ".//p", "climate-value", element),
                "linkRefs": self.refs(page, ".//a", "climate-link", element)})
        totals = []
        for element in tree.xpath(class_xpath("weather_informations__box")):
            if element.xpath("./h2"):
                totals.append({"sectionRef": self.record(page, element, "environmental-total"),
                    "titleRef": self.first(page, "./h2", "environmental-title", element),
                    "valueRefs": self.refs(page, "./p", "environmental-value", element)})
        dialogs = []
        orphan_rows = []
        rows = tree.xpath("//tr[@data-hour]")
        for dialog in tree.xpath("//dialog"):
            identifier = dialog.get("id")
            expected_key = identifier.removeprefix("dialog-dettaglio-")
            direct_rows = [row for row in rows if row.get("data-dialogid") == expected_key]
            fields = []
            for field in dialog.xpath(".//div[contains(concat(' ',normalize-space(@class),' '),' data-row ')]"):
                label = field.xpath("./div[contains(concat(' ',normalize-space(@class),' '),' data-label ')]")
                value = field.xpath("./div[contains(concat(' ',normalize-space(@class),' '),' data-value ')]")
                if label and value:
                    fields.append({"label": display_text(label[0]), "value": display_text(value[0]),
                        "labelRef": self.record(page, label[0], "dialog-field-label"),
                        "valueRef": self.record(page, value[0], "dialog-field-value")})
            dialogs.append({"dialogRef": self.record(page, dialog, "hourly-detail-dialog"),
                "sourceDialogId": identifier, "intervalHours": 3 if identifier.endswith("h3") else 1,
                "directRowRefs": [self.record(page, row, "forecast-row") for row in direct_rows],
                "descriptionRef": self.first(page, ".//*[contains(concat(' ',normalize-space(@class),' '),' previ-descri ')]", "dialog-condition", dialog),
                "fields": fields,
                "note": "Dettaglio chiuso nel DOM; i valori 1h e 3h sono distinti."})
        for row in rows:
            target = "dialog-dettaglio-" + row.get("data-dialogid")
            if not tree.xpath("//dialog[@id='" + target + "']"):
                orphan_rows.append({"rowRef": self.record(page, row, "forecast-row"),
                    "sourceDialogIdRequested": target,
                    "status": "target-id-absent-in-source",
                    "candidateDialogRef": self.first(page, "//dialog[@id='dialog-dettaglio-26h3']", "hourly-detail-dialog") if row.get("data-hour") == "2" else None,
                    "candidateMethod": "Source visible hour and 3h interval; direct source IDs do not match."})
        hourly_environment = []
        for row in rows:
            hourly_environment.append({"rowRef": self.record(page, row, "forecast-row"),
                "hour": row.get("data-hour"), "dataImportTs": row.get("data-import_ts"),
                "intervalHours": 3 if has_class(row, "forecast_3h") else 1,
                "airQualityRefs": self.refs(page, ".//*[contains(concat(' ',normalize-space(@class),' '),' qa-co ') or contains(concat(' ',normalize-space(@class),' '),' qa-pm10 ') or contains(concat(' ',normalize-space(@class),' '),' qa-no2 ')]", "hourly-air-measure", row)})
        return {"reliability": {"indicatorRef": self.first(page, "//*[@id='attend_prev_widget']", "reliability-indicator"),
                    "explanationRef": explanation,
                    "semanticNote": "L'attendibilità della giornata e la probabilità di precipitazione dei dialog non sono lo stesso campo."},
            "forecastNarrativeRef": self.first(page, class_xpath("notizia-geo"), "forecast-narrative"),
            "forecastParagraphRef": self.first(page, "//*[contains(concat(' ',normalize-space(@class),' '),' notizia-geo ')]//p[starts-with(.,'A Bologna')]", "forecast-paragraph"),
            "meteorologist": {"attributionRef": author,
                "photoRef": self.first(page, "//*[contains(concat(' ',normalize-space(@class),' '),' forecast_update__author ')]//img", "meteorologist-photo"),
                "profileUrl": self.resolve_url(page, profile_match.group(2)),
                "profileUrlEvidence": author},
            "location": {"sectionRef": location,
                "paragraphRef": location_paragraph,
                "coordinateAttributeRef": self.first(page, "//*[@data-lat and @data-lon]", "location-coordinates"),
                "fieldsFromSourceText": self.source_matches(location_paragraph,
                    r"(CAP)\s+(\d+)|(Lat|Lon|Alt):\s*([\d.]+(?:°|m s\.l\.m\.))", paired_alternatives=True),
                "populationSourceText": re.search(r"[\d.]+ abitanti", self.records[location_paragraph]["textContent"]).group(0)},
            "sunMoon": {"sectionRef": sun_moon,
                "timeValuesFromSourceText": self.source_matches(sun_moon,
                    r"(Sorge|Tramonta|Leva|Cala):\s*([0-9]+:[0-9]+)")},
            "airQuality": {"sectionRef": self.first(page, "//*[@id='box-previsioni-aria']", "air-and-pollen"),
                "currentRef": self.first(page, class_xpath("iqa-circle-graph-main"), "air-current"),
                "otherPublishedDays": self.refs(page, class_xpath("iqa-circle-graphs-others"), "air-other-day"),
                "pollenLegendItems": self.refs(page, class_xpath("pollini-item"), "pollen-indicator"),
                "hourlyMeasures": hourly_environment,
                "unitNote": "No unit is printed beside NO2/PM10/CO in these captured widgets; none is inferred.",
                "pollenNote": "The four source labels form a visual indicator; only the dot style marks Assente. Do not promote all four labels to measurements."},
            "totals": totals, "climateAndHistory": climate,
            "forecastToolsRef": self.first(page, class_xpath("forecast_gadgets2"), "forecast-tools"),
            "cityServicesRef": self.first(page, class_xpath("sitelink_buttons"), "city-services"),
            "webcamStripRef": self.first(page, class_xpath("bli-webcam-strip"), "webcam-strip"),
            "hourlyDetailDialogs": dialogs, "sourceDialogAssociationGaps": orphan_rows}

    def source_matches(self, record_ref, pattern, paired_alternatives=False):
        record = self.records[record_ref]
        matches = []
        for match in re.finditer(pattern, record["textContent"]):
            groups = [part for part in match.groups() if part is not None] if paired_alternatives else match.groups()
            matches.append({"label": groups[0], "value": groups[1],
                 "sourceRef": record_ref, "method": "Exact substring extraction from source textContent"}
            )
        return matches

    def home_secondary(self):
        page = "home"
        days = []
        for index in range(7):
            days.append({"tabRef": self.first(page, f"//*[@id='Pmtab{index}']", "synthetic-forecast-tab"),
                "dateTitleRef": self.first(page, f"//*[@id='PmtabareaTit{index}']", "synthetic-forecast-date"),
                "narrativeRef": self.first(page, f"//*[@id='PmtabareaDesc{index}']", "synthetic-forecast-narrative")})
        return {"headlineRef": self.first(page, "//*[@id='home-page-title']", "home-headline"),
            "summaryRef": self.first(page, "//*[@id='html_pre1']", "home-summary"),
            "syntheticForecast": {"sectionRef": self.first(page, "//*[@id='meteoProssimiGiorni']", "synthetic-forecasts"),
                "attributionRef": self.first(page, "//*[@id='meteoProssimiGiorni']//span[@class='title_right']", "national-attribution"),
                "days": days},
            "newsColumns": self.refs(page, class_xpath("block_news__col"), "news-column"),
            "carouselRef": self.first(page, class_xpath("home_carousel"), "news-carousel"),
            "mapControlsRef": self.first(page, class_xpath("block_weather_prevision__forecast_maps"), "home-map-controls"),
            "smallForecastMaps": self.refs(page, class_xpath("block_weather_prevision__map_list"), "home-small-maps"),
            "serviceMenuRef": self.first(page, class_xpath("block_menu"), "home-service-menu"),
            "videoRef": self.first(page, class_xpath("block_video"), "home-video"),
            "runtimeEvidence": {"radarMapRef": self.record("home-rendered-map", self.trees["home-rendered-map"], "captured-radar-dom"),
                "hiddenNewsRef": self.record("home-rendered-news", self.trees["home-rendered-news"], "captured-hidden-news-dom")}}

    def domani_secondary(self, home):
        page = "domani"
        periods = []
        tomorrow_date_title = home["syntheticForecast"]["days"][1]["dateTitleRef"]
        day_after_date_title = home["syntheticForecast"]["days"][2]["dateTitleRef"]
        def date_from_title(ref):
            source_text = self.records[ref]["text"]
            match = re.search(r"(\d+) Ottobre (\d{4})", source_text)
            assert match, f"Full source date is unavailable: {source_text}"
            return date(int(match.group(2)), 10, int(match.group(1))).isoformat()
        for element in self.trees[page].xpath(class_xpath("daily_forecast__maps")):
            title = element.xpath(".//h2")[0]
            text = display_text(title)
            night = "dopodomani" in text
            # This ISO date is a deterministic reading of the source's relative
            # day together with the fully written captured Home date title.
            # Keep source text and the interpretation separately.
            periods.append({"sectionRef": self.record(page, element, "national-period-map"),
                "labelRef": self.record(page, title, "national-period-label"),
                "sourceLabel": text,
                "mapRefs": self.refs(page, ".//img", "national-period-image", element),
                "dateContext": {"dateIsoDerived": date_from_title(day_after_date_title if night else tomorrow_date_title),
                    "relativeDayText": "meteo dopodomani" if night else "meteo domani",
                    "fullyWrittenDateTitleRef": day_after_date_title if night else tomorrow_date_title,
                    "derivation": "Source relative-day phrase matched to the corresponding fully written date in the captured Home forecasts."}})
        return {"titleRefs": self.refs(page, class_xpath("daily_forecast__title"), "national-title-copy"),
            "updateRefs": self.refs(page, class_xpath("daily_forecast__updated"), "national-update-copy"),
            "summaryRef": self.first(page, class_xpath("daily_forecast__general__text"), "national-narrative"),
            "regions": self.refs(page, class_xpath("daily_forecast__area"), "national-region"),
            "fullDayMapRef": self.first(page, "//*[@id='bigmap_image']", "national-full-day-map"),
            "periodMaps": periods,
            "responsiveTimeControlsRef": self.first(page, class_xpath("daily_forecast__general__time"), "national-time-controls"),
            "responsiveMapContainerRef": self.first(page, class_xpath("daily_forecast__map_container"), "national-mobile-map-placeholder"),
            "dayNavigationRef": self.first(page, class_xpath("daily_forecast__list_days"), "national-day-navigation")}

    def build(self):
        pages = {page: self.page_inventory(page) for page in self.manifest["pages"]}
        pages["home"]["secondary"] = self.home_secondary()
        pages["bologna"]["secondary"] = self.bologna_secondary()
        pages["domani"]["secondary"] = self.domani_secondary(pages["home"]["secondary"])
        runtime = {page: {"sourceDocument": page, **self.selector_inventory(page),
                          "textNodeInventory": self.text_nodes(page)}
                   for page in self.trees if page.startswith("home-rendered-")}
        groups = defaultdict(list)
        for identifier, record in self.records.items():
            if record["text"]:
                target = record.get("url", {}).get("sourceValue") if record.get("url") else None
                groups[(record["tag"], record["text"], target)].append(identifier)
        duplicates = [{"text": key[1], "tag": key[0], "sourceHref": key[2], "recordRefs": values,
                       "reason": "Identical whitespace-normalized text, tag and source href; occurrences remain separate."}
                      for key, values in groups.items() if len(values) > 1]
        return {"schemaVersion": 1, "editionDate": "2026-10-08", "liveData": False,
            "provenance": {"extractor": "scripts/extract-supplementary.py", "extractorSha256": digest(SCRIPT.read_bytes()),
                "sourceManifestSha256": digest((ROOT / "sources/manifest.json").read_bytes()),
                "assetManifestSha256": digest((ROOT / "assets/manifest.json").read_bytes())},
            "semantics": {"referenceResolution": "Resolve each Ref or Refs through records. Each record carries the exact source file SHA-256 and unique parsed-DOM XPath.",
                "textContent": "Exact lxml-decoded descendant text, retaining whitespace and NBSP, excluding script/style/template/noscript text. Source entities are decoded by the parser; the immutable HTML retains original bytes.",
                "text": "Whitespace-normalized reading copy. Never a rewritten forecast.",
                "sourceState": "Source attributes/classes only, not a browser computed-visibility result. Closed dialogs, off tabs, responsive copies and hidden runtime material stay distinct.",
                "dateContext": "ISO dates are explicitly derived and cite fully written date titles; sourceLabel is unchanged.",
                "externalServices": "Source links and handler text are inventory evidence, not promises that external services operate offline.",
                "licenses": "No new license claims. Existing assets/manifest.json and assets/attributions.json remain authoritative.",
                "approval": "Content audit only. No design/composition approval is asserted and no redesigned page is authored."},
            "sourceDocuments": self.documents, "pages": pages, "runtimeFragments": runtime,
            "records": self.records, "duplicateGroups": duplicates}


def validate(inventory, result):
    checks = []
    for identifier, record in result["records"].items():
        tree = inventory.trees[record["source"]["document"]]
        found = tree.xpath(record["source"]["xpath"])
        assert len(found) == 1, f"Nonunique selector: {identifier}"
        assert exact_text(found[0]) == record["textContent"], f"Changed source text: {identifier}"
        assert dict(found[0].attrib) == record["attributes"], f"Changed attributes: {identifier}"
    for page, data in {**result["pages"], **result["runtimeFragments"]}.items():
        expected = inventory.text_nodes(page)
        assert expected == data["textNodeInventory"], f"Incomplete text-node coverage: {page}"
        for node in data["textNodeInventory"]:
            assert inventory.trees[page].xpath(node["sourceXPath"]) == [node["text"]]
        checks.append({"name": "source-text-and-selector-coverage", "document": page,
                       "passed": True, "nonblankTextNodes": len(expected)})
    checked_assets = set()
    missing_assets = []
    for record in result["records"].values():
        for asset in record.get("assetReferences", []):
            if asset["localPath"]:
                path = ROOT / asset["localPath"]
                assert path.is_file(), f"Missing mapped local asset: {path}"
                assert digest(path.read_bytes()) == asset["sha256"], f"Changed asset: {path}"
                checked_assets.add(asset["localPath"])
            else:
                missing_assets.append({"source": record["source"], **asset})
    bologna = result["pages"]["bologna"]["secondary"]
    warning = result["records"][bologna["reliability"]["explanationRef"]]["text"]
    assert "50%" in warning and "localizzazione, l'intensità e la tempistica" in warning
    assert len(bologna["hourlyDetailDialogs"]) == 10
    assert sum(item["intervalHours"] == 1 for item in bologna["hourlyDetailDialogs"]) == 7
    probabilities = [(item["sourceDialogId"], field["value"]) for item in bologna["hourlyDetailDialogs"]
                     for field in item["fields"] if field["label"] == "Probabilità di precipitazione"]
    assert len(probabilities) == 10 and probabilities[0] == ("dialog-dettaglio-20", "50%")
    assert probabilities[1] == ("dialog-dettaglio-21", "11%")
    assert len(bologna["sourceDialogAssociationGaps"]) == 1
    assert bologna["sourceDialogAssociationGaps"][0]["sourceDialogIdRequested"] == "dialog-dettaglio-2h3"
    periods = result["pages"]["domani"]["secondary"]["periodMaps"]
    assert len(periods) == 4 and all(len(period["mapRefs"]) == 2 for period in periods)
    assert [period["sourceLabel"] for period in periods] == [
        "MATTINA - meteo domani, ore 8-11", "POMERIGGIO - meteo domani, ore 14-20",
        "SERA - meteo domani, ore 23", "NOTTE - meteo dopodomani, ore 2-5"]
    assert [period["dateContext"]["dateIsoDerived"] for period in periods] == [
        "2026-10-09", "2026-10-09", "2026-10-09", "2026-10-10"]
    for period in periods:
        for ref in period["mapRefs"]:
            assert result["records"][ref]["assetReferences"][0]["localPath"]
    assert len(result["pages"]["home"]["secondary"]["syntheticForecast"]["days"]) == 7
    references = []
    def collect_references(value, key=""):
        if isinstance(value, dict):
            for child_key, child_value in value.items():
                collect_references(child_value, child_key)
        elif isinstance(value, list):
            for child in value:
                collect_references(child, key)
        elif isinstance(value, str) and (key.endswith("Ref") or key.endswith("Refs")):
            references.append(value)
    collect_references(result)
    assert all(ref in result["records"] for ref in references), "Unresolved record reference"
    checks.extend([{"name": "record-selector-text-attribute-roundtrip", "passed": True, "records": len(result["records"])},
        {"name": "mapped-local-asset-hashes", "passed": True, "assets": len(checked_assets)},
        {"name": "reliability-versus-dialog-precipitation-probability", "passed": True, "dialogFields": len(probabilities)},
        {"name": "national-period-label-date-and-map-assets", "passed": True, "periods": 4, "images": 8},
        {"name": "source-dialog-association-gap-preserved", "passed": True, "gaps": 1}])
    checks.append({"name": "semantic-section-references-resolve", "passed": True, "references": len(references)})
    return checks, missing_assets, probabilities


def existing_coverage():
    weather = load("data/weather.json")
    normalized = load("data/normalized.json")
    return {"weather": {"file": "data/weather.json", "sha256": digest((ROOT / "data/weather.json").read_bytes()),
            "daily": len(weather["daily"]), "hourly": len(weather["hourly"]), "realtime": len(weather["realtime"]),
            "regions": len(weather["regions"]), "news": len(weather["news"]), "details": len(weather["details"]),
            "forecastSummary": len(weather["forecastSummary"])},
        "normalized": {"file": "data/normalized.json", "sha256": digest((ROOT / "data/normalized.json").read_bytes()),
            "daily": len(normalized["daily"]), "hourly": len(normalized["hourly"])},
        "assessment": [
            {"category": "Daily/hourly weather, national regional prose, home news", "before": "Structured in weather.json and normalized.json", "after": "Preserved and cross-referenced; no weather rows added."},
            {"category": "Bologna narrative and reliability explanation", "before": "forecastSummary is empty; the reliability warning and narrative are not structured", "after": "Dedicated source records with exact wording."},
            {"category": "Meteorologist", "before": "Attribution text exists; photo, literal profile target and provenance are absent", "after": "Attribution, photo local path/hash and original profile handler linked."},
            {"category": "Location and sun/moon", "before": "Absent from weather.json and normalized.json", "after": "Dedicated records; exact source values and time substrings."},
            {"category": "Air and pollen", "before": "Hourly pollutant strings exist; full daily widget, its indices and visual pollen indicator are absent", "after": "Daily and hourly source records; no inferred units or dates."},
            {"category": "Solar/rain totals and climate/history", "before": "Flattened text in three details entries, without leaf selectors or category fields", "after": "Titles, each paragraph/value and service links structured separately."},
            {"category": "National period maps", "before": "Absent from weather.json and normalized.json", "after": "Four exact labels, eight local images, and explicit cross-source date interpretation."},
            {"category": "National seven-day synthetic forecasts", "before": "Only top summary structured; seven tabs and their narratives remain only in source DOM", "after": "Each source date/title and narrative retained; hidden off tabs identified."},
            {"category": "Directories, tools, services, footer", "before": "Available in capture/source evidence but absent from compact weather schema", "after": "All source anchors/map areas/images/selects/options and footer records."},
            {"category": "Closed hourly dialogs", "before": "Absent from compact weather schema; includes actual precipitation probabilities and alternate units", "after": "Ten dialogs separately structured by interval with source field labels/values."}]}


def build_report(inventory, result, checks, missing_assets, probabilities):
    counts = {}
    for page, data in result["pages"].items():
        counts[page] = {"primaryBlocks": len(data["primaryBlocks"]), "links": len(data["links"]),
            "images": len(data["images"]), "selects": len(data["directories"]),
            "options": sum(len(item["options"]) for item in data["directories"]),
            "hiddenContent": len(data["hiddenContent"]), "textNodes": len(data["textNodeInventory"])}
    return {"schemaVersion": 1, "scope": "Frozen offline Home, Bologna and national meteo-domani; content extraction only",
        "editionDate": result["editionDate"], "passed": all(check["passed"] for check in checks),
        "output": {"file": "esempi/ilmeteo-lab/data/supplementary.json", "sha256": digest(serialized(result).encode("utf8")),
                   "records": len(result["records"]), "duplicateGroups": len(result["duplicateGroups"])},
        "sourceHashes": {page: source["sha256"] for page, source in result["sourceDocuments"].items()},
        "existingCoverage": existing_coverage(), "counts": counts, "checks": checks,
        "gapsAndConstraints": [
            {"kind": "source-inconsistency", "text": "3h hour 2 row requests dialog-dettaglio-2h3, but only dialog-dettaglio-26h3 exists. Candidate pairing remains explicitly derived."},
            {"kind": "source-context", "text": "National NOTTE is meteo dopodomani ore 2-5: date interpretation is 2026-10-10. Other periods belong to 2026-10-09."},
            {"kind": "source-context", "text": "Daily air widget prints Lunedì/Martedì/Mercoledì without calendar dates and does not print pollutant units. These are not inferred."},
            {"kind": "source-context", "text": "Pollen Assente/Bassa/Media/Alta are indicator labels. Dot styles are preserved without inventing four measured values."},
            {"kind": "source-limit", "text": "Only 7 one-hour and 3 three-hour forecasts exist in the captured city DOM. Full-day hourly data and other-city forecasts cannot be reconstructed."},
            {"kind": "source-limit", "text": "Home geolocation placeholders and empty webcam/player containers contain no captured live values or media. They remain placeholders or service links."},
            {"kind": "source-limit", "text": "Copyright year span is empty in raw HTML. No replacement year is inserted into source content."},
            {"kind": "workflow", "text": "The inventory does not implement redesigned UI or assert direction/composition approval."}],
        "unmappedImageReferences": missing_assets,
        "dialogPrecipitationProbabilities": [{"sourceDialogId": identifier, "sourceValue": value}
                                             for identifier, value in probabilities],
        "method": {"networkUsed": False, "browserUsed": False, "sourceMutation": False,
            "parser": "lxml; explicit UTF-8 decoding", "coverage": "Every nonblank body text node outside script/style/template/noscript has an exact validated XPath. All anchors, map areas, images, controls and select options are inventoried."}}


def markdown_report(report):
    rows = ["# Copertura dei contenuti · iLMeteo offline", "",
        "Edizione congelata dell’8 ottobre 2026. Inventario dei tre HTML originali e dei due frammenti DOM acquisiti; nessuna rete, nessun browser e nessuna modifica alle fonti.", "",
        "L’estrazione integra `weather.json` e `normalized.json`: conserva testo esatto decodificato, numeri e unità come stringhe, URL originali, percorsi/hash degli asset locali e XPath univoci. `records` contiene i contenuti; i campi `Ref` e `Refs` delle sezioni puntano a questi record. `textContent` mantiene spazi e NBSP; `text` normalizza soltanto gli spazi.", "",
        "## Inventario", "", "| Pagina | Blocchi principali | Link/aree | Immagini | Select/opzioni | Contenuti chiusi | Nodi di testo |",
        "| --- | ---: | ---: | ---: | ---: | ---: | ---: |"]
    for page, values in report["counts"].items():
        rows.append(f"| {page} | {values['primaryBlocks']} | {values['links']} | {values['images']} | {values['selects']}/{values['options']} | {values['hiddenContent']} | {values['textNodes']} |")
    rows.extend(["", "## Contenuti resi disponibili", ""])
    for item in report["existingCoverage"]["assessment"]:
        rows.append(f"- **{item['category']}** — Prima: {item['before']}. Ora: {item['after']}")
    rows.extend(["", "## Distinzioni da conservare nell’interfaccia", "",
        "L’attendibilità del 50% è accompagnata dall’avviso del meteorologo sulla localizzazione, intensità e tempistica dei fenomeni. I dialog orari contengono inoltre la diversa voce «Probabilità di precipitazione»: 50% per le 20:00 a 1h, 11% per le 21:00 a 1h, 0% nei successivi cinque dialog a 1h; 11%, 11%, 0% nei tre dialog a 3h. Sono valori effettivamente acquisiti, con selector e associazione alla riga. Non costituiscono probabilità giornaliere e non sostituiscono l’attendibilità.", "",
        "I dialog 1h e 3h non sono duplicati equivalenti: alcuni valori sono diversi. `state` registra classi/attributi sorgenti e dialog senza `open`; non pretende di essere una verifica della visibilità calcolata nel browser. `duplicateGroups` mantiene tutte le occorrenze di testi e collegamenti uguali. Le schede `off` delle previsioni sintetiche conservano ciascuna data e testo originali.", "",
        "Le mappe nazionali conservano esattamente MATTINA ore 8–11, POMERIGGIO ore 14–20, SERA ore 23 e NOTTE «meteo dopodomani, ore 2-5». Gli ISO 2026-10-09/2026-10-10 sono interpretazioni esplicite collegate ai titoli completi delle previsioni Home, non date inventate o aggiornate.", "",
        "## Lacune e vincoli della fonte", ""])
    rows.extend("- " + gap["text"] for gap in report["gapsAndConstraints"])
    rows.extend(["", f"Riferimenti immagine senza voce nel manifest: {len(report['unmappedImageReferences'])}. Sono conservati nel rapporto e non scaricati.", "",
        "## Verifica riproducibile", "",
        "```sh", "/Users/marco/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 esempi/ilmeteo-lab/scripts/extract-supplementary.py",
        "/Users/marco/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 esempi/ilmeteo-lab/scripts/extract-supplementary.py --check", "```", "",
        f"Esito: {'PASS' if report['passed'] else 'FAIL'}. {report['output']['records']} record verificati; {report['output']['duplicateGroups']} gruppi di occorrenze duplicate. Tutti i selector risolvono esattamente un nodo con testo e attributi invariati. Tutti i percorsi locali mappati risolvono un file con l’hash del manifest. L’estrazione controlla i tre hash HTML prima di scrivere e verifica che gli input conservati non cambino.", "",
        "Output: `esempi/ilmeteo-lab/data/supplementary.json`, `reports/ilmeteo-lab/content-coverage.json`, questo rapporto. Nessuna pagina HTML/CSS/JS di riprogettazione viene creata."])
    return "\n".join(rows) + "\n"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Verify deterministic output without writing")
    args = parser.parse_args()
    protected = [*sorted((ROOT / "sources").glob("*")), *sorted((ROOT / "originale").glob("*")),
        ROOT / "assets/manifest.json", ROOT / "assets/attributions.json",
        ROOT / "data/weather.json", ROOT / "data/normalized.json", ROOT / "data/capture.json"]
    protected_hashes = {str(path): digest(path.read_bytes()) for path in protected if path.is_file()}
    inventory = Inventory()
    result = inventory.build()
    checks, missing_assets, probabilities = validate(inventory, result)
    assert all(digest(Path(path).read_bytes()) == sha for path, sha in protected_hashes.items()), "Protected input changed"
    checks.append({"name": "protected-input-hashes-unchanged", "passed": True, "files": len(protected_hashes)})
    report = build_report(inventory, result, checks, missing_assets, probabilities)
    outputs = {OUTPUT: serialized(result), REPORT_ROOT / "content-coverage.json": serialized(report),
               REPORT_ROOT / "content-coverage.md": markdown_report(report)}
    for path, content in outputs.items():
        if args.check:
            assert path.read_text(encoding="utf8") == content, f"Output is not reproducible: {path}"
        else:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content, encoding="utf8")
    print(serialized({"passed": True, "mode": "check" if args.check else "extract",
        "records": len(result["records"]), "counts": report["counts"],
        "unmappedImages": len(missing_assets), "supplementarySha256": report["output"]["sha256"]}).strip())


if __name__ == "__main__":
    main()
