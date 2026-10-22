// Congiunzioni legate alla parola seguente evitano una «e» isolata fra righe.
// Si applica soltanto alla presentazione del titolo: il heading nativo
// mantiene la stringa continua del piano per indice e segnalibri.
#let testo-titolo(corpo) = {
  show regex(" [eE] "): it => it.text.slice(0, 2) + "\u{00a0}"
  corpo
}
