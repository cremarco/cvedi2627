<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'
import { accessibilityDemo, demoProductImage, type AccessibilityDemoId } from '../data/accessibility-demos'
import { publicAsset } from '../utils/public-asset'

const props = defineProps<{ exampleId: AccessibilityDemoId; good: boolean; active: boolean; motionAllowed: boolean; reducedMotion: boolean }>()
const emit = defineEmits<{ play: [] }>()
const uid = useId()
const demo = computed(() => accessibilityDemo(props.exampleId))
const fieldId = (name: string) => `a11y-${uid}-${name}`
const message = ref('')
const selectedTime = ref('')
const checked = ref(false)
const width = ref(320)
const zoom = ref(100)
const email = ref('sara@example.test')
const course = ref('')
const menuOpen = ref(false)
const cities = ref(['Roma', 'Milano', 'Torino'])
const dragged = ref<string>()
const hideImage = ref(false)
const expanded = ref(false)
const note = ref('Portare il documento.')
const date = ref('14/10/26')
const error = ref('')
const dateInput = ref<HTMLInputElement>()
const password = ref('')
const pasteBlocked = ref(false)
const fullName = ref('Ana María O’Neill')
const language = ref('it')
const stage = ref(0)
const bookingDate = ref('2026-10-14')
const bookingTime = ref('10:00')
const bookingStart = ref<HTMLInputElement>()
const bookingReview = ref<HTMLElement>()
const bookingComplete = ref<HTMLElement>()
const observationInput = ref<HTMLInputElement>()
const observationReview = ref<HTMLElement>()
const correctedMenu = ref<HTMLSelectElement>()
const readingSize = ref(20)
const highContrast = ref(false)
const auditSteps = ref<boolean[]>([false, false, false])
const auditStage = ref(0)
const auditFinished = ref(false)
const auditName = ref('Sara')
const auditNote = ref('Portare il documento.')
const auditField = computed({ get: () => auditStage.value === 0 ? auditName.value : auditNote.value, set: value => { if (auditStage.value === 0) auditName.value = value; else auditNote.value = value } })
const observation = ref(props.good ? 'Il menu risponde soltanto al mouse.' : 'Il sito non funziona.')
const observationKind = ref('Osservazione')
const consequence = ref('La prenotazione si interrompe.')
const correction = ref('Rendere il menu utilizzabile da tastiera.')
const registered = ref(false)
const observing = ref(true)
const corrected = ref(false)
const retested = ref(false)
const news = ['La biblioteca apre alle 9.', 'Il laboratorio è in aula 12.', 'La consegna è venerdì.']
const newsIndex = ref(0)
const updates = ref(0)
const running = ref(false)
const paused = ref(false)
let timer: ReturnType<typeof setInterval> | undefined
let deadline: ReturnType<typeof setTimeout> | undefined
const mediaPlaying = ref(false)
const mediaPaused = ref(false)
const mediaCue = ref(0)
const captions = ref(props.good)
const description = ref(props.good)
let utterance: SpeechSynthesisUtterance | undefined
let mediaTimer: ReturnType<typeof setTimeout> | undefined
let mediaRemaining = 3000
let mediaStartedAt = 0
const speechAvailable = typeof window !== 'undefined' && 'speechSynthesis' in window
const spokenCue = computed(() => mediaCue.value === 0
  ? 'Il percorso è questo.'
  : 'La destinazione è stata selezionata.')
const visualDescription = computed(() => mediaCue.value === 0 ? 'La freccia indica il percorso a destra.' : 'Il punto di arrivo è evidenziato.')
const bookingSummary = computed(() => {
  const parsed = new Date(`${bookingDate.value}T12:00:00Z`)
  return Number.isNaN(parsed.getTime()) ? bookingDate.value : new Intl.DateTimeFormat('it-IT', { dateStyle: 'long', timeZone: 'UTC' }).format(parsed)
})

function selectTime(time: string) {
  selectedTime.value = time
  message.value = time === '10:00' ? 'Orario non disponibile. Scegli 11:30.' : `Appuntamento alle ${time}.`
}
function submitCourse() { message.value = course.value ? `Iscrizione al corso ${course.value} pronta.` : 'Seleziona un corso per continuare.' }
function moveCity(city: string, delta: number) {
  const from = cities.value.indexOf(city), to = from + delta
  if (to < 0 || to >= cities.value.length) return
  const list = [...cities.value]; list.splice(from, 1); list.splice(to, 0, city); cities.value = list
  message.value = `${city} ora è in posizione ${to + 1}.`
}
function dropCity(target: string) {
  if (!dragged.value || target === dragged.value) return
  const list = cities.value.filter(city => city !== dragged.value)
  list.splice(list.indexOf(target), 0, dragged.value); cities.value = list; dragged.value = undefined
}
function validateDate() {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(date.value)
  const parsed = match ? new Date(Date.UTC(+match[3], +match[2] - 1, +match[1])) : undefined
  const valid = Boolean(match && parsed?.getUTCFullYear() === +match[3] && parsed?.getUTCMonth() === +match[2] - 1 && parsed?.getUTCDate() === +match[1])
  error.value = valid ? '' : (props.good ? 'Inserisci una data valida in formato GG/MM/AAAA: usa quattro cifre per l’anno.' : 'Errore')
  if (!valid) { if (!props.good) note.value = ''; else nextTick(() => dateInput.value?.focus()) }
  message.value = valid ? (props.good ? 'Appuntamento confermato; la nota è conservata.' : 'Appuntamento confermato.') : ''
}
function submitName() {
  message.value = (!props.good && !/^[A-Za-z]+$/.test(fullName.value)) ? 'Sono ammesse solo lettere A–Z.'
    : !fullName.value.trim() ? 'Inserisci il nome.'
    : language.value === 'en' ? `Request received for ${fullName.value}.` : `Richiesta ricevuta per ${fullName.value}.`
}
function startNews() {
  if (!props.motionAllowed) { message.value = 'Con movimento ridotto la lettura rimane ferma.'; return }
  running.value = true; paused.value = false
  timer = setInterval(() => { if (!paused.value) { newsIndex.value = (newsIndex.value + 1) % news.length; updates.value++ } }, 1300)
  deadline = setTimeout(() => { stopNews(); message.value = 'Dimostrazione terminata.' }, 8000)
}
function stopNews() { if (timer) clearInterval(timer); if (deadline) clearTimeout(deadline); timer = undefined; deadline = undefined; running.value = false }
function cancelSpeech() {
  if (utterance && speechAvailable) { utterance.onend = null; window.speechSynthesis.cancel(); utterance = undefined }
}
function stopMedia() {
  if (mediaTimer) clearTimeout(mediaTimer); mediaTimer = undefined
  cancelSpeech()
  mediaPlaying.value = false
  mediaPaused.value = false
  mediaCue.value = 0
  mediaRemaining = 3000
}
function speakCue() {
  if (!speechAvailable) return
  const text = props.good && description.value && mediaCue.value === 0 ? `${spokenCue.value} A destra.` : spokenCue.value
  utterance = new SpeechSynthesisUtterance(text); utterance.lang = 'it-IT'
  const voice = window.speechSynthesis.getVoices().find(voice => voice.lang.startsWith('it'))
  if (voice) utterance.voice = voice
  window.speechSynthesis.speak(utterance)
}
function playMedia() {
  if (mediaPlaying.value) {
    if (mediaTimer) clearTimeout(mediaTimer); mediaTimer = undefined
    mediaRemaining = Math.max(1, mediaRemaining - (Date.now() - mediaStartedAt))
    cancelSpeech(); mediaPlaying.value = false; mediaPaused.value = true
    return
  }
  if (!props.active) return
  emit('play')
  if (!mediaPaused.value) { mediaCue.value = 0; mediaRemaining = 3000 }
  mediaPlaying.value = true; mediaPaused.value = false; speakCue(); scheduleMediaCue()
}
function scheduleMediaCue() {
  mediaStartedAt = Date.now()
  mediaTimer = setTimeout(() => {
    mediaTimer = undefined
    if (mediaCue.value === 0) { mediaCue.value = 1; mediaRemaining = 3000; speakCue(); scheduleMediaCue() }
    else { cancelSpeech(); mediaPlaying.value = false; mediaRemaining = 3000 }
  }, mediaRemaining)
}
function finishAuditStep() {
  auditSteps.value[auditStage.value] = true
  if (props.good && auditStage.value < 2) auditStage.value++
  else auditFinished.value = true
}
function retest() { retested.value = Boolean(corrected.value && course.value); message.value = retested.value ? 'Nuova prova riuscita: il corso è selezionato.' : 'Scegli il corso con il menu corretto prima di registrare l’esito.' }
watch(description, () => { if (mediaPlaying.value) { cancelSpeech(); speakCue() } })
watch(stage, async current => {
  if (!props.good || props.exampleId !== 'cognitiva') return
  await nextTick()
  const target = current === 0 ? bookingStart.value : current === 1 ? bookingReview.value : bookingComplete.value
  target?.focus()
})
watch(observing, async current => { if (props.good && !current) { await nextTick(); observationInput.value?.focus() } })
watch(registered, async current => { if (props.good && current) { await nextTick(); observationReview.value?.focus() } })
watch(corrected, async current => { if (props.good && current) { await nextTick(); correctedMenu.value?.focus() } })
watch(() => props.active, active => { if (!active) { stopNews(); stopMedia() } })
watch(() => props.motionAllowed, allowed => { if (!allowed) stopNews() })
onBeforeUnmount(() => { stopNews(); stopMedia() })
defineExpose({ stopMedia })
</script>

<template>
  <section class="a11y-scenario" :class="good ? 'is-good' : 'is-bad'" :data-variant="good ? 'good' : 'bad'" :aria-labelledby="fieldId('heading')">
    <div class="a11y-scenario-heading">
      <h2 :id="fieldId('heading')">{{ good ? 'Scenario funzionante' : 'Scenario errato' }}</h2>
      <p class="a11y-scenario-summary">{{ demo.variantLabels[good ? 'good' : 'bad'] }}</p>
    </div>
    <div class="a11y-ui" :class="{ 'a11y-media-ui': exampleId === 'media' }">
      <template v-if="exampleId === 'contrasto-testo'">
        <div class="a11y-appointment" :class="{ 'low-contrast': !good, 'unavailable': selectedTime === '10:00' }">
          <h3>Il tuo appuntamento</h3><p>14 ottobre · scegli l’orario</p>
          <div class="a11y-actions"><button v-for="time in ['10:00', '11:30']" :key="time" type="button" class="btn btn-outline" :aria-pressed="selectedTime === time" @click="selectTime(time)">{{ time }}</button></div>
          <p v-if="good" role="status">{{ message || '10:00 esaurito · 11:30 disponibile' }}</p>
          <span v-else class="a11y-color-signal" :class="{ 'is-red': selectedTime === '10:00' }" aria-hidden="true"></span>
        </div>
      </template>
      <template v-else-if="exampleId === 'contrasto-controlli'">
        <label class="a11y-check-row"><input v-model="checked" type="checkbox" class="checkbox" :class="{ 'faint-checkbox': !good }" /><span>Ricevi aggiornamenti</span></label>
        <p v-if="good" role="status">{{ checked ? 'Casella selezionata' : 'Casella non selezionata' }}</p>
      </template>
      <template v-else-if="exampleId === 'adattamento'">
        <div class="a11y-dimensions">
          <label :for="fieldId('width')">Larghezza della prova: {{ width }} CSS px</label><input :id="fieldId('width')" v-model.number="width" class="range" type="range" min="200" max="360" step="10" />
          <button type="button" class="btn btn-outline" :aria-pressed="zoom === 200" @click="zoom = zoom === 100 ? 200 : 100">{{ zoom === 100 ? 'Ingrandisci al 200%' : 'Ripristina al 100%' }}</button>
        </div>
        <div class="a11y-viewport" :class="{ 'rigid-reflow': !good }" :style="{ '--demo-width': `${width}px`, '--demo-zoom': zoom / 100 }">
          <div class="a11y-booking-row"><p>14 ottobre · 10:00</p><button type="button" class="btn" @click="message = 'Prenotazione confermata.'">Conferma</button></div>
        </div><p v-if="message" :role="good ? 'status' : undefined">{{ message }}</p>
      </template>
      <form v-else-if="exampleId === 'tastiera'" class="a11y-form" @submit.prevent="submitCourse">
        <label :for="fieldId('email')">Email</label><input :id="fieldId('email')" v-model="email" class="input" type="email" />
        <label :for="good ? fieldId('course') : undefined">Corso</label>
        <select v-if="good" :id="fieldId('course')" v-model="course" class="select"><option value="">Scegli il corso</option><option>Design</option><option>Comunicazione</option></select>
        <div v-else class="a11y-mouse-select" @click="menuOpen = !menuOpen">{{ course || 'Scegli il corso' }}<div v-if="menuOpen" class="a11y-mouse-options"><div v-for="option in ['Design', 'Comunicazione']" :key="option" @click.stop="course = option; menuOpen = false">{{ option }}</div></div></div>
        <button type="submit" class="btn">Invia</button><p :role="good ? 'status' : undefined">{{ message }}</p>
      </form>
      <template v-else-if="exampleId === 'puntamento'">
        <ol class="a11y-city-list"><li v-for="(city, index) in cities" :key="city" :draggable="!good" @dragstart="dragged = city" @dragover.prevent @drop.prevent="dropCity(city)">
          <span>{{ city }}</span><div v-if="good" class="a11y-actions"><button type="button" class="btn btn-outline" :disabled="index === 0" :aria-label="`Sposta ${city} su`" @click="moveCity(city, -1)">Su</button><button type="button" class="btn btn-outline" :disabled="index === cities.length - 1" :aria-label="`Sposta ${city} giù`" @click="moveCity(city, 1)">Giù</button></div><span v-else class="a11y-drag-handle">Trascina</span>
        </li></ol><p v-if="good" role="status">{{ message }}</p>
      </template>
      <template v-else-if="exampleId === 'immagini'">
        <label class="a11y-check-row"><input v-model="hideImage" type="checkbox" class="checkbox" /><span>Mostra l’alternativa testuale</span></label>
        <div v-if="!hideImage" class="a11y-product-frame"><img :src="publicAsset(demoProductImage)" :alt="good ? 'Zaino rosso, due tasche frontali' : 'foto_018.jpg'" /></div>
        <p v-else class="a11y-alt-preview">{{ good ? 'Zaino rosso, due tasche frontali' : 'foto_018.jpg' }}</p>
        <p class="a11y-small">Anteprima del testo alternativo dell’immagine. Illustrazione dal mockup del booklet.</p>
      </template>
      <template v-else-if="exampleId === 'media'">
        <div class="a11y-media-stage" :class="{ 'destination-selected': mediaCue === 1 }" aria-label="Percorso verso destra; destinazione selezionata al secondo passaggio">
          <svg viewBox="0 0 240 50" aria-hidden="true"><path d="M20 25h170m-35-16 35 16-35 16" fill="none" stroke="currentColor" stroke-width="5" /><circle cx="216" cy="25" r="13" fill="currentColor" :opacity="mediaCue ? 1 : .15" /></svg><p>{{ mediaCue ? 'Destinazione selezionata' : 'Il percorso' }}</p>
        </div>
        <div class="a11y-actions"><button type="button" class="btn" @click="playMedia">{{ mediaPlaying ? 'Pausa' : mediaPaused ? 'Riprendi' : 'Riproduci' }}</button><button type="button" class="btn btn-outline" @click="stopMedia">Ricomincia</button><span class="a11y-small">Passaggio {{ mediaCue + 1 }} di 2</span></div>
        <div v-if="good" class="a11y-actions"><label class="a11y-check-row"><input v-model="captions" type="checkbox" class="checkbox" /><span>Sottotitoli</span></label><label class="a11y-check-row"><input v-model="description" type="checkbox" class="checkbox" /><span>Descrizione visiva</span></label></div>
        <p v-if="good && captions" class="a11y-captions">Docente: {{ spokenCue }}</p><p v-if="good && description" class="a11y-description">Descrizione: {{ visualDescription }}</p><p v-if="!speechAvailable" class="a11y-small">La sintesi vocale non è disponibile nel browser.</p>
      </template>
      <template v-else-if="exampleId === 'semantica'">
        <button v-if="good" type="button" class="btn btn-outline" :aria-expanded="expanded" :aria-controls="fieldId('details')" @click="expanded = !expanded">Dettagli consegna</button>
        <span v-else class="a11y-fake-link" @click="expanded = !expanded">Dettagli consegna</span>
        <div v-if="expanded" :id="fieldId('details')" class="a11y-delivery"><p>Consegna · 14 ottobre</p><p>Ora · 10:00</p></div><p v-if="good" class="a11y-small">{{ expanded ? 'Pannello espanso' : 'Pannello compresso' }}</p>
      </template>
      <form v-else-if="exampleId === 'feedback'" class="a11y-form a11y-feedback-form" @submit.prevent="message = 'Salvataggio completato'">
        <label :for="fieldId('note')">Nota della prenotazione</label><input :id="fieldId('note')" v-model="note" class="input" />
        <button type="submit" class="btn">Salva</button><p :role="good ? 'status' : undefined" :aria-live="good ? 'polite' : undefined" :class="{ 'distant-feedback': !good }">{{ message }}</p>
      </form>
      <template v-else-if="exampleId === 'cognitiva'">
        <ol v-if="good" class="steps a11y-booking-steps" aria-label="Passaggi della prenotazione"><li v-for="(step, i) in ['Scegli', 'Controlla', 'Conferma']" :key="step" class="step" :class="{ 'step-primary': i <= stage }" :aria-current="i === stage ? 'step' : undefined">{{ step }}</li></ol>
        <form v-if="stage === 0" class="a11y-form" @submit.prevent="stage = 1"><label :for="fieldId('booking-date')">Data</label><input :id="fieldId('booking-date')" ref="bookingStart" v-model="bookingDate" class="input" type="date" required /><label :for="fieldId('booking-time')">Ora</label><select :id="fieldId('booking-time')" v-model="bookingTime" class="select"><option>10:00</option><option>11:30</option></select><button type="submit" class="btn">Continua</button></form>
        <div v-else-if="stage === 1"><h3 ref="bookingReview" :tabindex="good ? -1 : undefined">{{ good ? 'Controlla la prenotazione' : 'Confermi?' }}</h3><p v-if="good">{{ bookingSummary }} · {{ bookingTime }}</p><div class="a11y-actions"><button type="button" class="btn btn-outline" @click="stage = 0; if (!good) { bookingDate = ''; bookingTime = '10:00' }">{{ good ? 'Modifica' : 'Torna indietro' }}</button><button type="button" class="btn" @click="stage = 2">Conferma</button></div></div><p v-else ref="bookingComplete" :tabindex="good ? -1 : undefined" role="status">Prenotazione completata.</p>
      </template>
      <template v-else-if="exampleId === 'movimento'">
        <div class="a11y-news"><h3>Avvisi del corso</h3><p>{{ news[newsIndex] }}</p><p class="a11y-small">Aggiornamenti: {{ updates }}</p></div>
        <button v-if="!running" type="button" class="btn" @click="startNews">Avvia aggiornamenti</button><button v-else-if="good" type="button" class="btn" :aria-pressed="paused" @click="paused = !paused">{{ paused ? 'Riprendi' : 'Pausa aggiornamenti' }}</button>
        <p v-if="running" class="a11y-small">{{ paused ? 'Aggiornamenti in pausa: puoi continuare a leggere.' : 'Aggiornamenti attivi. La demo termina entro 8 secondi.' }}</p><p v-if="reducedMotion" class="a11y-small">Movimento ridotto: la lettura resta ferma.</p><p :role="good ? 'status' : undefined">{{ message }}</p>
      </template>
      <form v-else-if="exampleId === 'moduli'" class="a11y-form" novalidate @submit.prevent="validateDate">
        <label v-if="good" :for="fieldId('date')">Data dell’appuntamento</label><input :id="fieldId('date')" ref="dateInput" v-model="date" class="input" :class="{ 'input-error': error }" :placeholder="good ? undefined : 'Data'" :aria-invalid="good ? Boolean(error) : undefined" :aria-describedby="good ? fieldId('date-help') + (error ? ' ' + fieldId('date-error') : '') : undefined" />
        <p v-if="good" :id="fieldId('date-help')" class="a11y-small">Formato GG/MM/AAAA.</p><p v-if="error" :id="fieldId('date-error')" :role="good ? 'alert' : undefined">{{ error }}</p>
        <label :for="fieldId('other-note')">Nota</label><input :id="fieldId('other-note')" v-model="note" class="input" /><button type="submit" class="btn">Conferma</button><p :role="good ? 'status' : undefined">{{ message }}</p>
      </form>
      <form v-else-if="exampleId === 'autenticazione'" class="a11y-form" @submit.prevent="message = password === 'design-2026' ? 'Accesso simulato riuscito.' : 'Usa la password dimostrativa.'">
        <p>Password dimostrativa: <strong>design-2026</strong></p><label :for="fieldId('password')">Password</label><input :id="fieldId('password')" v-model="password" class="input" type="password" name="password" :autocomplete="good ? 'current-password' : 'off'" @paste="if (!good) { $event.preventDefault(); pasteBlocked = true }" />
        <div class="a11y-actions"><button type="button" class="btn btn-outline" @click="good ? (password = 'design-2026', message = 'Password dimostrativa inserita.') : pasteBlocked = true">Incolla l’esempio</button><button type="submit" class="btn">Accedi</button></div><p v-if="pasteBlocked">Incolla disabilitato.</p><p :role="good ? 'status' : undefined">{{ message }}</p><p class="a11y-small">Il pulsante inserisce il dato di esempio. Puoi anche provare l’incolla nel campo.</p>
      </form>
      <template v-else-if="exampleId === 'personalizzazione'">
        <div v-if="good" class="a11y-reading-controls"><button type="button" class="btn btn-outline" :disabled="readingSize <= 18" aria-label="Riduci il testo" @click="readingSize -= 2">Testo −</button><button type="button" class="btn btn-outline" :disabled="readingSize >= 28" aria-label="Ingrandisci il testo" @click="readingSize += 2">Testo +</button><label class="a11y-check-row"><input v-model="highContrast" type="checkbox" class="checkbox" /><span>Più contrasto</span></label><button type="button" class="btn btn-ghost" @click="readingSize = 20; highContrast = false; message = 'Preferenze di lettura ripristinate.'">Ripristina</button></div>
        <p v-else>Una sola configurazione di lettura.</p><p v-if="good" class="a11y-small">Testo: {{ readingSize }} px · {{ highContrast ? 'Contrasto elevato' : 'Contrasto standard' }}</p><div class="a11y-reader" :class="{ 'high-contrast': highContrast }" :style="{ '--reading-size': `${readingSize}px` }"><p>La biblioteca apre alle 9. Il catalogo e la prenotazione restano disponibili.</p><button type="button" class="btn" @click="message = 'Catalogo aperto.'">Apri il catalogo</button></div><p :role="good ? 'status' : undefined">{{ message }}</p>
      </template>
      <form v-else-if="exampleId === 'lingua'" class="a11y-form" @submit.prevent="submitName">
        <label :for="fieldId('name')">{{ good ? 'Nome completo' : 'Cognome · solo lettere A–Z' }}</label><input :id="fieldId('name')" v-model="fullName" class="input" autocomplete="off" />
        <label :for="fieldId('lang')">Lingua del messaggio</label><select :id="fieldId('lang')" v-model="language" class="select"><option value="it">Italiano</option><option value="en">English</option></select><button type="submit" class="btn">Invia</button><p :lang="good ? language : 'it'" :role="good ? 'status' : undefined">{{ message }}</p>
      </form>
      <template v-else-if="exampleId === 'verifica-wcag'">
        <ol class="a11y-audit-steps" aria-label="Ambito della prova"><li v-for="(step, i) in ['Accesso', 'Modulo', 'Conferma']" :key="step"><strong>{{ step }}</strong><span>{{ auditSteps[i] ? 'Incluso' : 'Da includere' }}</span></li></ol>
        <div v-if="!auditFinished"><h3>{{ ['Accesso', 'Modulo', 'Conferma'][auditStage] }}</h3><template v-if="auditStage < 2"><label :for="fieldId('audit-input')">{{ auditStage === 0 ? 'Nome per la prova' : 'Nota della prenotazione' }}</label><input :id="fieldId('audit-input')" v-model="auditField" class="input" /></template><div v-else><p>{{ auditName }} · 14 ottobre · 10:00</p><p>{{ auditNote }}</p></div><button type="button" class="btn" @click="finishAuditStep">{{ good ? 'Includi questo passaggio' : 'Chiudi dopo l’accesso' }}</button></div>
        <div v-else><p :role="good ? 'status' : undefined">{{ good ? 'Tutti e tre i passaggi sono inclusi nella prova.' : 'La prova si ferma al solo accesso.' }}</p><p class="a11y-small">{{ good ? 'La demo illustra l’ambito: non esegue un audit e non attesta la conformità.' : 'Modulo e conferma restano fuori dall’ambito.' }}</p></div>
      </template>
      <template v-else-if="exampleId === 'valutazione'">
        <div v-if="!good" class="a11y-original-task">
          <h3>Scegli il corso senza mouse</h3>
          <p class="a11y-small">Prova a raggiungere il menu con Tab.</p>
          <div class="a11y-mouse-select" @click="menuOpen = !menuOpen">{{ course || 'Scegli il corso' }}<div v-if="menuOpen" class="a11y-mouse-options"><div v-for="option in ['Design', 'Comunicazione']" :key="option" @click.stop="course = option; menuOpen = false">{{ option }}</div></div></div>
        </div>
        <div v-if="good && observing" class="a11y-observation-start">
          <h3>Prima osserva il compito</h3>
          <p>Prova il menu a sinistra con Tab: riesci a scegliere Design?</p>
          <p>Registra dove ti fermi, proponi una modifica e riprova la scelta.</p>
          <button type="button" class="btn" @click="observing = false">Annota l’ostacolo</button>
        </div>
        <template v-else>
        <form v-if="!registered" class="a11y-form a11y-observation" @submit.prevent="registered = true">
          <label :for="fieldId('observation')">{{ good ? 'Ostacolo osservato' : 'Segnalazione' }}</label><input :id="fieldId('observation')" ref="observationInput" v-model="observation" class="input" />
          <template v-if="good"><label :for="fieldId('kind')">Tipo di evidenza</label><select :id="fieldId('kind')" v-model="observationKind" class="select"><option>Osservazione</option><option>Ipotesi da verificare</option></select><label :for="fieldId('consequence')">Conseguenza sul compito</label><input :id="fieldId('consequence')" v-model="consequence" class="input" /><label :for="fieldId('correction')">Modifica proposta</label><input :id="fieldId('correction')" v-model="correction" class="input" /></template><button type="submit" class="btn">Registra</button>
        </form>
        <div v-else class="a11y-observation-review">
          <p v-if="!good">Segnalazione archiviata.</p>
          <template v-else-if="!corrected">
            <p ref="observationReview" tabindex="-1">{{ observationKind }}: {{ observation }}</p>
            <p><strong>Conseguenza:</strong> {{ consequence }}</p>
            <p><strong>Modifica proposta:</strong> {{ correction }}</p>
            <p class="a11y-small">Nella demo il menu viene sostituito con una selezione nativa.</p>
            <button type="button" class="btn" @click="corrected = true">Prova il menu corretto</button>
          </template>
          <div v-else class="a11y-form">
            <h3>Riprova la stessa scelta</h3>
            <p class="a11y-small">Usa Tab e i tasti del menu: ora puoi scegliere il corso.</p>
            <label :for="fieldId('retest-course')">Corso</label><select :id="fieldId('retest-course')" ref="correctedMenu" v-model="course" class="select"><option value="">Scegli il corso</option><option>Design</option><option>Comunicazione</option></select>
            <button type="button" class="btn" @click="retest">Registra la nuova prova</button><p role="status">{{ message }}</p>
          </div>
        </div>
        </template>
      </template>
    </div>
  </section>
</template>
