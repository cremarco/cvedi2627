// Native graphic source. Figure placement and editorial metadata belong to the chapter.

#import "/progetti/booklet/template/geometry.typ": grid-width, ink
#import "/progetti/booklet/template/palette.typ": chapter-accent
#let catalog = json(path("/progetti/booklet/assets/schemi-accessibilita-vettoriali/contenuti.json"))

#let target-sizes(width: grid-width) = {
  let k = width / 363pt
  let guideline = rgb("973C00")
  let error-color = rgb("C10007")
  let casi = catalog.bersagli.casi
  block(width: width, height: 88pt * k, above: 0pt, below: 0pt)[
    #set text(font: "DM Sans 9pt", fill: ink, hyphenate: false,
      top-edge: 0.8em, bottom-edge: -0.2em, variations: (opsz: 9))
    #set par(justify: false, leading: 2pt * k, spacing: 0pt)
    #metadata((casi: casi, "diametro": 24, vettoriale: true)) <booklet-schema-bersagli>
    #for (i, c) in casi.enumerate() {
      let x = i * 125
      place(top + left, dx: x * k * 1pt, dy: 2pt * k,
        box(width: 113pt * k, align(center, text(size: 10pt * k, weight: 700, c.titolo))))
      let side = c.lato * k * 1pt
      let passo = (c.lato + c.spazio) * k * 1pt
      let coppia = (2 * c.lato + c.spazio) * k * 1pt
      let sx = x * k * 1pt + (113pt * k - coppia) / 2
      let y = (40 - c.lato / 2) * k * 1pt
      for n in range(2) {
        place(top + left, dx: sx + passo * n, dy: y,
          rect(width: side, height: side, fill: white, stroke: 0.8pt * k + ink))
        if c.lato < 24 {
          place(top + left, dx: sx + passo * n + side / 2 - 12pt * k, dy: 28pt * k,
            circle(radius: 12pt * k, stroke: ("paint": if c.sufficiente { guideline } else { error-color },
              thickness: 0.9pt * k, dash: (2pt * k, 2pt * k))))
        }
      }
      place(top + left, dx: x * k * 1pt, dy: 61pt * k,
        box(width: 113pt * k, align(center,
          text(size: 10pt * k, fill: if c.sufficiente { ink } else { error-color })[
            #c.esito.at(0)#linebreak()#c.esito.at(1)
          ])))
    }
  ]
}

#let interface-barrier(name, variant, width: 180pt) = {
  assert(variant in ("barriera", "scelte"), message: "Variante di schema non riconosciuta.")
  let data = catalog.confronti.find(c => c.nome == name)
  assert(data != none, message: "Schema di accessibilità non riconosciuto: " + name)
  let t = data.testi
  let accessible = variant == "scelte"
  let k = width / 180pt
  let ink = ink
  let accent = chapter-accent(3)
  let error-color = rgb("C10007")
  let gray = rgb("626872")
  let border = rgb("A0A6AF")
  let light = rgb("F3F4F6")
  let faint = rgb("D5D8DD")
  let px(n) = n * k * 1pt
  let r(x, y, w, h, fill: white, stroke: none, radius: 0) = place(top + left,
    dx: px(x), dy: px(y), rect(width: px(w), height: px(h), radius: px(radius),
      fill: fill, stroke: stroke, inset: 0pt))
  let c(x, y, d, fill: none, stroke: none) = place(top + left,
    dx: px(x), dy: px(y), circle(radius: px(d) / 2, fill: fill, stroke: stroke))
  let l(x, y, dx, dy, paint: ink, thickness: 0.8, dash: "solid") = place(top + left,
    dx: px(x), dy: px(y), line(end: (px(dx), px(dy)),
      stroke: ("paint": paint, thickness: px(thickness), dash: dash)))
  let p(points, paint: ink, thickness: 1.4, close: false, fill: none) = place(top + left,
    curve(curve.move((px(points.first().at(0)), px(points.first().at(1)))),
      ..points.slice(1).map(v => curve.line((px(v.at(0)), px(v.at(1))))),
      ..if close { (curve.close(),) } else { () },
      stroke: ("paint": paint, thickness: px(thickness), cap: "round", join: "round"), fill: fill))
  let txt(x, y, s, size: 10, weight: 400, fill: ink, width: 164, alignment: left) = place(top + left,
    dx: px(x), dy: px(y), box(width: px(width))[
      #set text(size: px(size), weight: weight, fill: fill)
      #set par(leading: px(2), spacing: 0pt, justify: false)
      #align(alignment)[#for (i, ligne) in s.split("\n").enumerate() {
        if i > 0 { linebreak() }
        text(ligne)
      }]
    ])
  let input(x, y, w, h, value: "", stroke: border, size: 11) = {
    r(x, y, w, h, stroke: px(0.7) + stroke, radius: 2)
    if value != "" { txt(x + 5, y + 6, value, size: size, width: w - 10) }
  }
  let button(x, y, w, h, label, primary: true, size: 10) = {
    r(x, y, w, h, fill: if primary { accent } else { white },
      stroke: if primary { none } else { px(0.7) + border }, radius: 2)
    txt(x, y + (h - size) / 2, label, size: size, weight: 600, width: w, alignment: center)
  }
  let check(x, y, paint: ink) = p(((x, y + 3), (x + 3, y + 6), (x + 9, y)), paint: paint)
  let warn(x, y) = {
    c(x, y, 11, fill: error-color)
    txt(x, y + 1.3, "!", size: 8.5, weight: 700, fill: white, width: 11, alignment: center)
  }
  let document(x, y, w: 12, paint: gray) = {
    p(((x, y), (x + w - 4, y), (x + w, y + 4), (x + w, y + 16), (x, y + 16)),
      paint: paint, thickness: 1, close: true)
    l(x + 3, y + 7, w - 6, 0, paint: paint)
    l(x + 3, y + 10, w - 6, 0, paint: paint)
  }
  let status(x, y, announced: true) = {
    if announced {
      r(x, y, 13, 10, stroke: px(1) + ink, radius: 2)
      p(((x + 4, y + 10), (x + 4, y + 13), (x + 8, y + 10)), thickness: 1)
    } else {
      l(x, y, 11, 9, paint: gray)
      p(((x + 1, y + 4), (x + 5, y + 4), (x + 9, y + 1), (x + 9, y + 11), (x + 5, y + 8), (x + 1, y + 8)),
        paint: gray, thickness: 0.7)
    }
  }
  let handle(x, y) = for i in range(3) {
    for j in range(2) { c(x + j * 4, y + i * 4, 1.6, fill: gray) }
  }

  block(width: width, height: px(data.altezza), above: 0pt, below: 0pt)[
    #set text(font: "DM Sans 9pt", size: px(10), fill: ink, lang: "it",
      hyphenate: false, top-edge: 0.8em, bottom-edge: -0.2em, variations: (opsz: 9))
    #set par(leading: px(2), spacing: 0pt, justify: false)
    #if name == "contrasto-testo" {
      let color = if accessible { ink } else { rgb("C8CBD0") }
      txt(8, 24, t.titolo, size: 12, weight: 600, fill: color)
      r(8, 47, 164, 31, stroke: px(0.7) + faint, radius: 2)
      r(8, 84, 164, 31, stroke: px(0.8) + error-color, radius: 2)
      txt(15, 57, t.data, size: 11, fill: color)
      txt(15, 94, t.ora, size: 11, fill: color)
      if accessible { txt(8, 124, t.errore, size: 9.5, fill: error-color) }
    } else if name == "contrasto-controlli" {
      r(8, 62, 16, 16, stroke: px(if accessible { 1 } else { 0.5 }) + if accessible { ink } else { rgb("E3E5E9") },
        fill: if accessible { accent } else { white }, radius: 1)
      if accessible { check(11, 66) }
      txt(31, 64, t.etichetta, size: 10, width: 143)
      if accessible { txt(31, 85, t.stato, size: 9, fill: gray) }
    } else if name == "adattamento" {
      r(7, 22, 166, 117, stroke: px(0.8) + border, radius: 3)
      if accessible {
        txt(16, 36, t.titolo, weight: 700)
        txt(16, 58, t.data)
        txt(16, 78, t.ora)
        button(16, 103, 147, 26, t.conferma)
      } else {
        place(top + left, dx: px(8), dy: px(23), block(width: px(164), height: px(115), clip: true)[
          #txt(8, 16, t.riga, size: 12.3, width: 255)
          #button(110, 56, 98, 27, t.conferma)
        ])
      }
    } else if name == "tastiera" {
      let x = if accessible { 29 } else { 8 }
      let w = 172 - x
      txt(x, 13, t.email, weight: 700)
      input(x, 29, w, 22)
      txt(x, 62, t.corso, weight: 700)
      input(x, 78, w, 24, value: t.design, stroke: if accessible { ink } else { border }, size: 9)
      p(((159, 88), (162, 91), (165, 88)), thickness: 1)
      button(x, 129, w, 23, t.invia)
      if accessible {
        r(x, 102, w, 23, stroke: px(0.7) + ink)
        txt(x + 5, 109, t.comunicazione, size: 8.7, width: w - 8)
        r(x, 78, w, 24, fill: none, stroke: px(1.5) + accent, radius: 2)
        for (i, y) in (19, 70, 130).enumerate() {
          c(6, y - 5, 13, fill: accent)
          txt(6, y - 3, str(i + 1), size: 8.5, weight: 700, width: 13, alignment: center)
          if i < 2 {
            r(4, y + 12, 19, 12, stroke: px(0.6) + border, radius: 1)
            txt(4, y + 14, "Tab", size: 6.7, width: 19, alignment: center)
            l(13, y + 27, 0, 10, paint: gray)
            p(((10, y + 34), (13, y + 37), (16, y + 34)), paint: gray, thickness: 0.8)
          }
        }
      } else {
        r(157, 59, 10, 15, stroke: px(0.8) + ink, radius: 4)
        l(162, 59, 0, 6)
      }
    } else if name == "puntamento" {
      for (i, nome-citta) in t.citta.enumerate() {
        let y = 18 + i * 42
        r(7, y, 166, 36, fill: light, stroke: px(0.5) + faint, radius: 2)
        handle(15, y + 12)
        txt(29, y + 12, nome-citta, size: 11, weight: 600, width: 76)
        if accessible and i == 1 {
          for (j, label) in t.azioni.enumerate() {
            let x = 108 + j * 31
            r(x, y + 4, 27, 28, stroke: px(0.6) + border, radius: 2)
            let cy = y + 12
            p(if j == 0 { ((x + 8, cy + 1), (x + 13, cy - 3), (x + 18, cy + 1)) }
              else { ((x + 8, cy - 3), (x + 13, cy + 1), (x + 18, cy - 3)) }, thickness: 1)
            txt(x, y + 19, label, size: 8, width: 27, alignment: center)
          }
        }
      }
    } else if name == "immagini" {
      r(42, 20, 96, 99, fill: error-color, stroke: px(1.5) + ink, radius: 16)
      r(73, 9, 34, 17, fill: none, stroke: px(3) + ink, radius: 6)
      r(49, 70, 36, 39, fill: error-color, stroke: px(1.2) + ink, radius: 3)
      r(95, 70, 36, 39, fill: error-color, stroke: px(1.2) + ink, radius: 3)
      l(53, 78, 28, 0, thickness: 1.2)
      l(99, 78, 28, 0, thickness: 1.2)
      l(89, 29, 0, 32, thickness: 1.2)
      r(7, 126, 166, 28, fill: light, stroke: px(0.5) + faint, radius: 2)
      txt(14, 132, if accessible { t.alternativa } else { t.file }, size: 9, width: 153)
    } else if name == "media" {
      r(7, 17, 166, 114, fill: light, stroke: px(0.6) + border)
      c(30, 28, 22, fill: white, stroke: px(1.4) + ink)
      p(((29, 76), (29, 59), (35, 52), (47, 52), (55, 60), (65, 64), (82, 49), (87, 54), (65, 75), (52, 69), (52, 92), (29, 92)),
        thickness: 1.4, close: true, fill: accent)
      l(96, 53, 52, 0, thickness: 2)
      p(((140, 47), (150, 53), (140, 59)), thickness: 2)
      if accessible {
        r(12, 94, 156, 30, fill: ink)
        txt(16, 100, t.sottotitoli, size: 7, fill: white, width: 148)
      } else {
        r(101, 22, 67, 15, fill: ink, radius: 1)
        txt(104, 26, t.solo-audio, size: 7.3, fill: white, width: 61)
      }
      l(12, 139, 80, 0, paint: border, thickness: 2)
      l(12, 139, 29, 0, paint: ink, thickness: 2)
      c(36, 135, 8, fill: ink)
      p(((99, 138), (102, 138), (107, 134), (107, 145), (102, 141), (99, 141)),
        close: true, fill: ink, thickness: 0.6)
      if accessible {
        for (i, label) in ("CC", "AD").enumerate() {
          r(116 + i * 27, 133, 22, 13, fill: white, stroke: px(0.7) + ink, radius: 1)
          txt(116 + i * 27, 136, label, size: 7.5, weight: 600, width: 22, alignment: center)
        }
      }
    } else if name == "semantica" {
      if accessible {
        button(7, 24, 166, 27, t.dettagli, primary: false, size: 11)
        p(((157, 34), (161, 39), (165, 34)), thickness: 1)
        txt(7, 64, t.consegna, size: 10)
      } else {
        txt(7, 30, t.dettagli, size: 12, fill: error-color)
        l(7, 44, 107, 0, paint: error-color)
      }
      r(7, 93, 166, 53, fill: light, radius: 2)
      txt(14, 102, if accessible { t.ispezione } else { t.mancante }, size: 8.5, width: 153)
    } else if name == "feedback" {
      txt(8, 21, t.stato, size: if accessible { 9.5 } else { 7 }, fill: if accessible { ink } else { faint },
        width: 164, weight: if accessible { 600 } else { 400 })
      if accessible { status(8, 40) }
      l(8, 62, 146, 0, paint: faint, thickness: 2)
      r(8, 76, 164, 44, stroke: px(0.5) + faint, radius: 2)
      button(8, 132, 52, 22, t.salva)
      r(6, 130, 56, 26, fill: none, stroke: px(1) + ink, radius: 3)
      if not accessible {
        status(82, 138, announced: false)
        txt(98, 139, t.nessun-annuncio, size: 7, fill: gray, width: 78)
      }
    } else if name == "cognitiva" {
      if accessible {
        txt(8, 38, t.data, size: 11)
        txt(8, 64, t.ora, size: 11)
        button(8, 105, 73, 28, t.modifica, primary: false)
        button(90, 105, 82, 28, t.conferma)
      } else {
        txt(8, 40, t.domanda, size: 18, weight: 600, width: 164, alignment: center)
        button(8, 100, 164, 29, t.conferma, size: 12)
      }
    } else if name == "movimento" {
      if accessible {
        button(7, 10, 111, 24, t.pausa, size: 8)
        button(123, 10, 50, 24, t.riprendi, primary: false, size: 8)
      } else {
        txt(7, 16, t.automatico, size: 9.5, weight: 600, width: 142)
        for x in (151, 161) { p(((x, 14), (x + 4, 18), (x, 22)), paint: error-color, thickness: 1) }
      }
      for (i, title) in t.articoli.enumerate() {
        let y = 44 + i * 35
        r(7, y, 166, 29, fill: light, radius: 2)
        r(12, y + 5, 22, 19, fill: faint, radius: 1)
        txt(41, y + 5, title, size: 9, weight: 600, width: 127)
        l(41, y + 21, 95, 0, paint: faint, thickness: 2)
      }
    } else if name == "moduli" {
      txt(8, 27, if accessible { t.etichetta } else { t.breve }, size: 11, weight: 600)
      input(8, 51, 164, 31, value: t.valore, stroke: error-color, size: 13)
      warn(8, 94)
      txt(24, 95, if accessible { t.riparazione } else { t.errore }, size: 9.4, fill: error-color, width: 150)
      if accessible { txt(24, 128, t.formato, size: 8.5, fill: gray) }
    } else if name == "autenticazione" {
      r(9, 17, 65, 25, fill: light, stroke: px(0.6) + border, radius: 3)
      txt(9, 24, t.incolla, size: 10, fill: if accessible { ink } else { border }, width: 65, alignment: center)
      p(((33, 42), (38, 48), (43, 42)), paint: border, thickness: 0.6)
      txt(8, 62, t.etichetta, size: 11, weight: 600)
      input(8, 84, 164, 30)
      for i in range(8) { c(16 + i * 12, 97, 4, fill: ink) }
      if accessible {
        c(145, 92, 8, stroke: px(1.6) + ink)
        l(152, 99, 10, 8, thickness: 2)
        l(159, 105, 3, -3, thickness: 1.6)
      }
      txt(8, 129, if accessible { t.consentito } else { t.disabilitato },
        size: 9.8, fill: if accessible { ink } else { error-color }, weight: 600)
    } else if name == "personalizzazione" {
      r(7, 9, 166, 137, stroke: px(0.5) + faint)
      r(7, 9, 166, if accessible { 39 } else { 22 }, fill: light)
      if accessible {
        txt(12, 15, t.testo, size: 8, width: 30)
        button(43, 12, 50, 17, t.comandi, primary: false, size: 8.5)
        txt(110, 17, t.ripristina, size: 7.5, width: 58)
        r(14, 34, 8, 8, stroke: px(0.6) + border)
        txt(28, 34, t.movimento, size: 8, width: 139)
      }
      document(14, if accessible { 58 } else { 39 }, paint: ink)
      txt(14, if accessible { 85 } else { 68 }, t.titolo, size: if accessible { 12 } else { 9 }, weight: 700, width: 152)
      txt(14, if accessible { 106 } else { 85 }, t.orario, size: if accessible { 10 } else { 8 }, width: 152)
      for i in range(2) { l(14, 129 + i * 7, 143 - i * 25, 0, paint: faint, thickness: 2) }
    } else if name == "lingua" {
      txt(8, 26, if accessible { t.completo } else { t.cognome }, size: 11, weight: 600)
      input(8, 50, 164, 31, value: if accessible { t.nome } else { t.valore }, stroke: if accessible { ink } else { error-color },
        size: if accessible { 11 } else { 13 })
      if accessible {
        input(8, 100, 97, 27, value: t.lingua, size: 10)
        p(((88, 111), (92, 115), (96, 111)), thickness: 1)
      } else {
        warn(8, 98)
        txt(24, 99, t.errore, size: 10, fill: error-color)
      }
    } else if name == "verifica-wcag" {
      for (i, title) in t.passi.enumerate() {
        let y = 5 + i * 51
        r(33, y, 113, 42, stroke: px(0.7) + border, radius: 2)
        r(33, y, 113, 7, fill: light)
        document(40, y + 15, w: 10)
        txt(59, y + 14, title, size: 9, weight: 600, width: 67)
        if accessible or i == 0 { check(128, y + 16) }
        else { txt(126, y + 13, "?", size: 12, weight: 600, fill: error-color, width: 15) }
        l(60, y + 32, 45, 0, paint: faint, thickness: 1.5)
        if i < 2 {
          l(89, y + 42, 0, 9, paint: ink, thickness: 0.7, dash: if accessible { "solid" } else { "dotted" })
        }
      }
    } else if name == "valutazione" {
      r(7, 15, 166, 27, fill: light)
      document(15, 20, paint: ink)
      if accessible {
        for (i, row) in t.righe.enumerate() {
          let y = 48 + i * 25
          if i > 0 { l(8, y - 4, 164, 0, paint: faint, thickness: 0.6) }
          txt(13, y, row, size: 9.5, width: 152)
        }
      } else {
        txt(13, 59, t.vago, size: 16, weight: 700, width: 150)
      }
    }
  ]
}
