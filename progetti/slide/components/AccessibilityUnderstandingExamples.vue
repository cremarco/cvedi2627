<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from 'vue'
import type { AccessibilityDemoId } from '../data/accessibility-demos'
import AccessibilityServiceMedia from './AccessibilityServiceMedia.vue'
import HeroIcon from './HeroIcon.vue'

const props = defineProps<{
  exampleId: AccessibilityDemoId
  good: boolean
  active: boolean
  motionAllowed: boolean
  reducedMotion: boolean
}>()
const emit = defineEmits<{ insight: [value: string] }>()
const uid = useId()
const fieldId = (name: string) => `a11y-understanding-${uid}-${name}`

const bookingStage = ref(0)
const bookingDate = ref('2026-10-14')
const bookingTime = ref('10:00')
const returnedToBooking = ref(false)
const bookingDateInput = ref<HTMLInputElement>()
const bookingReview = ref<HTMLElement>()
const bookingComplete = ref<HTMLElement>()
const savedBooking = ref({ date: '', time: '' })

function dateInWords(value: string) {
  const parsed = new Date(`${value}T12:00:00Z`)
  return Number.isNaN(parsed.getTime()) ? value : new Intl.DateTimeFormat('it-IT', {
    dateStyle: 'long', timeZone: 'UTC',
  }).format(parsed)
}
const bookingSummary = computed(() => `${dateInWords(bookingDate.value)} · ${bookingTime.value}`)
const savedBookingSummary = computed(() => `${dateInWords(savedBooking.value.date)} · ${savedBooking.value.time}`)
const bookingChanged = computed(() => savedBooking.value.date !== '2026-10-14' || savedBooking.value.time !== '10:00')
function reviewBooking() {
  returnedToBooking.value = false
  bookingStage.value = 1
}
function editBooking() {
  returnedToBooking.value = true
  bookingStage.value = 0
  if (!props.good) {
    bookingDate.value = ''
    bookingTime.value = ''
  }
}
function saveBooking() {
  savedBooking.value = { date: bookingDate.value, time: bookingTime.value }
  bookingStage.value = 2
}

const formDate = ref('14/10/26')
const formNote = ref('Portare il documento.')
const formError = ref('')
const dateInput = ref<HTMLInputElement>()
const savedForm = ref<{ date: string; note: string }>()
const formAttempted = ref(false)
function parsedFormDate(value: string) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value.trim())
  if (!match || +match[3] === 0) return undefined
  const day = +match[1], month = +match[2], year = +match[3]
  const parsed = new Date(0)
  parsed.setUTCFullYear(year, month - 1, day)
  if (parsed.getUTCFullYear() !== year || parsed.getUTCMonth() !== month - 1 || parsed.getUTCDate() !== day) return undefined
  return `${match[3]}-${match[2]}-${match[1]}`
}
function validateDate() {
  formAttempted.value = true
  savedForm.value = undefined
  const parsed = parsedFormDate(formDate.value)
  if (parsed) {
    formError.value = ''
    savedForm.value = { date: parsed, note: formNote.value }
    return
  }
  if (!props.good) {
    formError.value = 'Errore.'
    formNote.value = ''
    return
  }
  formError.value = /^\d{2}\/\d{2}\/\d{2}$/.test(formDate.value.trim())
    ? 'L’anno deve avere quattro cifre. Scrivi 14/10/2026.'
    : /^\d{2}\/\d{2}\/\d{4}$/.test(formDate.value.trim())
      ? 'Questa data non esiste. Controlla giorno e mese.'
      : 'Scrivi la data in formato GG/MM/AAAA, per esempio 14/10/2026.'
  nextTick(() => { if (props.active) dateInput.value?.focus() })
}

const readingSize = ref(20)
const highContrast = ref(false)
const hoursOpen = ref(false)
const readingWasReset = ref(false)
function changeReadingSize(delta: number) {
  readingSize.value = Math.min(28, Math.max(18, readingSize.value + delta))
  readingWasReset.value = false
}
function resetReading() {
  readingSize.value = 20
  highContrast.value = false
  readingWasReset.value = true
}

const fullName = ref('Ana María O’Neill')
const language = ref('it')
const nameError = ref('')
const nameMessage = ref('')
const nameSubmitted = ref(false)
const nameInput = ref<HTMLInputElement>()
function submitName() {
  nameSubmitted.value = true
  nameMessage.value = ''
  const name = fullName.value.trim()
  if (!name) {
    nameError.value = language.value === 'en' && props.good ? 'Enter your full name.' : 'Inserisci il nome completo.'
  } else if (!props.good && !/^[A-Za-z]+$/.test(name)) {
    nameError.value = 'Sono ammesse solo lettere A–Z, senza spazi.'
  } else {
    nameError.value = ''
    nameMessage.value = language.value === 'en' ? `Request received for ${name}.` : `Richiesta ricevuta per ${name}.`
  }
  if (nameError.value && props.good) nextTick(() => { if (props.active) nameInput.value?.focus() })
}

const insight = computed(() => {
  if (props.exampleId === 'cognitiva') {
    if (bookingStage.value === 2) return props.good
      ? bookingChanged.value ? `L’esito riporta ${savedBookingSummary.value}: puoi verificare quale appuntamento è stato registrato.` : 'La conferma mostra ancora 14 ottobre alle 10:00: i dati iniziali non sono stati cambiati.'
      : '«Ok» non dice quale data e ora sono state registrate: non puoi controllare l’esito.'
    if (bookingStage.value === 1) return props.good
      ? 'Prima della conferma puoi rileggere data e ora; Modifica permette di correggerle.'
      : '«Confermi?» non mostra i dati: devi ricordare la scelta per poterla controllare.'
    if (returnedToBooking.value) return props.good
      ? 'Il ritorno conserva data e ora: basta correggere il dato che vuoi cambiare.'
      : 'Il ritorno ha svuotato entrambi i campi: la scelta deve essere ricostruita.'
    return props.good
      ? 'Sposta al 15 ottobre, 11:30; controlla il riepilogo e torna a modificare prima di confermare.'
      : 'Sposta al 15 ottobre, 11:30; poi torna indietro: la data e l’ora scelte sono ancora disponibili?'
  }
  if (props.exampleId === 'moduli') {
    if (savedForm.value) return props.good
      ? 'La correzione della data non richiede di riscrivere una nota già valida.'
      : savedForm.value.note ? 'I dati sono stati salvati, ma il precedente errore non spiegava la correzione.' : 'La data corretta è salvata, ma la nota cancellata dall’errore è andata persa.'
    if (formAttempted.value) return props.good
      ? 'L’errore indica quale parte della data correggere; il focus torna al campo e la nota resta compilata.'
      : 'L’errore non indica quale dato correggere e ha cancellato una nota valida.'
    return props.good
      ? 'Il formato è indicato prima dell’invio. Prova il valore iniziale con l’anno a due cifre.'
      : 'Il campo non spiega il formato richiesto. Il valore iniziale sembra plausibile: prova a salvarlo.'
  }
  if (props.exampleId === 'personalizzazione') {
    if (!props.good) return hoursOpen.value
      ? 'Gli orari si aprono, ma manca un controllo per adattarne la lettura alle tue preferenze.'
      : 'Il testo iniziale è leggibile; il limite emerge quando vuoi ingrandirlo o aumentare il contrasto.'
    if (readingWasReset.value) return hoursOpen.value
      ? 'Il ripristino riporta la lettura a 20 px e contrasto standard, conservando gli orari aperti.'
      : 'Il ripristino riporta la lettura a 20 px e contrasto standard senza cambiare il contenuto.'
    if (hoursOpen.value) return `Gli orari si aprono mantenendo la tua scelta: ${readingSize.value} px e contrasto ${highContrast.value ? 'elevato' : 'standard'}.`
    if (readingSize.value !== 20 || highContrast.value) return 'Le preferenze cambiano il testo da leggere. Ora apri gli orari per verificare che restino applicate.'
    return 'Puoi adattare la lettura e poi ripristinarla. È una scelta di supporto, non una verifica automatica di conformità.'
  }
  if (props.exampleId === 'lingua') {
    if (nameError.value) return props.good
      ? 'Il campo richiede un nome, senza imporre un alfabeto o una grafia diversi dai tuoi.'
      : 'Spazi, accento e apostrofo del nome sono rifiutati. Per proseguire devi alterare il dato.'
    if (nameSubmitted.value && language.value === 'en') return props.good
      ? 'Il messaggio inglese dichiara anche lang="en": la lingua è riconoscibile alle tecnologie assistive.'
      : 'Il messaggio è in inglese, ma il codice lo dichiara italiano: cambia la lingua visiva, non quella annunciata.'
    if (nameSubmitted.value) return props.good
      ? 'La richiesta conserva il nome completo, compresi spazi, accento e apostrofo.'
      : 'La richiesta passa solo usando lettere A–Z; scegli English per verificare anche la lingua del messaggio.'
    return props.good
      ? 'Prova prima il nome completo; poi scegli English per verificare un secondo aspetto: la lingua del messaggio.'
      : 'Prima verifica il nome completo. Per provare anche la lingua, usa Ana e scegli English dopo il rifiuto.'
  }
  return ''
})
watch(insight, value => emit('insight', value), { immediate: true })
watch([fullName, language], () => {
  nameSubmitted.value = false
  nameMessage.value = ''
  nameError.value = ''
})
watch(bookingStage, async current => {
  if (!props.good || !props.active || props.exampleId !== 'cognitiva') return
  await nextTick()
  const target = current === 0 ? bookingDateInput.value : current === 1 ? bookingReview.value : bookingComplete.value
  target?.focus()
})
</script>

<template>
  <div v-if="exampleId === 'cognitiva'" class="understanding-booking">
    <ol v-if="good" class="steps a11y-booking-steps understanding-booking-steps" aria-label="Passaggi per spostare l’appuntamento">
      <li v-for="(step, i) in ['Nuovo orario', 'Riepilogo', 'Esito']" :key="step" class="step" :class="{ 'step-primary': i <= bookingStage }" :aria-current="i === bookingStage ? 'step' : undefined">{{ step }}</li>
    </ol>
    <form v-if="bookingStage === 0" class="a11y-form a11y-understanding-form understanding-booking-form" @submit.prevent="reviewBooking">
      <div class="understanding-appointment">
        <HeroIcon name="pencil-square" />
        <div><p>Appuntamento attuale</p><p><strong>14 ottobre · 10:00</strong></p></div>
      </div>
      <fieldset class="fieldset understanding-fields understanding-date-time">
        <legend class="fieldset-legend">Scegli il nuovo orario</legend>
        <div class="understanding-field">
          <label :for="fieldId('booking-date')">Nuova data</label>
          <input :id="fieldId('booking-date')" ref="bookingDateInput" v-model="bookingDate" class="input" type="date" required />
        </div>
        <div class="understanding-field">
          <label :for="fieldId('booking-time')">Nuova ora</label>
          <select :id="fieldId('booking-time')" v-model="bookingTime" class="select" required>
            <option value="" disabled>Scegli l’ora</option><option>10:00</option><option>11:30</option><option>14:00</option>
          </select>
        </div>
      </fieldset>
      <div class="understanding-form-action"><button type="submit" class="btn">{{ good ? 'Controlla il nuovo orario' : 'Continua' }}</button></div>
    </form>
    <div v-else-if="bookingStage === 1" class="a11y-understanding-result understanding-booking-result">
      <h3 ref="bookingReview" :tabindex="good ? -1 : undefined">{{ good ? 'Controlla il nuovo orario' : 'Confermi?' }}</h3>
      <p v-if="good" class="a11y-booking-summary"><HeroIcon name="pencil-square" /><strong>{{ bookingSummary }}</strong></p>
      <div class="a11y-actions understanding-booking-actions">
        <button type="button" class="btn btn-outline" @click="editBooking">{{ good ? 'Modifica' : 'Torna indietro' }}</button>
        <button type="button" class="btn" @click="saveBooking">{{ good ? 'Conferma il nuovo orario' : 'Conferma' }}</button>
      </div>
    </div>
    <div v-else class="a11y-understanding-result understanding-booking-result understanding-booking-complete">
      <HeroIcon v-if="good" name="arrow-right" class="understanding-complete-mark" />
      <h3 ref="bookingComplete" :tabindex="good ? -1 : undefined">{{ good ? bookingChanged ? 'Appuntamento spostato' : 'Appuntamento confermato' : 'Ok' }}</h3>
      <p v-if="good" role="status"><strong>{{ savedBookingSummary }}</strong></p>
    </div>
  </div>

  <form v-else-if="exampleId === 'moduli'" class="a11y-form a11y-understanding-form understanding-details-form" novalidate @submit.prevent="validateDate">
    <div class="understanding-form-heading"><h3>Dettagli dell’appuntamento</h3></div>
    <fieldset class="fieldset understanding-fields understanding-detail-fields">
      <div class="understanding-field">
        <label v-if="good" :for="fieldId('date')">Data dell’appuntamento</label>
        <input :id="fieldId('date')" ref="dateInput" v-model="formDate" class="input" :class="{ 'input-error': formError }" :placeholder="good ? undefined : 'Data'" :aria-invalid="good ? Boolean(formError) : undefined" :aria-describedby="good ? `${fieldId('date-help')}${formError ? ' ' + fieldId('date-error') : ''}` : undefined" />
        <p v-if="good" :id="fieldId('date-help')" class="a11y-small">GG/MM/AAAA · anno con quattro cifre.</p>
        <p v-if="formError" :id="fieldId('date-error')" :role="good ? 'alert' : undefined">{{ formError }}</p>
      </div>
      <div class="understanding-field">
        <label :for="fieldId('note')">Nota</label>
        <textarea :id="fieldId('note')" v-model="formNote" class="textarea understanding-note" rows="2"></textarea>
      </div>
    </fieldset>
    <div v-if="savedForm" :role="good ? 'status' : undefined" class="a11y-understanding-result understanding-saved-details">
      <p>Dati salvati · {{ dateInWords(savedForm.date) }}</p>
      <p>Nota: {{ savedForm.note || 'nessuna' }}</p>
    </div>
    <div class="understanding-form-action"><button type="submit" class="btn">Salva i dati</button></div>
  </form>

  <div v-else-if="exampleId === 'personalizzazione'" class="understanding-reading">
    <div v-if="good" class="understanding-reading-settings">
      <div class="a11y-reading-controls">
        <div class="understanding-size-controls">
          <button type="button" class="btn btn-outline" :disabled="readingSize <= 18" aria-label="Riduci il testo" @click="changeReadingSize(-2)">Testo −</button>
          <button type="button" class="btn btn-outline" :disabled="readingSize >= 28" aria-label="Ingrandisci il testo" @click="changeReadingSize(2)">Testo +</button>
        </div>
        <label class="a11y-check-row"><input v-model="highContrast" type="checkbox" class="checkbox" @change="readingWasReset = false" /><span>Più contrasto</span></label>
        <button type="button" class="btn btn-ghost" aria-label="Ripristina lettura" @click="resetReading">Ripristina</button>
      </div>
      <p class="a11y-small" role="status">Testo {{ readingSize }} px · contrasto {{ highContrast ? 'elevato' : 'standard' }}</p>
    </div>
    <div class="a11y-reader a11y-understanding-reader" :class="{ 'high-contrast': highContrast }" :style="{ '--reading-size': `${readingSize}px` }">
      <div class="understanding-library-heading">
        <AccessibilityServiceMedia kind="library" class="understanding-library-image" />
        <h3>Organizza la tua visita</h3>
      </div>
      <div v-if="!hoursOpen" class="understanding-library-copy">
        <p>La biblioteca è aperta dal lunedì al sabato.</p>
        <p>Controlla gli orari prima di partire.</p>
      </div>
      <div v-if="hoursOpen" :id="fieldId('hours')" class="a11y-understanding-hours">
        <div class="understanding-opening-period"><p><strong>Lunedì–venerdì</strong></p><p>9:00–19:00</p></div>
        <div class="understanding-opening-period"><p><strong>Sabato</strong></p><p>9:00–13:00</p></div>
        <div class="understanding-opening-period"><p><strong>Domenica</strong></p><p>chiusa</p></div>
      </div>
      <button type="button" class="btn" :aria-expanded="hoursOpen" :aria-controls="fieldId('hours')" @click="hoursOpen = !hoursOpen">{{ hoursOpen ? 'Chiudi orari' : 'Apri orari' }}</button>
    </div>
  </div>

  <form v-else-if="exampleId === 'lingua'" class="a11y-form a11y-understanding-form understanding-language-form" novalidate @submit.prevent="submitName">
    <div class="understanding-form-heading"><h3>Informazioni sui corsi</h3><p class="a11y-small">Come vuoi ricevere il messaggio?</p></div>
    <div class="understanding-field">
      <label :for="fieldId('name')">Nome completo</label>
      <input :id="fieldId('name')" ref="nameInput" v-model="fullName" class="input" :class="{ 'input-error': nameError }" autocomplete="name" :aria-invalid="good ? Boolean(nameError) : undefined" :aria-describedby="good && nameError ? fieldId('name-error') : undefined" />
      <p v-if="!good" class="a11y-small">Solo lettere A–Z, senza spazi.</p>
    </div>
    <p v-if="nameError" :id="fieldId('name-error')" :lang="good ? language : 'it'" :role="good ? 'alert' : undefined">{{ nameError }}</p>
    <div class="understanding-language-action">
      <div class="understanding-field">
        <label :for="fieldId('lang')">Lingua del messaggio</label>
        <select :id="fieldId('lang')" v-model="language" class="select"><option value="it">Italiano</option><option value="en">English</option></select>
      </div>
    </div>
    <p v-if="nameMessage" class="understanding-saved-details" :lang="good ? language : 'it'" :role="good ? 'status' : undefined">{{ nameMessage }}</p>
    <div class="understanding-form-action"><button type="submit" class="btn">Invia richiesta</button></div>
  </form>
</template>

<style scoped>
.understanding-booking, .understanding-reading { display: flex; flex: 1 1 0; flex-direction: column; gap: 20px; min-height: 0; }
.a11y-form.a11y-understanding-form { display: flex; flex: 1 1 0; flex-direction: column; gap: 20px; min-height: 0; }
.a11y-form.understanding-booking-form { gap: 24px; }
.understanding-form-heading { display: grid; gap: 8px; padding-bottom: 12px; border-bottom: 1px solid var(--cvedi-rule); }
.slidev-layout.default .a11y-demo .understanding-form-heading > h3 { margin: 0; }
.understanding-fields.fieldset { min-width: 0; padding: 0; margin: 0; border: 0; }
.understanding-fields .fieldset-legend { padding: 0 0 8px; color: var(--cvedi-ink); font: 600 18px/1.35 var(--cvedi-font-body); }
.understanding-field { display: grid; align-content: start; gap: 6px; min-width: 0; }
.understanding-detail-fields { display: grid; grid-template-columns: minmax(0, 1fr); align-items: start; gap: 20px; }
.understanding-date-time { display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); gap: 16px; }
.understanding-form-action { display: flex; flex: 0 0 auto; justify-content: flex-end; margin-top: auto; padding-top: 16px; border-top: 1px solid var(--cvedi-rule); }
.understanding-appointment { display: flex; align-items: center; gap: 16px; padding-block: 12px 20px; border-bottom: 1px solid var(--cvedi-rule); }
.understanding-appointment > svg { flex: 0 0 28px; width: 28px; height: 28px; color: var(--section-primary); }
.understanding-appointment > div { display: grid; gap: 2px; }
.a11y-understanding-result { display: grid; align-content: start; gap: 12px; }
.understanding-booking-result { display: flex; flex: 1 1 0; flex-direction: column; gap: 20px; min-height: 0; padding-top: 12px; }
.a11y-booking-summary { display: flex; align-items: center; gap: 16px; padding-block: 24px; font-variant-numeric: tabular-nums; }
.a11y-booking-summary > svg { flex: 0 0 28px; width: 28px; height: 28px; color: var(--section-primary); }
.understanding-booking-result .understanding-booking-actions { display: grid; grid-template-columns: auto minmax(0, 1fr); margin-top: auto; margin-bottom: 0; padding-top: 16px; border-top: 1px solid var(--cvedi-rule); }
.understanding-booking-complete { justify-content: center; padding-block: 24px; }
.understanding-complete-mark { width: 40px; height: 40px; color: var(--section-primary); }
.understanding-saved-details { display: grid; gap: 4px; padding-top: 12px; border-top: 1px solid var(--cvedi-rule); }
.a11y-understanding-result p, .understanding-saved-details, .a11y-understanding-form > p[role="alert"], .understanding-field > [role="alert"] { overflow-wrap: anywhere; }
.understanding-reading-settings { display: grid; flex: 0 0 auto; gap: 8px; padding-bottom: 12px; border-bottom: 1px solid var(--cvedi-rule); }
.understanding-reading-settings .a11y-reading-controls { justify-content: space-between; gap: 8px; }
.understanding-size-controls { display: flex; gap: 8px; }
.a11y-understanding-reader { display: flex; flex: 1 1 0; flex-direction: column; gap: 16px; min-height: 0; padding: 0; background: transparent; }
.a11y-understanding-reader.high-contrast { padding: 12px; background: var(--section-primary-deep); }
.a11y-understanding-reader.high-contrast :deep(h3), .a11y-understanding-reader.high-contrast :deep(strong) { color: inherit; }
.slidev-layout.default .a11y-demo .a11y-understanding-reader.high-contrast :deep(h3) { color: var(--cvedi-paper); }
.a11y-understanding-reader.high-contrast .btn:focus-visible { outline-color: var(--cvedi-paper); }
.slidev-layout.default .a11y-demo .a11y-understanding-reader > .btn { align-self: flex-start; margin: auto 0 0; }
.understanding-library-heading { display: grid; flex: 0 0 auto; grid-template-columns: 216px minmax(0, 1fr); align-items: center; gap: 24px; }
.understanding-library-image.a11y-service-media { height: 144px; overflow: visible; }
.understanding-library-image :deep(img) { width: 100%; height: 144px; object-fit: contain; }
.understanding-library-copy { display: grid; gap: 8px; }
.a11y-understanding-hours { display: grid; grid-template-columns: minmax(0, 1.4fr) repeat(2, minmax(0, 1fr)); align-items: start; gap: 8px; padding-top: 12px; border-top: 1px solid currentColor; }
.understanding-opening-period { display: grid; gap: 4px; min-width: 0; }
.understanding-opening-period strong { font-size: inherit; line-height: inherit; }
.understanding-language-action { display: grid; grid-template-columns: minmax(0, 1fr); gap: 16px; }
.slidev-layout.default .a11y-demo .understanding-note.textarea { width: 100%; min-width: 0; height: 88px; min-height: 88px; padding: 12px; border: 1px solid var(--section-primary); border-radius: 8px; background: var(--cvedi-paper); box-shadow: none; resize: none; caret-color: var(--section-primary); }
.understanding-note:focus-visible { outline: 3px solid var(--section-primary); outline-offset: 3px; }
@container (max-width: 400px) {
  .understanding-date-time, .understanding-booking-result .understanding-booking-actions { grid-template-columns: minmax(0, 1fr); }
  .understanding-library-heading { grid-template-columns: 144px minmax(0, 1fr); gap: 16px; }
  .understanding-library-image.a11y-service-media, .understanding-library-image :deep(img) { height: 96px; }
  .understanding-form-action > .btn, .understanding-language-action > .btn { width: 100%; }
}
</style>
