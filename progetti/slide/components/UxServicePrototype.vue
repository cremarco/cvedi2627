<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from 'vue'
import { useSlidePlayback } from '../composables/useSlidePlayback'
import scenario from '../data/ux-service-prototype.json'
import wireframes from '../data/ux-wireframe-sequence.json'

type Stage = 'search' | 'results' | 'detail' | 'review' | 'pending' | 'confirmed' | 'conflict' | 'empty' | 'outside' | 'cancelled' | 'help' | 'visits' | 'declined'
type Version = 'v0' | 'v1' | 'v2' | 'v3'
type Appointment = { time: string; address: string; zone: string; professional: string }
const props = withDefaults(defineProps<{ version?: Version; startAt?: 'search' | 'results' | 'detail' | 'review' | 'pending' | 'confirmed' }>(), { version: 'v3' })
const { isPrinting } = useSlidePlayback()
const service = scenario.service
const screens = Object.fromEntries(wireframes.pairs.flatMap(pair => pair.screens.map(screen => [screen.id, screen])))
const initials = (name: string) => name.split(' ').map(part => part[0]).join('')
const prefix = 'ux-service-' + useId().replaceAll(':', '')
const root = ref<HTMLElement>()
const viewHeading = ref<HTMLElement>()
const addressInput = ref<HTMLInputElement>()
const stage = ref<Stage>('search')
const address = ref(service.address)
const zone = ref('centro')
const date = ref(service.date)
const period = ref('sera')
const selectedTime = ref(service.time)
const selectedProfessional = ref(service.professional)
const slotLost = ref(false)
const busy = ref(false)
const formError = ref('')
const announcement = ref('')
const booking = ref<Appointment | null>(null)
const hasRequest = ref(false)
const editing = ref(false)
const cancelRequested = ref(false)
const cancelledType = ref('Richiesta')
const rejectedChoices = ref<string[]>([])
let searchToken = 0
const revision = computed(() => scenario.versions.find(item => item.id === props.version)!)
const level = computed(() => Number(props.version.slice(1)))
const zoneLabel = computed(() => service.zones.find(item => item.value === zone.value)?.label ?? '')
const displayed = computed(() => stage.value === 'confirmed' && booking.value ? booking.value : {
  time: selectedTime.value, address: address.value, zone: zoneLabel.value, professional: selectedProfessional.value,
})
const hasClearStates = computed(() => level.value >= 2)
const resultOptions = computed(() => [
  { time: period.value === 'mattina' ? '09:00' : slotLost.value ? service.alternativeTime : service.time, professional: service.professional },
  { time: period.value === 'mattina' ? '10:30' : '21:45', professional: 'Luca Sala' },
].filter(option => !rejectedChoices.value.includes(option.professional + '|' + option.time)))
const progressIndex = computed(() => stage.value === 'search' || ['outside', 'empty'].includes(stage.value) ? 0 : stage.value === 'results' ? 1 : stage.value === 'detail' ? 2 : ['review', 'conflict'].includes(stage.value) ? 3 : 4)
const canLoseSlot = computed(() => ['results', 'detail', 'review'].includes(stage.value) && !slotLost.value && !busy.value)
const printSteps = computed(() => [
  ['Ricerca', 'Via Esempio 12 · Zona Centro · dopo le 20'],
  ['Scelta', 'Giulia Riva · 17 novembre 2026 · 20:30 · 45 minuti'],
  ['Riepilogo', 'Domicilio e totale di 60 €, spostamento incluso, prima dell’invio'],
  ['Esito', level.value === 3 ? 'Richiesta in attesa → accettata o non accettata' : level.value === 2 ? 'Richiesta in attesa → conferma del professionista' : '“Prenota” e “Prenotazione ricevuta” lasciano un’ambiguità'],
])

function snapshot(): Appointment {
  return { time: selectedTime.value, address: address.value.trim(), zone: zoneLabel.value, professional: selectedProfessional.value }
}
async function go(next: Stage, message = '') {
  searchToken++
  busy.value = false
  stage.value = next
  cancelRequested.value = false
  announcement.value = message
  await nextTick()
  viewHeading.value?.focus({ preventScroll: true })
}
function reset() {
  searchToken++
  address.value = service.address; zone.value = 'centro'; date.value = service.date; period.value = 'sera'
  selectedTime.value = service.time; selectedProfessional.value = service.professional
  slotLost.value = false; busy.value = false; formError.value = ''; announcement.value = ''
  editing.value = false; cancelRequested.value = false; cancelledType.value = 'Richiesta'
  rejectedChoices.value = []
  stage.value = props.startAt ?? (props.version === 'v0' ? 'results' : 'search')
  booking.value = stage.value === 'confirmed' ? snapshot() : null
  hasRequest.value = stage.value === 'pending'
}
watch(() => [props.version, props.startAt], reset, { immediate: true })
async function search() {
  if (busy.value) return
  formError.value = ''
  if (!address.value.trim()) {
    formError.value = 'Inserisci il domicilio della visita.'
    await nextTick(); addressInput.value?.focus(); return
  }
  const token = ++searchToken
  busy.value = true
  announcement.value = 'Ricerca delle disponibilità in corso.'
  await new Promise(resolve => setTimeout(resolve, 220))
  if (token !== searchToken) return
  busy.value = false
  if (zone.value === 'fuori') return go('outside', 'Il domicilio è fuori dalla zona coperta.')
  if (date.value !== service.date || (zone.value === 'nord' && period.value === 'sera')) return go('empty', 'Nessuna visita compatibile. I criteri sono conservati.')
  return go(resultOptions.value.length ? 'results' : 'empty', 'Disponibilità aggiornate. Ogni orario è una proposta da confermare.')
}
function choose(time: string, professional: string) {
  selectedTime.value = time
  selectedProfessional.value = professional
  go('detail')
}
function submitRequest() {
  if (slotLost.value && selectedTime.value === service.time) return go('conflict', 'L’orario non è più disponibile; i dati validi sono conservati.')
  hasRequest.value = true
  go('pending', 'Richiesta inviata nella simulazione. La visita non è ancora confermata.')
}
function confirmProfessional() {
  if (stage.value !== 'pending') return
  booking.value = snapshot(); editing.value = false; hasRequest.value = false
  go('confirmed', 'Il professionista ha accettato. La visita è confermata.')
}
function rejectProfessional() {
  if (stage.value !== 'pending' || level.value !== 3) return
  rejectedChoices.value.push(selectedProfessional.value + '|' + selectedTime.value)
  hasRequest.value = false
  go('declined', editing.value && booking.value
    ? 'Il nuovo orario non è stato accettato. La visita precedente rimane confermata.'
    : 'Il professionista non ha accettato la richiesta. I criteri di ricerca sono conservati.')
}
function loseSlot() {
  if (!canLoseSlot.value) return
  slotLost.value = true
  if (level.value < 3) {
    address.value = ''; zone.value = 'centro'; date.value = service.date
    go('conflict', 'Questa bozza non conserva ancora i dati dopo il conflitto.')
  } else go('conflict', 'L’orario non è più disponibile. Domicilio, giorno e fascia sono conservati.')
}
function alternative() {
  selectedTime.value = service.alternativeTime; selectedProfessional.value = service.professional
  go('review', 'Nuovo orario selezionato; il domicilio è rimasto invariato.')
}
function editBooking() {
  if (!booking.value) return
  address.value = booking.value.address; selectedTime.value = booking.value.time
  editing.value = true
  go('search', 'Modifica avviata. La visita precedente rimane confermata fino alla nuova accettazione.')
}
function cancelEditing() {
  editing.value = false; hasRequest.value = false
  if (booking.value) {
    selectedTime.value = booking.value.time; address.value = booking.value.address
    zone.value = service.zones.find(item => item.label === booking.value?.zone)?.value ?? 'centro'
  }
  go('confirmed', 'Modifica abbandonata. La visita precedente rimane confermata.')
}
function openVisits() {
  if (hasRequest.value) return go('pending')
  if (booking.value) return cancelEditing()
  go('visits')
}
function cancel() {
  if (!cancelRequested.value) { cancelRequested.value = true; return }
  if (editing.value && booking.value) return cancelEditing()
  cancelledType.value = stage.value === 'confirmed' ? 'Visita' : 'Richiesta'
  booking.value = null; editing.value = false; hasRequest.value = false
  go('cancelled', `${cancelledType.value} annullata nella simulazione.`)
}
function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    ;(event.target as HTMLElement)?.blur()
    event.stopPropagation(); return
  }
  if ((event.target as HTMLElement)?.closest('input, select, button, a, [tabindex]') &&
    ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown', ' ', 'Enter'].includes(event.key)) event.stopPropagation()
}
</script>

<template>
  <section ref="root" class="ux-service-prototype" :class="{ 'is-printing': isPrinting }" data-testid="ux-service-prototype" :data-version="version" :data-stage="stage" @keydown="onKey" @keyup.stop>
    <aside class="prototype-teaching">
      <div>
        <h2>{{ revision.title }}</h2>
        <p>{{ revision.change }}</p>
        <p class="prototype-question">{{ revision.limit }}</p>
      </div>
      <div class="prototype-controls" aria-label="Controlli del prototipo">
        <div v-if="level === 3" class="prototype-response" role="group" aria-label="Risposta del professionista">
          <span class="prototype-response-label" aria-hidden="true">Risposta del professionista</span>
          <div><button class="btn prototype-control" type="button" data-testid="simulate-confirm" aria-label="Simula conferma del professionista" :disabled="stage !== 'pending'" @click="confirmProfessional">Accetta</button><button class="btn prototype-control" type="button" data-testid="simulate-reject" aria-label="Simula rifiuto del professionista" :disabled="stage !== 'pending'" @click="rejectProfessional">Non accetta</button></div>
        </div>
        <button v-else class="btn prototype-control" type="button" data-testid="simulate-confirm" :disabled="stage !== 'pending'" @click="confirmProfessional">Simula conferma del professionista</button>
        <button class="btn prototype-control" type="button" data-testid="simulate-conflict" :disabled="!canLoseSlot" @click="loseSlot">Simula orario non più disponibile</button>
        <button class="btn prototype-control" type="button" data-testid="prototype-reset" @click="reset">Ricomincia</button>
      </div>
    </aside>

    <div class="prototype-app" :class="{ 'prototype-wireframe': level === 0 }">
      <header class="prototype-header"><strong>{{ service.name }}</strong><button class="btn prototype-visits" type="button" data-testid="service-visits" @click="openVisits">Le mie visite</button></header>
      <ol class="sr-only" aria-label="Percorso della richiesta">
        <li v-for="(label, index) in ['Cerca', 'Risultati', 'Dettaglio', 'Riepilogo', 'Esito']" :key="label" :aria-current="index === progressIndex ? 'step' : undefined">{{ label }}</li>
      </ol>
      <div class="prototype-screen">
        <template v-if="stage === 'search'">
          <h3 ref="viewHeading" tabindex="-1">{{ editing ? 'Scegli un nuovo orario' : screens.ricerca.title }}</h3>
          <p v-if="editing && !formError" class="prototype-edit-note">La visita delle {{ booking?.time }} resta confermata fino alla nuova accettazione.</p>
          <form class="prototype-search" :aria-busy="busy" @submit.prevent="search">
            <label :for="prefix + '-address'" class="prototype-field address-field"><span>Domicilio</span><input :id="prefix + '-address'" ref="addressInput" v-model="address" class="input" autocomplete="off" :aria-invalid="!!formError" :aria-describedby="formError ? prefix + '-error' : undefined" data-testid="service-address" /></label>
            <label :for="prefix + '-zone'" class="prototype-field"><span>Zona del servizio</span><select :id="prefix + '-zone'" v-model="zone" class="select" data-testid="service-zone"><option v-for="item in service.zones" :key="item.value" :value="item.value">{{ item.label }}</option></select></label>
            <label :for="prefix + '-date'" class="prototype-field"><span>Giorno</span><select :id="prefix + '-date'" v-model="date" class="select" data-testid="service-date"><option :value="service.date">Martedì 17 novembre</option><option value="2026-11-18">Mercoledì 18 novembre</option></select></label>
            <label :for="prefix + '-period'" class="prototype-field"><span>Fascia oraria</span><select :id="prefix + '-period'" v-model="period" class="select" data-testid="service-period"><option value="sera">Dopo le 20</option><option value="mattina">Mattina</option></select></label>
            <p v-if="formError" :id="prefix + '-error'" class="prototype-field-error" role="alert">{{ formError }}</p>
            <div class="prototype-actions search-actions"><button class="btn prototype-primary" type="submit" :disabled="busy" data-testid="service-search">{{ busy ? 'Ricerca in corso…' : 'Cerca disponibilità' }}</button><button v-if="editing" class="btn prototype-secondary" type="button" @click="cancelEditing">Mantieni la visita</button></div>
          </form>
        </template>

        <template v-else-if="stage === 'results'">
          <h3 ref="viewHeading" tabindex="-1">{{ screens.risultati.title }}</h3>
          <p v-if="level > 0" class="prototype-search-summary">{{ zoneLabel }} · {{ service.shortDate }} · {{ period === 'sera' ? 'dopo le 20' : 'mattina' }}</p>
          <div class="prototype-results" role="list" aria-label="Visite proposte">
            <div v-for="(option, index) in resultOptions" :key="option.professional + option.time" class="card prototype-result" role="listitem">
              <div class="card-body">
                <div class="prototype-result-person"><div class="avatar avatar-placeholder prototype-avatar" aria-hidden="true"><div><span>{{ initials(option.professional) }}</span></div></div><div><strong>{{ option.professional }}</strong><p v-if="level > 0">A domicilio · {{ service.durationMinutes }} minuti</p></div></div>
                <p class="prototype-result-time">{{ option.time }}<span v-if="level === 0"> · {{ service.durationMinutes }} minuti</span></p>
                <strong v-if="level > 0" class="prototype-price">Totale {{ service.priceLabel }}<span>Spostamento incluso</span></strong>
                <button class="btn prototype-primary" type="button" :data-testid="'service-choose-' + index" :aria-label="`${level === 0 ? 'Vedi profilo di' : 'Scegli visita con'} ${option.professional} alle ${option.time}`" @click="choose(option.time, option.professional)">{{ level === 0 ? 'Vedi profilo' : screens.risultati.primary }}</button>
              </div>
            </div>
          </div>
          <div class="prototype-result-footer"><p v-if="hasClearStates" class="prototype-footnote">Orari proposti: conferma dopo l’invio.</p><button class="btn prototype-back" type="button" data-testid="service-edit-search" @click="go('search')">Modifica la ricerca</button></div>
        </template>

        <template v-else-if="['detail', 'review', 'pending', 'confirmed'].includes(stage)">
          <h3 ref="viewHeading" tabindex="-1" data-testid="service-state-heading">{{ stage === 'detail' ? screens.dettaglio.title : stage === 'review' ? screens.riepilogo.title : stage === 'confirmed' ? screens.conferma.title : hasClearStates ? screens.attesa.title : 'Prenotazione ricevuta' }}</h3>
          <dl class="prototype-summary">
            <div><dt>Professionista</dt><dd>{{ displayed.professional }}</dd></div><div><dt>Giorno e orario</dt><dd>{{ service.dateLabel }} · {{ displayed.time }}</dd></div>
            <div><dt>Domicilio</dt><dd>{{ displayed.address }}</dd></div><div><dt>Durata e totale</dt><dd>{{ service.durationMinutes }} minuti · <strong>{{ service.priceLabel }}</strong><span class="prototype-travel">Spostamento incluso</span></dd></div>
          </dl>
          <p v-if="stage === 'review' && hasClearStates" class="prototype-state-note">Invii una richiesta al professionista. La visita sarà confermata dopo la sua accettazione.</p>
          <p v-else-if="stage === 'pending'" class="prototype-state-note" data-testid="service-pending-note">{{ hasClearStates ? 'La visita non è ancora confermata. Troverai qui l’esito della risposta.' : 'Ti contatteremo per i prossimi passi.' }}<span v-if="editing"> La visita precedente resta confermata.</span></p>
          <p v-else-if="stage === 'confirmed'" class="prototype-state-note confirmed-note">Il professionista ha accettato. Il riepilogo è disponibile in «Le mie visite».</p>
          <div v-if="stage === 'detail'" class="prototype-actions"><button class="btn prototype-primary" type="button" data-testid="service-continue" @click="go('review')">{{ screens.dettaglio.primary }}</button><button class="btn prototype-secondary" type="button" @click="go('results')">Torna ai risultati</button></div>
          <div v-else-if="stage === 'review'" class="prototype-actions"><button class="btn prototype-primary" type="button" data-testid="service-send" @click="submitRequest">{{ hasClearStates ? screens.riepilogo.primary : 'Prenota' }}</button><button class="btn prototype-secondary" type="button" data-testid="service-edit-data" @click="go('search')">{{ screens.riepilogo.secondary }}</button></div>
          <div v-else-if="stage === 'pending' && level < 3" class="prototype-actions"><button class="btn prototype-primary" type="button" @click="openVisits">{{ screens.attesa.primary }}</button></div>
          <div v-else-if="level === 3" class="prototype-actions" :class="{ 'cancel-actions': cancelRequested }">
            <template v-if="!cancelRequested"><button v-if="stage === 'confirmed'" class="btn prototype-secondary" type="button" data-testid="service-modify" @click="editBooking">Modifica visita</button><button class="btn prototype-back" type="button" data-testid="service-cancel" @click="cancel">{{ stage === 'confirmed' ? 'Annulla visita' : editing ? 'Mantieni la visita precedente' : 'Annulla richiesta' }}</button></template>
            <template v-else><span>Vuoi annullare?</span><button class="btn prototype-primary" type="button" data-testid="service-cancel-confirm" @click="cancel">Conferma annullamento</button><button class="btn prototype-back" type="button" @click="cancelRequested = false">Torna indietro</button></template>
          </div>
        </template>

        <template v-else-if="stage === 'conflict'">
          <h3 ref="viewHeading" tabindex="-1">Orario non più disponibile</h3>
          <p class="prototype-state-note">{{ level === 3 ? 'La visita delle 20:30 non è più disponibile. Domicilio, giorno e fascia sono conservati.' : 'Questa bozza richiede di ricominciare la ricerca.' }}</p>
          <template v-if="level === 3"><p class="prototype-saved" data-testid="service-saved-data">{{ address }} · {{ service.shortDate }} · dopo le 20</p><div class="prototype-result"><div><strong>{{ service.professional }}</strong><p>{{ service.alternativeTime }} · {{ service.durationMinutes }} minuti · {{ service.priceLabel }} totali</p></div><button class="btn prototype-primary" type="button" data-testid="service-alternative" @click="alternative">Scegli {{ service.alternativeTime }}</button></div></template>
          <button class="btn prototype-back" type="button" @click="go('search')">{{ level === 3 ? 'Modifica i criteri' : 'Riparti dalla ricerca' }}</button>
        </template>
        <template v-else-if="stage === 'declined'">
          <h3 ref="viewHeading" tabindex="-1">Il professionista non può accettare</h3>
          <p class="prototype-state-note">Questa richiesta non è stata confermata. Puoi cercare un’altra disponibilità conservando i criteri.</p>
          <p v-if="editing && booking" class="prototype-edit-note" data-testid="service-old-visit">La visita precedente delle {{ booking.time }} rimane confermata.</p>
          <p class="prototype-saved" data-testid="service-rejected-data">{{ address }} · {{ service.shortDate }} · {{ period === 'sera' ? 'dopo le 20' : 'mattina' }}</p>
          <div class="prototype-actions"><button class="btn prototype-primary" type="button" data-testid="service-rejected-alternatives" @click="go(resultOptions.length ? 'results' : 'empty')">Vedi altre disponibilità</button><button v-if="editing && booking" class="btn prototype-back" type="button" data-testid="service-keep-old" @click="cancelEditing">Mantieni la visita precedente</button></div>
        </template>

        <template v-else-if="stage === 'outside' || stage === 'empty'">
          <h3 ref="viewHeading" tabindex="-1">{{ stage === 'outside' ? 'Il domicilio è fuori copertura' : 'Nessuna visita compatibile' }}</h3>
          <p class="prototype-state-note">{{ stage === 'outside' ? 'Il servizio non raggiunge questa zona. Puoi verificare un altro domicilio o chiedere supporto.' : 'Non ci sono visite per questi criteri. Puoi cambiare giorno o fascia senza reinserire il domicilio.' }}</p>
          <p class="prototype-saved">{{ address }} · {{ date === service.date ? '17 novembre' : '18 novembre' }} · {{ period === 'sera' ? 'dopo le 20' : 'mattina' }}</p>
          <div class="prototype-actions"><button class="btn prototype-primary" type="button" data-testid="service-recover-search" @click="go('search')">Modifica la ricerca</button><button class="btn prototype-back" type="button" @click="go('help')">Chiedi assistenza</button></div>
        </template>

        <template v-else-if="stage === 'help'">
          <h3 ref="viewHeading" tabindex="-1">Assistenza prenotazioni</h3><p class="prototype-state-note">Puoi condividere questi criteri con chi gestisce il servizio per trovare un’alternativa.</p><p class="prototype-saved">{{ address }} · {{ zoneLabel }} · {{ period === 'sera' ? 'dopo le 20' : 'mattina' }}</p><p class="prototype-footnote">La richiesta di assistenza non viene inviata.</p><button class="btn prototype-primary" type="button" @click="go('search')">Riprendi la ricerca</button>
        </template>
        <template v-else-if="stage === 'cancelled'">
          <h3 ref="viewHeading" tabindex="-1">{{ cancelledType }} annullata</h3><p class="prototype-state-note">Non hai una visita attiva per questo orario. Puoi iniziare una nuova ricerca.</p><button class="btn prototype-primary" type="button" data-testid="service-new-search" @click="go('search')">Cerca un’altra visita</button>
        </template>
        <template v-else-if="stage === 'visits'">
          <h3 ref="viewHeading" tabindex="-1">Non hai visite o richieste attive</h3><p class="prototype-state-note">Qui ritroverai richieste, conferme e dettagli degli appuntamenti.</p><button class="btn prototype-primary" type="button" @click="go('search')">Cerca una visita</button>
        </template>
      </div>
    </div>
    <p class="prototype-simulation">Copertura dalla zona selezionata, senza geocodifica. Nessuna richiesta viene inviata.</p>
    <p class="sr-only" role="status" aria-live="polite" aria-atomic="true">{{ announcement }}</p>
    <div v-if="isPrinting" class="prototype-print">
      <h2>{{ revision.title }}</h2><p>{{ revision.change }}</p><dl><div v-for="[label, value] in printSteps" :key="label"><dt>{{ label }}</dt><dd>{{ value }}</dd></div></dl><p v-if="level === 3">Recuperi: nessun risultato, fuori copertura, alternativa alle 21:15, modifica e annullamento. La visita precedente resta valida finché il nuovo orario non è accettato.</p><p>{{ revision.limit }}</p><p class="prototype-print-limit">Copertura dalla zona selezionata, senza geocodifica. Nessuna richiesta viene inviata.</p>
    </div>
  </section>
</template>

<style scoped>
.ux-service-prototype { display: grid; grid-template-columns: 280px minmax(0, 1fr); grid-template-rows: 464px 24px; column-gap: 24px; row-gap: 8px; width: 100%; color: var(--theme-body); font: 400 20px/1.4 var(--theme-font); }
.prototype-teaching { display: flex; flex-direction: column; justify-content: space-between; gap: 16px; min-width: 0; }
.prototype-teaching h2 { margin: 0 0 12px; color: var(--section-primary-deep); font: 600 24px/1.35 var(--theme-font); }
.prototype-teaching p { margin: 0; font: 400 20px/1.4 var(--theme-font); }
.prototype-teaching .prototype-question { margin-top: 12px; }
.prototype-controls { display: grid; gap: 8px; }
.prototype-response { display: grid; gap: 4px; }
.prototype-response-label { font: 400 18px/1.3 var(--theme-font); }
.prototype-response > div { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.ux-service-prototype .btn { min-height: 44px; height: auto; margin: 0; padding: 8px 14px; border-radius: 12px; box-shadow: none; font: 600 20px/1.3 var(--theme-font); text-transform: none; white-space: normal; }
.ux-service-prototype .btn:focus-visible, .ux-service-prototype :is(.input, .select):focus-visible { outline: 3px solid var(--section-primary); outline-offset: 3px; }
.ux-service-prototype .btn:disabled { opacity: .5; cursor: default; }
.ux-service-prototype .prototype-control { width: 100%; justify-content: flex-start; border: 1px solid var(--slide-rule); background: transparent; color: var(--theme-body); text-align: left; font-size: 18px; }
.ux-service-prototype .prototype-control:not(:disabled):hover { background: color-mix(in oklch, var(--section-primary) 8%, white); color: var(--section-primary-deep); }
.prototype-app { --prototype-primary: var(--section-primary-deep); --prototype-soft: color-mix(in oklch, var(--section-primary) 8%, white); display: flex; flex-direction: column; min-width: 0; height: 464px; border: 1px solid var(--slide-rule); border-radius: 8px; background: white; overflow: hidden; }
.prototype-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex: 0 0 auto; min-height: 64px; padding: 8px 24px; border-bottom: 1px solid var(--slide-rule); background: white; }
.ux-service-prototype .prototype-header strong { color: var(--prototype-primary); font: 700 22px/1.25 var(--theme-font); }
.ux-service-prototype .prototype-visits { padding: 8px 0; border: 0; background: transparent; color: var(--prototype-primary); font-size: 20px; font-weight: 500; text-decoration: underline; text-underline-offset: 4px; }
.ux-service-prototype .prototype-visits:hover { color: var(--theme-ink); }
.prototype-screen { display: flex; flex-direction: column; flex: 1 1 0; min-height: 0; padding: 16px 24px; }
.prototype-screen h3 { margin: 0 0 12px; color: var(--theme-ink); font: 700 32px/1.2 var(--theme-font); }
.prototype-screen h3:focus { outline: none; }
.prototype-search { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: 16px; align-content: start; }
.prototype-field { display: flex; flex-direction: column; min-width: 0; gap: 4px; }
.prototype-field > span { color: var(--theme-body); font-size: 18px; line-height: 1.3; }
.ux-service-prototype :is(.input, .select) { width: 100%; min-width: 0; height: 48px; min-height: 48px; padding: 8px 12px; border: 1px solid var(--slide-rule); border-radius: 8px; background: white; color: var(--theme-ink); box-shadow: none; font: 400 20px/1.3 var(--theme-font); caret-color: var(--section-primary); }
.ux-service-prototype .select { padding-right: 32px; }
.prototype-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 12px; margin-top: 16px; }
.prototype-screen > .prototype-actions { margin-top: auto; padding-top: 12px; }
.prototype-actions > .prototype-primary { flex: 1 1 240px; }
.prototype-search .prototype-primary { width: 100%; }
.prototype-search .search-actions { grid-column: 1 / -1; margin-top: 2px; }
.ux-service-prototype .prototype-primary { border: 1px solid var(--prototype-primary); background: var(--prototype-primary); color: white; }
.ux-service-prototype .prototype-primary:hover { filter: brightness(.9); }
.ux-service-prototype .prototype-secondary { border: 1px solid var(--slide-rule); background: white; color: var(--prototype-primary); }
.ux-service-prototype .prototype-secondary:hover { background: color-mix(in oklch, var(--section-primary) 8%, white); }
.ux-service-prototype .prototype-back { border: 0; background: transparent; color: var(--prototype-primary); padding-inline: 0; text-decoration: underline; text-underline-offset: 4px; }
.prototype-field-error { grid-column: 1 / -1; margin: 0; color: var(--section-primary-deep); font-size: 18px; font-weight: 600; }
.prototype-search-summary, .prototype-state-note, .prototype-saved, .prototype-edit-note { margin: 0 0 12px; font: 400 20px/1.4 var(--theme-font); }
.prototype-edit-note { font-size: 18px; }
.prototype-results { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.prototype-result { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 10px 0; border-block-end: 1px solid var(--slide-rule); }
.prototype-result:first-child { padding-top: 8px; }
.prototype-result strong { color: var(--theme-ink); font-size: 22px; font-weight: 600; }
.prototype-result p { margin: 2px 0 0; font: 400 20px/1.4 var(--theme-font); }
.prototype-result .prototype-price { color: var(--theme-ink); font: 700 22px/1.2 var(--theme-font); }
.prototype-price span { display: block; color: var(--theme-body); font-size: 18px; font-weight: 400; }
.prototype-results > .prototype-result { display: flex; align-items: stretch; min-width: 0; min-height: 208px; padding: 0; border: 1px solid var(--slide-rule); border-radius: 8px; background: white; box-shadow: none; }
.prototype-result > .card-body { display: flex; flex-direction: column; gap: 8px; min-width: 0; padding: 16px; }
.prototype-result-person { display: flex; align-items: center; gap: 12px; }
.prototype-result-person > div:last-child { min-width: 0; }
.prototype-avatar > div { display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 50%; background: var(--prototype-soft); color: var(--prototype-primary); font: 700 18px/1 var(--theme-font); }
.prototype-result-person p { font-size: 20px; }
.ux-service-prototype .prototype-result-time { margin: 0; color: var(--theme-ink); font: 600 24px/1.25 var(--theme-font); }
.prototype-result-time span { font-size: 20px; font-weight: 400; }
.prototype-result > .card-body > .prototype-primary { width: 100%; margin-top: auto; border-radius: 8px; }
.prototype-result-footer { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: auto; padding-top: 12px; }
.prototype-result-footer .prototype-footnote { margin: 0; }
.prototype-result-footer .prototype-back { flex: none; }
.prototype-travel { display: block; color: var(--theme-body); font-size: 18px; }

.prototype-footnote { margin: 12px 0 4px; color: var(--theme-body); font: 400 18px/1.4 var(--theme-font); }
.prototype-summary { display: grid; gap: 8px; margin: 0 0 12px; }
.prototype-summary div { display: grid; grid-template-columns: 170px minmax(0, 1fr); align-items: baseline; gap: 16px; min-width: 0; }
.prototype-summary dt { margin: 0; color: var(--theme-body); font: 400 18px/1.4 var(--theme-font); }
.prototype-summary dd { margin: 0; color: var(--theme-ink); font: 400 20px/1.4 var(--theme-font); }
.prototype-state-note { max-width: 65ch; }
.confirmed-note { padding: 10px 12px; border-radius: 8px; background: var(--section-accent-soft); color: var(--theme-ink); }
.prototype-saved { padding: 10px 12px; background: var(--theme-bg); border-radius: 8px; }
.cancel-actions { gap: 8px; }
.cancel-actions > span { font-size: 18px; }
.prototype-wireframe { --prototype-primary: var(--theme-body); --prototype-soft: var(--theme-bg); }
.prototype-simulation { grid-column: 1 / -1; margin: 0; font: 400 18px/1.3 var(--theme-font); color: var(--theme-body); }
.prototype-print { display: none; }
.ux-service-prototype.is-printing { display: block; height: auto; }
.is-printing > .prototype-teaching, .is-printing > .prototype-app, .is-printing > .prototype-simulation { display: none; }
.is-printing > .prototype-print { display: block; font: 400 23px/1.45 var(--theme-font); }
.prototype-print h2 { margin: 0 0 12px; color: var(--section-primary-deep); font-size: 27px; }
.prototype-print p { margin: 0 0 16px; }
.prototype-print dl { display: grid; gap: 12px; margin: 20px 0; }
.prototype-print dl > div { display: grid; grid-template-columns: 150px minmax(0, 1fr); gap: 24px; }
.prototype-print dt { color: var(--section-primary-deep); font-weight: 600; }
.prototype-print dd { margin: 0; }
.prototype-print .prototype-print-limit { margin: 0; font-size: 18px; }
@media print {
  .prototype-teaching, .prototype-app, .prototype-simulation { display: none; }
  .ux-service-prototype { display: block; height: auto; }
  .prototype-print { display: block; font: 400 23px/1.45 var(--theme-font); }
  .prototype-print h2 { margin: 0 0 12px; color: var(--section-primary-deep); font-size: 27px; }
  .prototype-print p { margin: 0 0 16px; }
  .prototype-print dl { display: grid; gap: 12px; margin: 20px 0; }
  .prototype-print dl > div { display: grid; grid-template-columns: 150px minmax(0, 1fr); gap: 24px; }
  .prototype-print dt { color: var(--section-primary-deep); font-weight: 600; }
  .prototype-print dd { margin: 0; }
}
</style>
