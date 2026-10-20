import Foundation
import CoreText
import CoreGraphics

struct Request: Codable {
 let slug: String
 let path: String
 let postscriptName: String
 let name: String
 let body: Double
 let variations:[String:Double]?
}
let decoder=JSONDecoder()
let inputs=try decoder.decode([Request].self,from:Data(contentsOf:URL(fileURLWithPath:CommandLine.arguments[1])))
var reports:[[String:Any]]=[]
func number(_ x:CGFloat)->String {String(format:"%.5f",Double(x))}
func xml(_ value:String)->String {value.replacingOccurrences(of:"&",with:"&amp;").replacingOccurrences(of:"<",with:"&lt;").replacingOccurrences(of:">",with:"&gt;").replacingOccurrences(of:"\"",with:"&quot;")}
for input in inputs {
 let url=URL(fileURLWithPath:input.path)
 var registerError:Unmanaged<CFError>?
 CTFontManagerRegisterFontsForURL(url as CFURL,.process,&registerError)
 let descriptors=CTFontManagerCreateFontDescriptorsFromURL(url as CFURL) as! [CTFontDescriptor]
 let exact=descriptors.filter{(CTFontDescriptorCopyAttribute($0,kCTFontNameAttribute) as? String)==input.postscriptName}
 guard exact.count==1 else {fatalError("Exact file face unavailable: \(input.slug)")}
 var chosen=exact[0]
 if let variations=input.variations {
  var values:[NSNumber:NSNumber]=[:]
  for (tag,value) in variations {
   let bytes=Array(tag.utf8)
   guard bytes.count==4 else {fatalError("Invalid axis")}
   let key=bytes.reduce(UInt32(0)){($0 << 8) | UInt32($1)}
   values[NSNumber(value:key)]=NSNumber(value:value)
  }
  chosen=CTFontDescriptorCreateCopyWithAttributes(chosen,[kCTFontVariationAttribute:values] as CFDictionary)
 }
 let font=CTFontCreateWithFontDescriptor(chosen,CGFloat(input.body),nil)
 let actual=CTFontCopyPostScriptName(font) as String
 guard let sourceURL=CTFontCopyAttribute(font,kCTFontURLAttribute) as? URL, sourceURL.resolvingSymlinksInPath()==url.resolvingSymlinksInPath() else {fatalError("Exact source font mismatch: \(input.slug)")}
 let string=NSAttributedString(string:"Tipografia",attributes:[NSAttributedString.Key(kCTFontAttributeName as String):font])
 let line=CTLineCreateWithAttributedString(string)
 let path=CGMutablePath()
 var fontNames=[String]()
 var glyphCount=0
 for value in CTLineGetGlyphRuns(line) as NSArray {
  let run=value as! CTRun
  let attrs=CTRunGetAttributes(run) as NSDictionary
  let runFont=attrs[kCTFontAttributeName] as! CTFont
  let runName=CTFontCopyPostScriptName(runFont) as String
  fontNames.append(runName)
  guard runName==actual else {fatalError("Fallback in \(input.slug): \(runName)")}
  let count=CTRunGetGlyphCount(run)
  var glyphs=[CGGlyph](repeating:0,count:count)
  var points=[CGPoint](repeating:.zero,count:count)
  CTRunGetGlyphs(run,CFRange(location:0,length:0),&glyphs)
  CTRunGetPositions(run,CFRange(location:0,length:0),&points)
  for i in 0..<count {
   guard let glyphPath=CTFontCreatePathForGlyph(runFont,glyphs[i],nil) else {fatalError("Missing outline \(input.slug)")}
   var transform=CGAffineTransform(translationX:points[i].x,y:points[i].y)
   guard let placed=glyphPath.copy(using:&transform) else {fatalError("Path placement failed")}
   path.addPath(placed)
  }
  glyphCount += count
 }
 let bounds=path.boundingBoxOfPath
 let pad:CGFloat=3
 let viewBox="\(number(bounds.minX-pad)) \(number(-bounds.maxY-pad)) \(number(bounds.width+pad*2)) \(number(bounds.height+pad*2))"
 var d=""
 path.applyWithBlock {pointer in
  let item=pointer.pointee
  func point(_ i:Int)->String {"\(number(item.points[i].x)) \(number(item.points[i].y))"}
  switch item.type {
  case .moveToPoint:d += "M"+point(0)
  case .addLineToPoint:d += "L"+point(0)
  case .addQuadCurveToPoint:d += "Q"+point(0)+" "+point(1)
  case .addCurveToPoint:d += "C"+point(0)+" "+point(1)+" "+point(2)
  case .closeSubpath:d += "Z"
  @unknown default:fatalError("Unknown path element")
  }
 }
 let svg="<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"\(number(bounds.width+pad*2))\" height=\"\(number(bounds.height+pad*2))\" viewBox=\"\(viewBox)\"><title>\(xml(input.name)) — Tipografia</title><desc>Parola composta con il font autentico \(xml(input.postscriptName)), corpo nominale \(input.body) px. Contorni e posizionamento CoreText; nessun software del font incorporato.</desc><path fill=\"#30323a\" transform=\"scale(1 -1)\" d=\"\(d)\"/></svg>\n"
 try svg.write(toFile:CommandLine.arguments[2]+"/"+input.slug+".svg",atomically:true,encoding:.utf8)
 var effectiveVariations:[String:Double]=[:]
 if let variations=CTFontCopyVariation(font) as? [NSNumber:NSNumber] {
  for (key,value) in variations {
   let tag=key.uint32Value
   let characters=[UInt8((tag >> 24) & 255),UInt8((tag >> 16) & 255),UInt8((tag >> 8) & 255),UInt8(tag & 255)]
   effectiveVariations[String(bytes:characters,encoding:.ascii) ?? key.stringValue]=value.doubleValue
  }
 }
 reports.append(["effectiveVariations":effectiveVariations,"slug":input.slug,"postscriptName":actual,"glyphCount":glyphCount,"shaping":"Apple CoreText CTLine / CTRun, default kerning and OpenType shaping; exact-face fallback guard","bodyPx":input.body,"sample":"Tipografia","inkBounds":[bounds.minX,bounds.minY,bounds.width,bounds.height],"viewBox":viewBox])
}
let report=try JSONSerialization.data(withJSONObject:reports,options:[.prettyPrinted,.sortedKeys])
FileHandle.standardOutput.write(report)
