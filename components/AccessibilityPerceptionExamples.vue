<script setup lang="ts">
import AcronymText from './AcronymText.vue'
import { computed, ref, useId } from 'vue'
import { demoProductImage, type AccessibilityDemoId } from '../data/accessibility-demos'
import { publicAsset } from '../utils/public-asset'
import AccessibilityLabControls from './AccessibilityLabControls.vue'

const props = defineProps<{ exampleId: AccessibilityDemoId; good: boolean; active: boolean; motionAllowed: boolean; reducedMotion: boolean }>()
const emit = defineEmits<{ insight: [text: string] }>()
const uid = useId()
const fieldId = (name: string) => `a11y-perception-${uid}-${name}`
const selectedTime = ref('')
const colorless = ref(false)
const checked = ref(false)
const preferenceSaved = ref<boolean>()
const width = ref(400)
const textScale = ref(100)
const bookingConfirmed = ref(false)
const hideImage = ref(true)
const productChosen = ref(false)
const productAlt = computed(() => props.good ? 'Zaino rosso con due tasche frontali con cerniera.' : 'foto_018.jpg')
const availability = computed(() => selectedTime.value === '10:00' ? '10:00 · Esaurito. Scegli 11:30.' : '11:30 · Disponibile per la prenotazione.')

function explainAvailability() {
  if (!selectedTime.value) {
    emit('insight', 'Scegli prima un orario: rendere grigio l’indicatore serve a confrontare come viene comunicata la disponibilità.')
    return
  }
  emit('insight', props.good
    ? `La disponibilità di ${selectedTime.value} è scritta in parole e resta comprensibile ${colorless.value ? 'anche quando l’indicatore diventa grigio' : 'senza interpretare il pallino'}.`
    : colorless.value
      ? 'Il pallino è ora grigio: il suo significato si perde perché lo stato non è scritto. Anche data e istruzione restano troppo tenui.'
      : 'Lo stato dell’orario scelto è affidato al pallino: devi interpretarne il colore con la legenda. Data e istruzione sono difficili da leggere sul bianco.')
}

function selectTime(time: string) {
  selectedTime.value = time
  explainAvailability()
}

function changePreference() {
  preferenceSaved.value = undefined
  emit('insight', props.good
    ? `Il bordo indica dove si trova il controllo; ${checked.value ? 'la spunta piena rende riconoscibile la selezione' : 'l’assenza della spunta rende riconoscibile la deselezione'}.`
    : 'La casella funziona, ma il bordo e la spunta quasi bianchi non permettono di riconoscerne facilmente lo stato.')
}

function savePreference() {
  preferenceSaved.value = checked.value
  emit('insight', props.good
    ? 'La preferenza è stata applicata e la spunta ti permetteva di controllare lo stato prima di salvare.'
    : 'Il salvataggio conferma la preferenza applicata; prima di salvare, però, la spunta tenue non aiutava a controllare la scelta.')
}

function explainReflow() {
  bookingConfirmed.value = false
  const changed = width.value === 320 || textScale.value === 200
  emit('insight', !changed
    ? 'La vista iniziale contiene tutto il riepilogo e il comando. Riduci l’area o ingrandisci solo il testo per provare il cambiamento.'
    : props.good
      ? textScale.value === 200
        ? 'Con il testo al 200% il comando si ridistribuisce: puoi ancora leggere data e ora e confermare.'
        : 'Nei 320 CSS px data, ora e comando restano interamente visibili: puoi ancora confermare.'
      : 'La riga mantiene la propria larghezza: una parte del riepilogo o del comando esce dall’area visibile.')
}

function changeWidth() {
  width.value = width.value === 400 ? 320 : 400
  explainReflow()
}

function changeTextScale() {
  textScale.value = textScale.value === 100 ? 200 : 100
  explainReflow()
}

function confirmBooking() {
  bookingConfirmed.value = true
  emit('insight', props.good
    ? 'Hai completato la stessa prenotazione anche quando il riepilogo cambia disposizione.'
    : width.value === 320 || textScale.value === 200
      ? 'Il comando esiste ancora, ma è tagliato: arrivarci con la tastiera non risolve la perdita di contenuto visibile.'
      : 'La prenotazione funziona alla larghezza iniziale; prova ora 320 CSS px o il testo al 200%.')
}

function toggleImage() {
  hideImage.value = !hideImage.value
  emit('insight', !hideImage.value
    ? 'La foto è ora visibile. Premi Prova senza foto per confrontare quali dettagli riesci a ricavare dal solo testo.'
    : props.good
      ? 'Senza la foto il testo comunica colore e numero delle tasche: hai le informazioni utili per confrontare il prodotto.'
      : 'Senza la foto resta un nome del file: non puoi capire colore o tasche e mancano i dettagli necessari alla scelta.')
}

function chooseProduct() {
  productChosen.value = true
  emit('insight', !hideImage.value
    ? 'Hai scelto usando la foto; confronta quali caratteristiche puoi verificare anche quando non è disponibile.'
    : props.good
      ? 'Hai selezionato il modello potendo verificare colore e tasche nel testo disponibile.'
      : 'La selezione è possibile, ma il nome del file non permette di verificare se il modello ha le caratteristiche cercate.')
}
</script>

<template>
  <div v-if="exampleId === 'contrasto-testo'" class="perception-appointment">
    <div class="perception-copy" :class="{ 'perception-faint-copy': !good }">
      <h3>Prenota il tuo appuntamento</h3>
      <div class="perception-appointment-summary"><p>14 ottobre</p><p>Consulenza online</p></div>
    </div>
    <div class="perception-appointment-task">
      <fieldset class="fieldset perception-slots">
        <legend class="fieldset-legend">Scegli un orario</legend>
        <div class="a11y-actions perception-times"><button v-for="time in ['10:00', '11:30']" :key="time" type="button" class="btn btn-outline perception-time" :aria-pressed="selectedTime === time" @click="selectTime(time)">{{ time }}</button></div>
      </fieldset>
      <div class="perception-availability" :class="{ 'perception-colorless': colorless }" :data-availability="selectedTime ? selectedTime === '10:00' ? 'unavailable' : 'available' : 'unselected'">
        <span v-if="selectedTime" class="perception-state-dot" :class="{ 'is-unavailable': selectedTime === '10:00' }" aria-hidden="true"></span>
        <p v-if="!selectedTime">Seleziona un orario.</p>
        <p v-else-if="good" role="status">{{ availability }}</p>
      </div>
    </div>
    <AccessibilityLabControls>
      <div class="perception-preview-tools">
        <label class="a11y-check-row perception-color-control"><input v-model="colorless" type="checkbox" class="checkbox" @change="explainAvailability" /><span>Rendi grigio l’indicatore di stato</span></label>
        <p class="a11y-small">Legenda: rosso esaurito · verde disponibile.</p>
      </div>
    </AccessibilityLabControls>
  </div>

  <form v-else-if="exampleId === 'contrasto-controlli'" class="perception-preference" @submit.prevent="savePreference">
    <h3>Promemoria appuntamento</h3>
    <dl class="perception-summary-row"><div><dt>Data</dt><dd>14 ottobre</dd></div><div><dt>Ora</dt><dd>10:00</dd></div></dl>
    <div class="perception-notification-setting">
      <label class="a11y-check-row"><input :id="fieldId('reminder')" v-model="checked" type="checkbox" class="checkbox" :class="{ 'perception-faint-checkbox': !good }" :aria-describedby="fieldId('reminder-recipient')" @change="changePreference" /><span>Ricordami l’appuntamento via email</span></label>
      <p :id="fieldId('reminder-recipient')" class="a11y-small">Destinataria: sara@example.test</p>
    </div>
    <div class="perception-form-actions"><button type="submit" class="btn">Salva preferenza</button>
      <p v-if="preferenceSaved !== undefined" role="status">{{ preferenceSaved ? 'Promemoria via email attivato.' : 'Promemoria via email disattivato.' }}</p>
    </div>
  </form>

  <div v-else-if="exampleId === 'adattamento'" class="perception-reflow">
    <h3>Conferma appuntamento</h3>
    <div class="a11y-viewport perception-reflow-viewport" :class="{ 'perception-rigid': !good }" :style="{ '--demo-width': `${width}px`, '--perception-text-scale': textScale / 100 }">
      <p class="a11y-small perception-review-label">Riepilogo della prenotazione</p>
      <div class="perception-booking-line">
        <p><span>14 ottobre</span><span>10:00</span></p>
        <button type="button" class="btn perception-confirm" @click="confirmBooking">Conferma</button>
      </div>
    </div>
    <p v-if="bookingConfirmed" role="status">Appuntamento confermato: 14 ottobre, 10:00.</p>
    <AccessibilityLabControls>
      <div class="perception-reflow-lab">
        <div class="a11y-actions perception-reflow-controls">
          <button type="button" class="btn btn-outline" :aria-label="width === 400 ? 'Restringi a 320 CSS px' : 'Ripristina 400 CSS px'" :aria-pressed="width === 320" @click="changeWidth"><span><AcronymText :text="width === 400 ? '320 CSS px' : '400 CSS px'" /></span></button>
          <button type="button" class="btn btn-outline" :aria-pressed="textScale === 200" @click="changeTextScale">{{ textScale === 100 ? 'Testo 200%' : 'Testo 100%' }}</button>
        </div>
        <p class="a11y-small"><AcronymText :text="`${width} CSS px · ${textScale}%.`" /></p>
      </div>
    </AccessibilityLabControls>
  </div>

  <div v-else-if="exampleId === 'immagini'" class="perception-product">
    <div class="perception-product-detail" :class="{ 'perception-product-without-photo': hideImage }">
      <div class="perception-product-copy">
        <div class="perception-product-identity"><h3>Zaino urbano</h3><p class="perception-product-price">€ 39,00</p></div>
        <p class="a11y-small">Modello 018 · collezione quotidiana</p>
      </div>
    </div>
    <div v-if="!hideImage" class="a11y-product-frame perception-product-frame"><img :src="publicAsset(demoProductImage)" :alt="productAlt" /></div>
    <div v-if="hideImage" class="perception-alt-frame"><p class="a11y-small">Foto non disponibile</p><p class="a11y-alt-preview">{{ productAlt }}</p></div>
    <div class="perception-product-actions"><button type="button" class="btn" :disabled="productChosen" @click="chooseProduct">Seleziona il modello</button>
      <p v-if="productChosen" role="status">Modello 018 selezionato.</p>
    </div>
    <AccessibilityLabControls>
      <div class="perception-product-preview perception-preview-tools">
        <button type="button" class="btn btn-outline" @click="toggleImage">{{ hideImage ? 'Mostra la foto' : 'Prova senza foto' }}</button>
        <p class="a11y-small">Puoi capire il colore e quante tasche ci sono davanti?</p>
      </div>
    </AccessibilityLabControls>
  </div>
</template>

<style scoped>
.perception-appointment, .perception-preference, .perception-reflow, .perception-product { display: flex; flex: 1 1 0; flex-direction: column; gap: 20px; min-width: 0; min-height: 0; }
.perception-copy { display: flex; flex-direction: column; gap: 20px; }
.slidev-layout.default .a11y-demo :is(.perception-copy, .perception-preference, .perception-reflow, .perception-product-identity, .perception-alt-frame) > h3 { margin: 0; }
.perception-appointment-summary { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 64px; padding: 16px; background: var(--cvedi-gray-50); border-bottom: 1px solid var(--cvedi-rule); }
.slidev-layout.default .a11y-demo .perception-appointment-summary > p { font-size: 18px; }
.slidev-layout.default .a11y-demo .perception-faint-copy :is(h3, p) { color: var(--cvedi-slate-300); }
.perception-appointment-task { display: flex; flex: 1 1 0; flex-direction: column; justify-content: center; gap: 16px; padding-block: 12px; min-height: 0; }
.perception-slots.fieldset { min-width: 0; margin: 0; padding: 0; border: 0; gap: 8px; }
.slidev-layout.default .a11y-demo .perception-slots > .fieldset-legend { padding: 0 0 8px; color: var(--cvedi-body); font: 600 18px/1.4 var(--cvedi-font-body); }
.slidev-layout.default .a11y-demo .perception-faint-copy + .perception-appointment-task .fieldset-legend { color: var(--cvedi-slate-300); }
.perception-times, .perception-reflow-controls { margin: 0; }
.perception-times { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.slidev-layout.default .a11y-demo .perception-time { width: 100%; min-height: 76px; font-variant-numeric: tabular-nums; }
.slidev-layout.default .a11y-demo .perception-time[aria-pressed="true"] { color: var(--cvedi-paper); background: var(--section-primary); }
.perception-availability { display: flex; align-items: center; gap: 12px; min-height: 64px; padding: 16px; background: var(--cvedi-gray-50); }
.perception-state-dot { flex: 0 0 22px; width: 22px; height: 22px; background: var(--cvedi-green-800); border-radius: 50%; }
.perception-state-dot.is-unavailable { background: var(--cvedi-red-800); }
.perception-colorless .perception-state-dot { background: var(--cvedi-gray-500); }
.perception-preview-tools, .perception-reflow-lab { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 12px; min-width: 0; }
.perception-product-preview { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 12px; }
.perception-summary-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; margin: 0; padding: 20px; background: var(--cvedi-gray-50); border-bottom: 1px solid var(--cvedi-rule); }
.perception-summary-row > div { display: flex; flex-direction: column; gap: 4px; }
.slidev-layout.default .a11y-demo .perception-summary-row dt { color: var(--cvedi-muted); font: 400 18px/1.35 var(--cvedi-font-body); }
.slidev-layout.default .a11y-demo .perception-summary-row dd { margin: 0; color: var(--cvedi-ink); font: 600 20px/1.35 var(--cvedi-font-body); font-variant-numeric: tabular-nums; }
.perception-notification-setting { display: flex; flex: 1 1 0; flex-direction: column; justify-content: center; gap: 8px; min-height: 88px; }
.perception-notification-setting .a11y-check-row { align-items: start; }
.perception-notification-setting > p { padding-left: 38px; }
.perception-form-actions, .perception-product-actions { display: flex; flex-direction: column; gap: 12px; min-height: 84px; padding-top: 16px; border-top: 1px solid var(--cvedi-rule); }
.perception-form-actions > .btn, .perception-product-actions > .btn { width: 100%; }
.slidev-layout.default .a11y-demo .perception-faint-checkbox { border-color: var(--cvedi-slate-200); }
.slidev-layout.default .a11y-demo .perception-faint-checkbox.checkbox:checked { color: var(--cvedi-slate-200); background-color: var(--cvedi-paper); }
.perception-reflow { gap: 16px; }
.perception-reflow-viewport { display: flex; flex: 1 1 0; flex-direction: column; justify-content: center; gap: 24px; min-height: 240px; margin: 0; padding: 16px; align-self: center; background: var(--cvedi-gray-50); border-radius: 8px; }
.perception-booking-line { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; min-width: 0; }
.perception-booking-line > p { display: flex; flex-wrap: wrap; gap: 4px 12px; min-width: 0; }
.slidev-layout.default .a11y-demo .perception-booking-line > p > span, .slidev-layout.default .a11y-demo .perception-confirm { font-size: calc(18px * var(--perception-text-scale)); }
.perception-rigid .perception-booking-line { width: max-content; min-width: 360px; flex-wrap: nowrap; }
.perception-rigid .perception-booking-line > p { flex-wrap: nowrap; white-space: nowrap; }
.perception-rigid .perception-confirm { flex: 0 0 auto; }
.perception-product-detail { min-width: 0; }
.perception-product-frame { flex: 1 1 0; width: 100%; min-height: 200px; height: 0; aspect-ratio: auto; align-self: stretch; }
.perception-product-frame img { object-fit: contain; object-position: center; }
.perception-product-copy { display: flex; flex-direction: column; gap: 8px; }
.perception-product-identity { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; }
.slidev-layout.default .a11y-demo .perception-product-price { color: var(--cvedi-ink); font-size: 26px; font-weight: 600; font-variant-numeric: tabular-nums; }
.perception-alt-frame { display: flex; flex: 1 1 0; flex-direction: column; justify-content: center; gap: 16px; min-width: 0; min-height: 200px; padding: 20px; background: var(--cvedi-gray-50); }
.perception-alt-frame > .a11y-alt-preview { min-height: 0; }
@media print {
  .perception-appointment-task { padding-block: 0; }
  .perception-copy { gap: 16px; }
  .perception-reflow-viewport { min-height: 220px; }
}
</style>
