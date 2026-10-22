<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'
import type { AccessibilityDemoId } from '../data/accessibility-demos'
import { serviceImages } from '../data/accessibility-services'
import { publicAsset } from '../utils/public-asset'
import AccessibilityServiceMedia from './AccessibilityServiceMedia.vue'
import AccessibilityLabControls from './AccessibilityLabControls.vue'
import HeroIcon from './HeroIcon.vue'

const props = defineProps<{ exampleId: AccessibilityDemoId; good: boolean; active: boolean; motionAllowed: boolean; reducedMotion: boolean }>()
const emit = defineEmits<{ insight: [text: string]; play: [] }>()
const uid = useId()
const id = (name: string) => `a11y-process-${uid}-${name}`

const reminder = ref('Consegna elaborato · venerdì alle 18:00')
const saveResult = ref('')
function saveReminder() {
  saveResult.value = props.good ? `Promemoria salvato: ${reminder.value}.` : 'Fatto.'
  emit('insight', props.good
    ? 'Il messaggio di stato descrive ciò che hai salvato e non sposta il focus da Salva promemoria.'
    : 'Compare soltanto «Fatto», lontano dal comando e senza ruolo di stato: l’esito può passare inosservato.')
}

const mediaPlaying = ref(false), mediaPaused = ref(false), mediaStarted = ref(false), mediaCue = ref(0)
const audio = ref(true), captions = ref(true), description = ref(true), chosenExit = ref('')
const speechAvailable = typeof window !== 'undefined' && 'speechSynthesis' in window
let mediaTimer: ReturnType<typeof setTimeout> | undefined, remaining = 3000, startedAt = 0
let cueElapsed = false, speechPending = false
let utterance: SpeechSynthesisUtterance | undefined
let sound: AudioContext | undefined
const spokenCue = computed(() => mediaCue.value === 0 ? 'Scegli l’uscita B.' : 'Destinazione selezionata.')
function cancelSpeech() {
  const current = utterance
  utterance = undefined; speechPending = false
  if (current && speechAvailable) window.speechSynthesis.cancel()
}
function speak() {
  if (!audio.value) return
  if (speechAvailable) {
    const current = new SpeechSynthesisUtterance(spokenCue.value + (props.good && description.value && mediaCue.value === 0 ? ' Il docente indica il corridoio a destra.' : ''))
    utterance = current; speechPending = true
    current.lang = 'it-IT'
    const complete = () => {
      if (utterance !== current) return
      utterance = undefined; speechPending = false
      advanceMedia()
    }
    current.onend = complete; current.onerror = complete
    try { window.speechSynthesis.speak(current) } catch { complete() }
  }
  if (mediaCue.value === 1 && typeof window !== 'undefined' && window.AudioContext) {
    sound = new AudioContext()
    const oscillator = sound.createOscillator(), gain = sound.createGain()
    oscillator.connect(gain); gain.connect(sound.destination); oscillator.frequency.value = 660
    gain.gain.setValueAtTime(.04, sound.currentTime); gain.gain.exponentialRampToValueAtTime(.001, sound.currentTime + .15)
    oscillator.start(); oscillator.stop(sound.currentTime + .15)
  }
}
function stopMedia() {
  if (mediaTimer) clearTimeout(mediaTimer); mediaTimer = undefined
  cancelSpeech(); void sound?.close().catch(() => {}); sound = undefined
  mediaPlaying.value = false; mediaPaused.value = false; mediaStarted.value = false; mediaCue.value = 0; chosenExit.value = ''; remaining = 3000; cueElapsed = false
}
function advanceMedia() {
  if (!mediaPlaying.value || !cueElapsed || speechPending) return
  if (mediaCue.value === 0) {
    mediaCue.value = 1; remaining = 3000; cueElapsed = false
    speak(); scheduleMedia()
  } else {
    mediaPlaying.value = false; remaining = 3000; cueElapsed = false
    void sound?.close().catch(() => {}); sound = undefined
  }
}
function scheduleMedia() {
  startedAt = Date.now()
  mediaTimer = setTimeout(() => {
    mediaTimer = undefined; remaining = 0; cueElapsed = true
    advanceMedia()
  }, remaining)
}
function playMedia() {
  if (mediaPlaying.value) {
    if (mediaTimer) { remaining = Math.max(0, remaining - (Date.now() - startedAt)); clearTimeout(mediaTimer) }
    mediaTimer = undefined
    mediaPlaying.value = false; mediaPaused.value = true
    cancelSpeech()
    return
  }
  if (!props.active) return
  emit('play')
  if (!mediaPaused.value) { mediaCue.value = 0; remaining = 3000; cueElapsed = false; chosenExit.value = '' }
  mediaStarted.value = true; mediaPlaying.value = true; mediaPaused.value = false
  speak()
  if (cueElapsed) advanceMedia()
  else if (mediaPlaying.value && !mediaTimer) scheduleMedia()
  emit('insight', !audio.value
    ? props.good && captions.value ? 'Con l’audio spento il parlato resta leggibile nei sottotitoli.' : props.good ? 'Audio e Sottotitoli sono spenti: attiva un’alternativa per conoscere le parole del docente.' : 'Con l’audio spento non sai quale uscita nomina il docente: manca l’alternativa al parlato.'
    : props.good ? 'Puoi usare sottotitoli per il parlato e descrizione per la direzione mostrata.' : 'Il parlato si ascolta soltanto nella voce; la direzione visiva non è descritta.')
}
function chooseExit(value: string) {
  if (!mediaStarted.value) return
  chosenExit.value = value
  if (value === 'B') {
    emit('insight', props.good && !audio.value && captions.value
      ? 'Hai riconosciuto B anche senza audio; il sottotitolo conserva le parole necessarie alla scelta.'
      : props.good && !audio.value
        ? 'B è corretta, ma Audio e Sottotitoli sono spenti: attiva un’alternativa per verificare la scelta.'
        : props.good
          ? 'B è corretta: è l’uscita nominata dal docente. Spegni Audio per confrontare le alternative al parlato.'
          : 'B è corretta. Se spegni l’audio, il video non offre una trascrizione per ritrovare questa informazione.')
    return
  }
  emit('insight', props.good && captions.value
    ? 'La clip nomina B: puoi rileggere il sottotitolo per correggere la scelta.'
    : audio.value
      ? 'A non è l’uscita nominata. Riascolta la clip per controllare le parole del docente.'
      : props.good
        ? 'A non è l’uscita nominata. Attiva Audio o Sottotitoli per poter controllare la scelta.'
        : 'A non è l’uscita nominata. Senza audio non trovi parole che permettano di correggere la scelta.')
}
watch(audio, enabled => {
  cancelSpeech()
  if (enabled && mediaPlaying.value) speak()
  else advanceMedia()
})
watch(description, () => {
  if (!props.good || !audio.value || !mediaPlaying.value || mediaCue.value !== 0) return
  cancelSpeech(); speak()
})

const notices = [{ text: 'Laboratorio di design', code: 'A12' }, { text: 'Laboratorio di prototipi', code: 'B24' }, { text: 'Laboratorio di ricerca', code: 'C18' }]
const noticeIndex = ref(0), updates = ref(0), running = ref(false), paused = ref(false), manualNews = ref(false), roomAnswer = ref(''), roomResult = ref('')
const newsStarted = ref(false)
let newsTimer: ReturnType<typeof setInterval> | undefined, newsDeadline: ReturnType<typeof setTimeout> | undefined
function stopNews() {
  if (newsTimer) clearInterval(newsTimer); if (newsDeadline) clearTimeout(newsDeadline)
  newsTimer = undefined; newsDeadline = undefined; running.value = false; manualNews.value = false
}
function advanceNotice() {
  if (paused.value) return
  noticeIndex.value = (noticeIndex.value + 1) % notices.length; updates.value++; roomResult.value = ''
}
function startNews() {
  if (!props.active) return
  stopNews(); newsStarted.value = true; running.value = true; paused.value = false; roomResult.value = ''
  if (!props.motionAllowed) {
    manualNews.value = true
    emit('insight', props.good ? 'Prova manuale: metti in pausa, poi verifica che Simula aggiornamento non cambi il codice.' : 'Prova manuale: Simula aggiornamento cambia il codice e qui non trovi una pausa del servizio.')
    return
  }
  newsTimer = setInterval(advanceNotice, 1600)
  newsDeadline = setTimeout(() => { stopNews(); emit('insight', 'La dimostrazione di 12 secondi è terminata. L’ultimo avviso resta leggibile.') }, 12000)
  emit('insight', props.good ? 'Leggi il codice; Pausa avvisi ti permette di tenerlo fermo mentre lo trascrivi.' : 'Il codice cambia durante la lettura e manca un comando per fermare gli avvisi.')
}
function pauseNews() {
  paused.value = !paused.value
  emit('insight', paused.value ? `L’avviso è fermo sul codice ${notices[noticeIndex.value].code}: puoi trascriverlo con il tuo tempo.` : 'Gli avvisi riprendono dal punto in cui li avevi fermati.')
}
function checkRoom() {
  if (!newsStarted.value) {
    roomResult.value = 'Gli avvisi non sono ancora disponibili.'
    emit('insight', 'Avvia gli avvisi per provare la trascrizione mentre il riferimento cambia.')
    return
  }
  const correct = roomAnswer.value.trim().toUpperCase() === notices[noticeIndex.value].code
  roomResult.value = correct ? `Aula ${roomAnswer.value.trim().toUpperCase()} confermata.` : 'Il codice aula non corrisponde all’avviso attuale.'
  if (!running.value) {
    emit('insight', 'Gli aggiornamenti sono terminati e l’ultimo codice è fermo. Riavvia gli avvisi per provare la trascrizione durante gli aggiornamenti.')
    return
  }
  emit('insight', props.good
    ? paused.value ? correct ? 'La pausa conserva il riferimento mentre completi il compito.' : 'L’avviso è fermo, ma il codice trascritto non corrisponde: controlla le lettere e le cifre.' : 'Puoi mettere in pausa l’avviso per controllare il codice prima di inviarlo.'
    : 'Il riferimento può cambiare mentre scrivi: anche un codice appena letto può non corrispondere più all’avviso.')
}

const auditStage = ref(0), auditCovered = ref([false, false, false]), auditClosed = ref(false), auditDate = ref('14/10/26'), auditError = ref('')
const auditField = ref<HTMLInputElement>(), auditHeading = ref<HTMLElement>(), auditResult = ref('')
const auditSawError = ref(false)
const auditSummary = computed(() => {
  const parts = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(auditDate.value.trim())
  if (!parts) return auditDate.value
  const date = new Date(0); date.setUTCFullYear(+parts[3], +parts[2] - 1, +parts[1])
  return new Intl.DateTimeFormat('it-IT', { dateStyle: 'long', timeZone: 'UTC' }).format(date)
})
function auditStart() {
  auditCovered.value[0] = true
  if (!props.good) {
    auditClosed.value = true; auditResult.value = 'Verifica dell’accesso salvata: nessun errore rilevato.'
    emit('insight', 'La sola schermata di accesso è stata controllata. Il formato della data nel modulo non è stato ancora provato.')
  } else {
    auditStage.value = 1
    emit('insight', 'Il percorso continua nel modulo: il controllo iniziale non chiude la verifica.')
    nextTick(() => auditField.value?.focus())
  }
}
function revealExcluded() { auditClosed.value = false; auditStage.value = 1; emit('insight', 'Ora provi il modulo che il controllo iniziale aveva escluso: invia la data proposta.') }
function auditSubmit() {
  const parts = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(auditDate.value.trim())
  const date = new Date(0)
  if (parts) date.setUTCFullYear(+parts[3], +parts[2] - 1, +parts[1])
  if (!parts || +parts[3] === 0 || date.getUTCFullYear() !== +parts[3] || date.getUTCMonth() !== +parts[2] - 1 || date.getUTCDate() !== +parts[1]) {
    auditSawError.value = true
    auditError.value = !parts
      ? 'La data richiede il formato GG/MM/AAAA, con l’anno a quattro cifre: scrivi 14/10/2026.'
      : 'Questa data non esiste. Controlla giorno, mese e anno.'
    emit('insight', props.good ? 'La prova del secondo passaggio include lo stato di errore, che il solo accesso non poteva mostrare.' : 'L’errore emerge in un passaggio escluso: «nessun errore rilevato» non copriva il percorso completo.')
    nextTick(() => auditField.value?.focus()); return
  }
  auditError.value = ''; auditStage.value = 2; if (props.good) auditCovered.value[1] = true
  emit('insight', props.good
    ? auditSawError.value ? 'La data corretta è stata accettata dopo l’errore. Ora controlla la conferma.' : 'L’invio valido è passato, ma il recupero da un errore non è stato ancora provato. Ora controlla la conferma.'
    : 'Il modulo è stato completato, ma il controllo registrato copre ancora solo l’accesso.')
  nextTick(() => auditHeading.value?.focus())
}
function auditFinish() {
  auditClosed.value = true
  if (props.good) {
    auditCovered.value[2] = true
    auditResult.value = auditSawError.value
      ? 'Verifica salvata: accesso, gestione dell’errore nel modulo e conferma.'
      : 'Verifica salvata: accesso, invio valido del modulo e conferma. La gestione degli errori non è stata verificata.'
  }
  else auditResult.value = 'Prenotazione completata. La verifica salvata include solo l’accesso.'
  emit('insight', props.good
    ? auditSawError.value ? 'La registrazione comprende i passaggi e l’errore incontrato. Questa dimostrazione non attesta una conformità WCAG.' : 'Hai provato l’invio valido. Reimposta gli scenari per provare anche il valore iniziale errato; questa dimostrazione non attesta una conformità WCAG.'
    : 'Completare personalmente il percorso non aggiorna da solo il perimetro del controllo precedente.')
}

const evaluationStage = ref(0), evalCourse = ref(''), evalMenuOpen = ref(false), observation = ref('Con Tab il menu Corso viene saltato.'), evalMessage = ref('')
const genericObservation = ref('Il sito non funziona.'), recordedObservation = ref('')
const registeredCourse = ref(''), registrationError = ref('')
const registrationResult = computed(() => registeredCourse.value ? `Iscrizione completata al corso ${registeredCourse.value}.` : '')
const evaluationField = ref<HTMLInputElement>(), evaluationReview = ref<HTMLElement>(), retestMenu = ref<HTMLSelectElement>()
function recordObservation() {
  evaluationStage.value = 1
  if (!props.good) recordedObservation.value = genericObservation.value.trim()
  emit('insight', props.good ? 'Questa scheda riguarda il menu Corso: conseguenza e modifica si riferiscono alla scelta da tastiera, non ad altri ostacoli eventualmente annotati.' : `La segnalazione sul menu Corso «${recordedObservation.value || 'nessun testo'}» viene archiviata senza una modifica e senza una nuova prova del compito.`)
  if (props.good) nextTick(() => evaluationReview.value?.focus())
}
function applyCorrection() {
  evaluationStage.value = 2; evalCourse.value = ''; registeredCourse.value = ''; registrationError.value = ''; evalMessage.value = ''
  emit('insight', 'Qui puoi usare il menu corretto, una selezione nativa. Scegli Design e completa l’iscrizione da tastiera; poi registra la nuova prova qui sotto.')
  nextTick(() => retestMenu.value?.focus())
}
function registerCourse() {
  if (!evalCourse.value) {
    registrationError.value = 'Scegli un corso per completare l’iscrizione.'
    nextTick(() => retestMenu.value?.focus())
    return
  }
  registrationError.value = ''; registeredCourse.value = evalCourse.value; evalMessage.value = ''
  emit('insight', `L’iscrizione al corso ${registeredCourse.value} è stata completata nel sito. Ora registra la nuova prova per confrontarla con il compito richiesto.`)
}
function retest() {
  if (!registeredCourse.value) {
    evalMessage.value = 'La nuova prova non è completa: prima completa l’iscrizione nel sito.'
    emit('insight', 'Scegliere un valore nel menu non completa il compito: serve anche inviare l’iscrizione.')
    return
  }
  if (registeredCourse.value !== 'Design') {
    evalMessage.value = `Hai completato l’iscrizione a ${registeredCourse.value}. Il compito richiede Design: completa quella iscrizione e registra la nuova prova.`
    emit('insight', 'Il compito iniziale richiede Design: registrare una scelta diversa non verifica lo stesso esito.')
    return
  }
  evalMessage.value = 'Nuova prova completata: iscrizione al corso Design registrata.'
  emit('insight', 'La nuova prova controlla lo stesso compito che si era interrotto, con il menu corretto.')
}

watch(() => props.active, active => { if (!active) { stopNews(); stopMedia() } })
watch(() => props.motionAllowed, allowed => { if (!allowed) stopNews() })
onBeforeUnmount(() => { stopNews(); stopMedia() })
defineExpose({ stopMedia })
</script>

<template>
  <form v-if="exampleId === 'feedback'" class="a11y-form process-feedback" :class="{ 'has-distant-result': !good }" @submit.prevent="saveReminder">
    <div class="process-course-context"><AccessibilityServiceMedia kind="course" /><div><h3>Consegna del laboratorio</h3><p class="a11y-small">I tuoi promemoria</p></div></div>
    <div class="process-field"><label :for="id('reminder')">Promemoria della consegna</label><input :id="id('reminder')" v-model="reminder" class="input" /></div>
    <div class="process-form-action"><button type="submit" class="btn">Salva promemoria</button></div>
    <p class="process-save-result" :class="{ 'process-distant-result': !good }" :role="good ? 'status' : undefined" :aria-live="good ? 'polite' : undefined">{{ saveResult }}</p>
  </form>
  <div v-else-if="exampleId === 'media'" class="process-media">
    <div class="process-video">
      <div class="process-video-caption"><strong>Orientarsi nel campus</strong><span>Clip · 2 passaggi</span></div>
      <div class="process-video-image" :aria-label="good && description ? 'Il docente indica il corridoio a destra.' : 'Video del percorso'" role="img"><img :src="publicAsset(serviceImages.campus.src)" :width="serviceImages.campus.width" :height="serviceImages.campus.height" alt="" aria-hidden="true" /></div>
      <div class="process-video-subtitles"><p v-if="good && captions && mediaStarted" class="a11y-captions">{{ mediaCue ? 'Docente: Scegli l’uscita B. [suono di conferma] Destinazione selezionata.' : 'Docente: Scegli l’uscita B.' }}</p></div>
    </div>
    <div class="process-media-controls" role="group" aria-label="Controlli del video">
      <div class="process-player-buttons">
        <div class="tooltip tooltip-top" :data-tip="mediaPlaying ? 'Pausa' : mediaPaused ? 'Riprendi' : 'Riproduci'"><button type="button" class="btn btn-square" :aria-label="mediaPlaying ? 'Pausa' : mediaPaused ? 'Riprendi' : 'Riproduci'" @click="playMedia"><HeroIcon :name="mediaPlaying ? 'pause' : 'play'" /></button></div>
        <div class="tooltip tooltip-top" data-tip="Ricomincia"><button type="button" class="btn btn-square btn-outline" aria-label="Ricomincia" @click="stopMedia"><HeroIcon name="arrow-path" /></button></div>
      </div>
      <div class="process-media-options">
        <label class="a11y-check-row"><input v-model="audio" class="checkbox" type="checkbox" /><span>Audio</span></label>
        <template v-if="good"><label class="a11y-check-row"><input v-model="captions" class="checkbox" type="checkbox" /><span>Sottotitoli</span></label><label class="a11y-check-row"><input v-model="description" class="checkbox" type="checkbox" /><span>Descrizione visiva</span></label></template>
      </div>
    </div>
    <div class="process-media-description"><p v-if="good && description && mediaStarted" class="a11y-small process-description">Il docente indica il corridoio a destra.</p></div>
    <AccessibilityLabControls>
      <div class="a11y-actions process-exit-choice"><span>Quale uscita nomina?</span><button v-for="value in ['A','B']" :key="value" type="button" class="btn btn-outline" :disabled="!mediaStarted" :aria-pressed="chosenExit === value" @click="chooseExit(value)">{{ value }}</button></div>
    </AccessibilityLabControls>
  </div>
  <form v-else-if="exampleId === 'movimento'" class="process-news" @submit.prevent="checkRoom">
    <div class="process-news-heading"><h3>Avvisi del campus</h3></div>
    <div class="a11y-news process-notice"><AccessibilityServiceMedia kind="course" compact /><div class="process-notice-copy"><h3>{{ notices[noticeIndex].text }}</h3><p>Codice aula: <strong>{{ notices[noticeIndex].code }}</strong></p></div></div>
    <div class="process-notice-controls"><template v-if="running"><button v-if="good" type="button" class="btn" :aria-pressed="paused" @click="pauseNews">{{ paused ? 'Riprendi avvisi' : 'Pausa avvisi' }}</button><p v-else class="a11y-small">Avvisi in aggiornamento.</p></template></div>
    <div class="process-field process-room-field"><label :for="id('room')">Codice aula</label><div class="process-answer"><input :id="id('room')" v-model="roomAnswer" class="input" :disabled="!newsStarted" /><button type="submit" class="btn" :disabled="!newsStarted">Conferma aula</button></div></div><p v-show="roomResult" :role="good ? 'status' : undefined">{{ roomResult }}</p>
    <AccessibilityLabControls>
      <div class="a11y-actions process-news-lab-actions">
        <button v-if="!running" type="button" class="btn btn-outline" @click="startNews">Avvia avvisi</button>
        <button v-if="manualNews" type="button" class="btn btn-outline" :disabled="paused" @click="advanceNotice">Simula aggiornamento</button>
      </div>
      <p class="a11y-small">Aggiornamenti: {{ updates }}</p>
    </AccessibilityLabControls>
  </form>
  <div v-else-if="exampleId === 'verifica-wcag'" class="process-audit">
    <div class="process-audit-heading"><h3>Verifica della prenotazione</h3><p class="a11y-small">Prenotazione appuntamento</p></div>
    <ol class="a11y-audit-steps process-coverage"><li v-for="(label,index) in ['Accesso','Modulo','Conferma']" :key="label" :class="{ 'is-covered': auditCovered[index] }"><strong>{{ label }}</strong><span>{{ auditCovered[index] ? 'Coperto' : !good && auditCovered[0] ? 'Escluso' : 'Da verificare' }}</span></li></ol>
    <template v-if="auditClosed"><p :role="good ? 'status' : undefined">{{ auditResult }}</p><button v-if="!good && auditStage === 0" type="button" class="btn btn-outline" @click="revealExcluded">Apri modulo</button></template>
    <template v-else-if="auditStage === 0"><h3 class="process-stage-title">1 · Accesso</h3><p>Sara ha aperto la prenotazione.</p><button type="button" class="btn" @click="auditStart">Controlla l’accesso</button></template>
    <form v-else-if="auditStage === 1" class="a11y-form process-audit-form" @submit.prevent="auditSubmit"><h3 class="process-stage-title">2 · Modulo</h3><div class="process-field"><label :for="id('audit-date')">Data da prenotare</label><input :id="id('audit-date')" ref="auditField" v-model="auditDate" class="input" :aria-invalid="Boolean(auditError)" :aria-describedby="auditError ? id('audit-error') : undefined" /></div><p v-if="auditError" :id="id('audit-error')" role="alert">{{ auditError }}</p><div class="process-form-action"><button type="submit" class="btn">Conferma appuntamento</button></div></form>
    <template v-else><h3 ref="auditHeading" class="process-stage-title" tabindex="-1">3 · Conferma</h3><p>Prenotazione di Sara · {{ auditSummary }}.</p><button type="button" class="btn" @click="auditFinish">Salva verifica</button></template>
  </div>
  <div v-else-if="exampleId === 'valutazione'" class="process-evaluation">
    <div class="process-evaluation-heading"><HeroIcon name="pencil-square" /><div><h3>{{ good && evaluationStage === 2 ? 'Iscrizione al laboratorio' : 'Segnalazione sul menu Corso' }}</h3><p class="a11y-small">Laboratori di design</p></div></div>
    <template v-if="!good"><h3>Corso</h3><div class="a11y-mouse-select" @click="evalMenuOpen = !evalMenuOpen">{{ evalCourse || 'Scegli il corso' }}<div v-if="evalMenuOpen" class="a11y-mouse-options"><div v-for="course in ['Design','Comunicazione']" :key="course" @click.stop="evalCourse = course; evalMenuOpen = false">{{ course }}</div></div></div><template v-if="evaluationStage === 0"><label :for="id('generic-observation')">Segnalazione</label><input :id="id('generic-observation')" v-model="genericObservation" class="input" /><button type="button" class="btn" @click="recordObservation">Archivia segnalazione</button></template><p v-else>{{ recordedObservation ? `Segnalazione archiviata: ${recordedObservation}` : 'Segnalazione archiviata senza dettagli.' }}</p></template>
    <form v-else-if="evaluationStage === 0" class="a11y-form process-evaluation-form" @submit.prevent="recordObservation"><div class="process-field"><label :for="id('observation')">Ostacolo osservato</label><input :id="id('observation')" ref="evaluationField" v-model="observation" class="input" required /></div><dl class="process-observation-details"><div><dt>Conseguenza</dt><dd>L’iscrizione si interrompe.</dd></div><div><dt>Modifica</dt><dd>Usare una selezione nativa.</dd></div></dl><div class="process-form-action"><button type="submit" class="btn">Registra segnalazione</button></div></form>
    <template v-else-if="evaluationStage === 1"><p ref="evaluationReview" tabindex="-1">{{ observation }}</p><p>Stato della segnalazione: correzione disponibile.</p></template>
    <form v-else class="a11y-form process-evaluation-form" @submit.prevent="registerCourse"><div class="process-field"><label :for="id('retest')">Corso</label><select :id="id('retest')" ref="retestMenu" v-model="evalCourse" class="select" :aria-invalid="Boolean(registrationError)" :aria-describedby="registrationError ? id('registration-error') : undefined" @change="registrationError = ''"><option value="">Scegli il corso</option><option>Design</option><option>Comunicazione</option></select></div><div class="process-form-action"><button type="submit" class="btn">Iscriviti</button></div><p v-if="registrationError" :id="id('registration-error')" role="alert">{{ registrationError }}</p><p v-else-if="registrationResult" class="process-enrollment-result" role="status">{{ registrationResult }}</p></form>
    <AccessibilityLabControls v-if="good && evaluationStage > 0">
      <button v-if="evaluationStage === 1" type="button" class="btn btn-outline" @click="applyCorrection">Apri versione corretta</button>
      <template v-else><button type="button" class="btn btn-outline" @click="retest">Registra la nuova prova</button><p v-if="evalMessage" class="process-retest-result" role="status">{{ evalMessage }}</p></template>
    </AccessibilityLabControls>
  </div>
</template>

<style scoped>
.process-feedback,.process-media,.process-news,.process-audit,.process-evaluation { flex:1; min-width:0; min-height:0; }
.process-news,.process-audit,.process-evaluation { display:flex; flex-direction:column; gap:20px; }
.process-feedback { position:relative; display:flex; flex-direction:column; gap:24px; }
.process-feedback.has-distant-result { padding-bottom:52px; }
.process-feedback .process-form-action { margin-top:auto; }
.process-feedback.has-distant-result .process-form-action { margin-top:0; }
.process-course-context { display:grid; grid-template-columns:minmax(0,1.1fr) minmax(0,1fr); align-items:center; gap:24px; padding-block:12px; }
.process-course-context :deep(.a11y-service-media) { height:auto; aspect-ratio:16/9; }
.process-course-context > div { display:grid; gap:8px; }
.process-field { display:grid; gap:6px; min-width:0; }
.process-form-action { display:flex; flex:0 0 auto; justify-content:flex-end; padding-top:16px; border-top:1px solid var(--cvedi-rule); }
.process-save-result { min-height:26px; margin-top:0; }
.process-save-result, .process-news > [role="status"], .process-audit > [role="status"], .process-audit .a11y-form > [role="alert"], .process-evaluation > p, .process-evaluation .a11y-form > [role="status"] { overflow-wrap:anywhere; }
.process-distant-result { position:absolute; right:0; bottom:0; }
.process-video { display:grid; grid-template-rows:26px minmax(0,1fr) 64px; gap:4px; min-width:0; min-height:0; }
.process-video-image { display:flex; align-items:center; justify-content:center; width:100%; height:100%; min-height:0; }
.process-video-image img { display:block; width:100%; height:100%; object-fit:contain; object-position:center; border:0; border-radius:0; }
.process-video-caption { display:flex; align-items:center; justify-content:space-between; gap:8px; color:var(--section-primary-deep); }
.process-video-caption span { font-variant-numeric:tabular-nums; }
.process-video-subtitles { display:grid; align-items:center; min-height:64px; }
.process-media { display:grid; grid-template-rows:minmax(0,1fr) 44px 26px; gap:8px; }
.process-media .a11y-actions { margin:0; }
.process-media-controls { display:flex; align-items:center; gap:16px; min-height:44px; }
.process-player-buttons { display:flex; flex:none; gap:8px; }
.slidev-layout.default .a11y-demo .process-player-buttons .btn-square { width:44px; height:44px; padding:10px; }
.process-player-buttons svg { flex:none; width:24px; height:24px; }
.process-media-options { display:flex; align-items:center; flex-wrap:wrap; gap:12px; }
.process-media-options .a11y-check-row { white-space:nowrap; }
.process-media-description { min-height:26px; }
.process-exit-choice { padding:0; }
.process-exit-choice > span { flex:1; }
.process-news-lab-actions { margin:0; }
.process-retest-result { overflow-wrap:anywhere; }
.process-answer { display:flex; gap:8px; }
.process-answer .input { flex:1; }
.process-news .a11y-news { min-height:0; gap:4px; }
.process-news-heading { display:grid; gap:0; }
.process-news { gap:12px; }
.process-news .process-notice { display:grid; flex:1; grid-template-columns:minmax(0,1fr) minmax(0,1.4fr); align-items:center; gap:24px; min-height:128px; padding-block:8px 12px; border-bottom:1px solid var(--cvedi-rule); }
.process-notice :deep(.a11y-service-media) { height:auto; aspect-ratio:16/9; }
.process-notice-copy { display:grid; gap:12px; }
.process-notice-copy strong { font-variant-numeric:tabular-nums; }
.process-notice-controls { display:flex; align-items:center; flex-wrap:wrap; gap:8px; min-height:44px; }
.process-room-field { padding-top:8px; }
.process-audit .a11y-audit-steps { margin:0; }
.process-audit .process-coverage { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; padding-bottom:16px; border-bottom:1px solid var(--cvedi-rule); }
.process-audit-heading { display:grid; gap:8px; }
.process-coverage li { gap:4px; }
.process-coverage .is-covered span { color:var(--section-primary); font-weight:600; }
.process-stage-title { padding-top:8px; }
.process-audit .process-audit-form { display:flex; flex:1; flex-direction:column; gap:16px; min-height:0; }
.process-audit-form .process-form-action { margin-top:auto; }
.process-evaluation-heading { display:flex; align-items:center; gap:12px; padding-bottom:16px; border-bottom:1px solid var(--cvedi-rule); }
.process-evaluation-heading > svg { width:28px; height:28px; flex:none; color:var(--section-primary); }
.process-evaluation-heading > div { display:grid; gap:8px; }
.process-evaluation .process-evaluation-form { display:flex; flex:1; flex-direction:column; gap:20px; min-height:0; }
.process-evaluation-form .process-form-action { margin-top:auto; }
.process-observation-details { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:24px; margin:0; padding-top:8px; }
.process-observation-details > div { display:grid; align-content:start; gap:8px; }
.process-observation-details dt { font-weight:600; }
.process-observation-details dd { margin:0; }
.slidev-layout.default .a11y-demo .process-audit > .btn,.slidev-layout.default .a11y-demo .process-evaluation > .btn { align-self:flex-end; margin-top:auto; }
@media print {
  .process-audit { gap:8px; }
  .process-audit-heading { display:flex; flex-wrap:wrap; align-items:baseline; gap:8px 12px; }
  .slidev-layout.default .a11y-demo .process-audit h3 { margin-bottom:0; }
  .process-audit .process-coverage { padding-bottom:12px; }
  .process-audit .process-audit-form { gap:12px; }
  .process-stage-title { padding-top:4px; }
}
</style>
