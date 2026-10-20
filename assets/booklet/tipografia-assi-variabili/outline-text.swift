import Foundation
import CoreText
import CoreGraphics

// Local variant of assets/font-previews/outline.swift. It accepts arbitrary text
// and returns paths with their baseline coordinates for a multi-sample diagram.
struct Request: Codable {
    let slug: String
    let path: String
    let postscriptName: String
    let text: String
    let body: Double
    let variations: [String: Double]
}
let inputs = try JSONDecoder().decode([Request].self, from: Data(contentsOf: URL(fileURLWithPath: CommandLine.arguments[1])))
var reports: [[String: Any]] = []
func number(_ value: CGFloat) -> String { String(format: "%.5f", locale: Locale(identifier: "en_US_POSIX"), Double(value)) }

for input in inputs {
    let url = URL(fileURLWithPath: input.path).resolvingSymlinksInPath()
    CTFontManagerRegisterFontsForURL(url as CFURL, .process, nil)
    let descriptors = CTFontManagerCreateFontDescriptorsFromURL(url as CFURL) as! [CTFontDescriptor]
    let exact = descriptors.filter { (CTFontDescriptorCopyAttribute($0, kCTFontNameAttribute) as? String) == input.postscriptName }
    guard exact.count == 1 else { fatalError("Exact face unavailable: \(input.slug)") }
    var axes: [NSNumber: NSNumber] = [:]
    for (tag, value) in input.variations {
        let bytes = Array(tag.utf8)
        guard bytes.count == 4 else { fatalError("Invalid axis") }
        let key = bytes.reduce(UInt32(0)) { ($0 << 8) | UInt32($1) }
        axes[NSNumber(value: key)] = NSNumber(value: value)
    }
    let descriptor = CTFontDescriptorCreateCopyWithAttributes(exact[0], [kCTFontVariationAttribute: axes] as CFDictionary)
    let font = CTFontCreateWithFontDescriptor(descriptor, CGFloat(input.body), nil)
    let actual = CTFontCopyPostScriptName(font) as String
    guard let sourceURL = CTFontCopyAttribute(font, kCTFontURLAttribute) as? URL,
          sourceURL.resolvingSymlinksInPath() == url else { fatalError("Source font mismatch: \(input.slug)") }
    var effective: [String: Double] = [:]
    if let variations = CTFontCopyVariation(font) as? [NSNumber: NSNumber] {
        for (key, value) in variations {
            let tag = key.uint32Value
            let bytes = [UInt8((tag >> 24) & 255), UInt8((tag >> 16) & 255), UInt8((tag >> 8) & 255), UInt8(tag & 255)]
            effective[String(bytes: bytes, encoding: .ascii)!] = value.doubleValue
        }
    }
    for (tag, value) in input.variations {
        guard let result = effective[tag], abs(result - value) < 0.02 else { fatalError("Axis mismatch: \(input.slug), \(tag)") }
    }
    let string = NSAttributedString(string: input.text, attributes: [NSAttributedString.Key(kCTFontAttributeName as String): font])
    let line = CTLineCreateWithAttributedString(string)
    let path = CGMutablePath()
    var glyphCount = 0
    var fontNames: [String] = []
    for value in CTLineGetGlyphRuns(line) as NSArray {
        let run = value as! CTRun
        let attrs = CTRunGetAttributes(run) as NSDictionary
        let runFont = attrs[kCTFontAttributeName] as! CTFont
        let runName = CTFontCopyPostScriptName(runFont) as String
        guard runName == actual,
              let runURL = CTFontCopyAttribute(runFont, kCTFontURLAttribute) as? URL,
              runURL.resolvingSymlinksInPath() == url else { fatalError("Font fallback: \(input.slug)") }
        fontNames.append(runName)
        let count = CTRunGetGlyphCount(run)
        var glyphs = [CGGlyph](repeating: 0, count: count)
        var positions = [CGPoint](repeating: .zero, count: count)
        CTRunGetGlyphs(run, CFRange(location: 0, length: 0), &glyphs)
        CTRunGetPositions(run, CFRange(location: 0, length: 0), &positions)
        for index in 0..<count {
            guard glyphs[index] != 0 else { fatalError("Missing glyph: \(input.slug)") }
            if let outline = CTFontCreatePathForGlyph(runFont, glyphs[index], nil) {
                var transform = CGAffineTransform(translationX: positions[index].x, y: positions[index].y)
                path.addPath(outline.copy(using: &transform)!)
            }
        }
        glyphCount += count
    }
    let bounds = path.boundingBoxOfPath
    var d = ""
    path.applyWithBlock { pointer in
        let item = pointer.pointee
        func point(_ index: Int) -> String { "\(number(item.points[index].x)) \(number(item.points[index].y))" }
        switch item.type {
        case .moveToPoint: d += "M" + point(0)
        case .addLineToPoint: d += "L" + point(0)
        case .addQuadCurveToPoint: d += "Q" + point(0) + " " + point(1)
        case .addCurveToPoint: d += "C" + point(0) + " " + point(1) + " " + point(2)
        case .closeSubpath: d += "Z"
        @unknown default: fatalError("Unknown path element")
        }
    }
    reports.append([
        "slug": input.slug, "text": input.text, "path": d,
        "bodyPx": input.body, "postscriptName": actual,
        "requestedVariations": input.variations, "effectiveVariations": effective,
        "inkBounds": [bounds.minX, bounds.minY, bounds.width, bounds.height],
        "advanceWidth": CTLineGetTypographicBounds(line, nil, nil, nil),
        "glyphCount": glyphCount, "runFonts": fontNames,
        "shaping": "Apple CoreText CTLine / CTRun; exact source-file, face, axis and fallback guards"
    ])
}
let report = try JSONSerialization.data(withJSONObject: reports, options: [.prettyPrinted, .sortedKeys])
FileHandle.standardOutput.write(report)
