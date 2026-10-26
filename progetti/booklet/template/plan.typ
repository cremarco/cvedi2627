// Resolve editorial metadata and source files from the book plan.
// Optional bibliography groups are configured by source path instead of chapter number.

#let plan-data = json(path("/progetti/booklet/piano.json"))
#let plan = plan-data.capitoli
#let opening-base = "/" + plan-data.aperture
#let artworks = json(path(opening-base + "/manifest.json")).capitoli
#let opening-compositions = json(path(opening-base + "/composizioni.json"))
#import "palette.typ": chapter-accent
#let source-path(source-item) = if type(source-item) == str {
  path(if source-item.starts-with("/") { source-item } else { "/progetti/booklet/" + source-item })
} else { source-item }

// Look up a chapter without relying on filenames or a fixed chapter count.
#let resolve-chapter(number) = {
  let entry = plan.find(c => c.numero == number)
  assert(entry != none, message: "Chapter " + str(number) + " is missing from the plan.")
  entry
}

// Adapt source metadata to the public chapter API.
#let chapter-options(entry, sources: none) = {
  let artwork = artworks.find(g => g.numero == entry.numero)
  assert(artwork != none,
    message: "Artwork for chapter " + entry.codice + " is missing from the manifest.")
  let composition = opening-compositions.capitoli.find(c => c.numero == entry.numero)
  assert(composition != none,
    message: "The composition for chapter " + entry.codice + " is missing from the data.")
  composition.insert("tela", opening-compositions.tela)
  let sources = if sources == none { entry.fonti } else { sources }
  let paths = if sources == none { none }
    else if type(sources) == array { sources.map(source-path) }
    else { source-path(sources) }
  let accent = chapter-accent(entry.numero)
  ("number": entry.numero, "title": entry.titolo, "composition": composition,
    "accent": accent, "visual": path(opening-base + "/" + artwork.disegno), "sources": paths,
    "source-groups": if "bibliography_groups" in entry {
      import source-path(entry.bibliography_groups) as groups
      groups.source-groups
    } else { none })
}

#let chapter-parameters(number, sources: none) = chapter-options(
  resolve-chapter(number), sources: sources)

#let volume-status() = {
  let complete = plan.filter(c => c.stato == "completo")
  let excerpts = plan.filter(c => c.stato == "estratto")
  let revision = plan.filter(c => c.stato == "in-revisione")
  let preparation = plan.filter(c => c.file == none)
  if complete.len() == plan.len() { return [Edizione completa.] }
  let entries = ()
  if complete.len() > 0 {
    let consecutive = complete.last().numero - complete.first().numero + 1 == complete.len()
    let codes = if complete.len() > 1 and consecutive {
      complete.first().codice + "–" + complete.last().codice
    } else { complete.map(c => c.codice).join(", ") }
    entries.push([capitoli #codes completi])
  }
  for entry in excerpts { entries.push([un estratto di #entry.titolo]) }
  for entry in revision { entries.push([#entry.titolo in revisione]) }
  for entry in preparation { entries.push([#entry.titolo in preparazione]) }
}

#let import-notice() = {
  let incomplete = plan.filter(c => c.stato in ("estratto", "in-preparazione"))
  let notices = ()
  if incomplete.len() > 0 {
    let titles = incomplete.map(c => c.titolo).join(", ", last: " e ")
    notices.push([L’importazione completa di #titles è in preparazione.])
  }
  notices.join([ ])
}
