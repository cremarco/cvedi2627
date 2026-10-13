<script setup lang="ts">
import { nextTick, onMounted, ref, useId } from 'vue'
import { demoProductImage, type AccessibilityDemoId } from '../data/accessibility-demos'
import { publicAsset } from '../utils/public-asset'
import AccessibilityServiceMedia from './AccessibilityServiceMedia.vue'
import AccessibilityLabControls from './AccessibilityLabControls.vue'

const props = defineProps<{ exampleId: AccessibilityDemoId; good: boolean; active: boolean; motionAllowed: boolean; reducedMotion: boolean }>()
const emit = defineEmits<{ insight: [message: string] }>()
const uid = useId()
const fieldId = (name: string) => `a11y-action-${uid}-${name}`
const message = ref('')
const email = ref('sara@example.test')
const emailInput = ref<HTMLInputElement>()
const course = ref('')
const menuOpen = ref(false)
const keyboardTrial = ref(false)
const cities = ref(['Roma', 'Milano', 'Torino'])
const draggedCity = ref('')
const expanded = ref(false)
const password = ref('')
const pasteBlocked = ref(false)
const semanticTrial = ref(false)
const semanticAnchor = ref<HTMLElement>()
const authenticated = ref(false)
const memberCourse = ref('')
const authHeading = ref<HTMLElement>()
const memberHeading = ref<HTMLElement>()
const authEmailInput = ref<HTMLInputElement>()

function startKeyboardTrial() {
  course.value = ''; menuOpen.value = false; message.value = ''
  keyboardTrial.value = true
  emailInput.value?.focus()
  emit('insight', 'La scelta del corso è stata azzerata per la prova. Il focus è su Email: premi Tab per raggiungere Corso.')
}

function focusCourse() {
  if (keyboardTrial.value) emit('insight', 'Tab ha raggiunto Corso. Scegli Design con le frecce, poi passa al pulsante Iscriviti.')
}

function focusRegistration() {
  if (!keyboardTrial.value) return
  emit('insight', props.good
    ? course.value ? `Il percorso ha incluso Corso: hai scelto ${course.value} e puoi inviare.` : 'Il menu è raggiungibile. Torna con Maiusc + Tab e scegli Design prima di inviare.'
    : 'Tab ha saltato Corso ed è arrivato a Iscriviti. Il menu risponde al mouse ma non entra nel percorso da tastiera.')
}

function submitCourse() {
  if (!course.value) {
    message.value = 'Iscrizione interrotta: manca il corso.'
    emit('insight', props.good
      ? 'Il corso non è ancora selezionato. Il menu può essere raggiunto e corretto con Maiusc + Tab.'
      : 'Senza mouse non puoi scegliere il corso: l’invio resta bloccato anche se l’email è valida.')
    return
  }
  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    message.value = 'Inserisci un’email valida, per esempio sara@example.test.'
    return
  }
  message.value = `Iscrizione a ${course.value} registrata per ${email.value}.`
  emit('insight', props.good
    ? `Hai completato la scelta di ${course.value} e l’iscrizione con controlli utilizzabili da tastiera.`
    : 'L’iscrizione funziona dopo la scelta con il mouse; il compito resta impossibile usando soltanto Tab e Invio.')
}

function cityResult() {
  const position = cities.value.indexOf('Milano') + 1
  message.value = `Ordine: ${cities.value.join(' → ')}.`
  emit('insight', props.good
    ? position === 1 ? 'Milano è al primo posto. I pulsanti consentono il riordino senza tenere premuto e trascinare.' : `Milano è in posizione ${position}. I pulsanti cambiano l’ordine con singole attivazioni, anche da tastiera.`
    : position === 1 ? 'Il trascinamento ha spostato Milano al primo posto. Non esiste un comando alternativo per chi non riesce a trascinare.' : `Milano è in posizione ${position}: l’unico modo per spostarla è tenere premuto e trascinare.`)
}

function moveCity(city: string, delta: number) {
  const from = cities.value.indexOf(city)
  const to = from + delta
  if (to < 0 || to >= cities.value.length) return
  const order = [...cities.value]
  order.splice(from, 1)
  order.splice(to, 0, city)
  cities.value = order
  cityResult()
}

function beginDrag(city: string, event: DragEvent) {
  if (props.good) return
  draggedCity.value = city
  if (event.dataTransfer) { event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('text/plain', city) }
}

function dropCity(target: string) {
  if (props.good || !draggedCity.value || target === draggedCity.value) return
  const order = cities.value.filter(city => city !== draggedCity.value)
  order.splice(order.indexOf(target), 0, draggedCity.value)
  cities.value = order
  draggedCity.value = ''
  cityResult()
}

function saveItinerary() {
  message.value = `Itinerario salvato: ${cities.value.join(' → ')}.`
  if (cities.value[0] !== 'Milano') {
    emit('insight', props.good
      ? `Milano è in posizione ${cities.value.indexOf('Milano') + 1}: usa Su fino al primo posto, poi salva di nuovo.`
      : 'L’ordine è stato salvato, ma Milano non è al primo posto. Senza trascinamento non puoi completare la prova di riordino.')
    return
  }
  emit('insight', props.good
    ? 'Il pulsante Su e il comando Salva completano lo stesso compito senza alcun gesto di trascinamento.'
    : 'Il risultato è corretto solo dopo un trascinamento: il servizio continua a escludere chi usa singole attivazioni.')
}

function semanticInsight() {
  emit('insight', props.good
    ? expanded.value
      ? 'I dettagli sono aperti: puoi leggere data e ora. Il pulsante comunica anche che il pannello è espanso.'
      : 'Inizia la prova con Tab: puoi raggiungere Dettagli consegna e aprire il pannello con Invio o Spazio.'
    : expanded.value
      ? 'Il clic del mouse apre i dettagli, ma il testo non è un pulsante: Tab continua a saltarlo e lo stato aperto non è comunicato.'
      : 'Inizia la prova con Tab: il testo che sembra un pulsante viene saltato e la consegna resta nascosta.')
}

function startSemanticTrial() {
  semanticTrial.value = true; expanded.value = false; message.value = ''
  semanticAnchor.value?.focus()
  emit('insight', 'Premi Tab una volta, poi Invio. Riesci ad aprire i dettagli prima di confermare la consegna?')
}
function toggleDetails() { expanded.value = !expanded.value; message.value = ''; semanticInsight() }
function focusDeliveryConfirmation() {
  if (!semanticTrial.value) return
  emit('insight', props.good
    ? expanded.value ? 'Hai aperto i dettagli con la tastiera. Ora puoi confermare data e ora di consegna.' : 'I dettagli sono ancora chiusi: torna con Maiusc + Tab e aprili prima di confermare.'
    : expanded.value ? 'I dettagli sono stati aperti con il mouse. Il comando continua a essere saltato da Tab.' : 'Tab ha saltato Dettagli consegna ed è arrivato direttamente a Conferma consegna: la data e l’ora restano nascoste.')
}
function confirmDelivery() {
  if (!expanded.value) {
    message.value = 'Apri i dettagli prima di confermare la consegna.'
    emit('insight', props.good ? 'Il pannello non è stato ancora aperto. Torna al pulsante Dettagli consegna e premi Invio.' : 'La conferma è bloccata: il comando per aprire i dettagli non è raggiungibile usando Tab.')
    return
  }
  message.value = 'Consegna confermata: 14 ottobre, 10:00.'
  emit('insight', props.good ? 'Hai aperto i dettagli e confermato la consegna con controlli raggiungibili da tastiera.' : 'La consegna si conferma dopo il clic del mouse; il comando continua a escludere il percorso con Tab.')
}

function simulatePaste() {
  if (!props.good) {
    pasteBlocked.value = true
    message.value = 'Incolla disabilitato. Trascrivi la password.'
    emit('insight', password.value
      ? 'La prova di incolla è stata rifiutata: il campo conserva il testo precedente e obbliga alla trascrizione.'
      : 'La prova di incolla è stata rifiutata: il campo rimane vuoto e obbliga a ricordare o trascrivere la password.')
    return
  }
  password.value = 'design-2026'
  pasteBlocked.value = false
  message.value = ''
  emit('insight', 'La password è stata inserita senza trascriverla. Puoi premere Accedi con lo stesso dato.')
}

function handlePaste(event: ClipboardEvent) {
  if (!props.good) { event.preventDefault(); simulatePaste(); return }
  pasteBlocked.value = false
  message.value = ''
  nextTick(() => emit('insight', 'Il campo accetta il normale incolla, senza richiedere la trascrizione della password.'))
}

function signIn() {
  if (email.value !== 'sara@example.test') { message.value = 'Account non trovato. Controlla l’email e riprova.'; return }
  if (password.value !== 'design-2026') {
    message.value = password.value ? 'Password non corretta. Controlla il dato e riprova.' : 'Accesso interrotto: la password è vuota.'
    emit('insight', !props.good && pasteBlocked.value
      ? 'Il dato giusto era disponibile, ma il blocco dell’incolla ha impedito di inserirlo: l’accesso si interrompe.'
      : 'Il servizio controlla il dato inserito: correggi la password dimostrativa e riprova.')
    return
  }
  authenticated.value = true
  memberCourse.value = ''
  message.value = 'Accesso riuscito.'
  nextTick(() => { if (props.active) authHeading.value?.focus() })
  emit('insight', props.good
    ? 'L’accesso accetta l’incolla: puoi usare un gestore di password senza trascrivere il dato.'
    : 'L’accesso riesce trascrivendo correttamente la password, ma il blocco dell’incolla continua a imporre uno sforzo evitabile.')
}

function openMemberCourse(value: string) {
  memberCourse.value = value
  nextTick(() => { if (props.active) memberHeading.value?.focus() })
}

function returnToCourses() {
  memberCourse.value = ''
  nextTick(() => { if (props.active) memberHeading.value?.focus() })
}

function signOut() {
  authenticated.value = false
  memberCourse.value = ''
  password.value = ''
  pasteBlocked.value = false
  message.value = ''
  nextTick(() => { if (props.active) authEmailInput.value?.focus() })
  emit('insight', 'L’uscita chiude l’area personale e svuota la password. La prova dell’accesso può ricominciare.')
}

onMounted(() => { if (props.exampleId === 'semantica') semanticInsight() })
</script>

<template>
  <div v-if="exampleId === 'tastiera'" class="action-enrollment">
    <div class="action-course-context">
      <div class="action-course-photo"><AccessibilityServiceMedia kind="course" compact /></div>
      <div><h3>Iscrizione ai laboratori</h3><p>Design e Comunicazione</p></div>
    </div>
    <AccessibilityLabControls>
      <button type="button" class="btn btn-outline a11y-trial-start" @click="startKeyboardTrial">Inizia dalla Email</button>
    </AccessibilityLabControls>
    <form class="a11y-form action-enrollment-form" novalidate @submit.prevent="submitCourse">
      <div class="action-field-grid">
        <div class="action-field">
          <label :for="fieldId('email')">Email</label>
          <input :id="fieldId('email')" ref="emailInput" v-model="email" type="email" class="input" autocomplete="email" />
        </div>
        <div class="action-field">
          <label :for="good ? fieldId('course') : undefined">Corso</label>
          <select v-if="good" :id="fieldId('course')" v-model="course" class="select" @focus="focusCourse">
            <option value="">Scegli il corso</option><option>Design</option><option>Comunicazione</option>
          </select>
          <div v-else class="a11y-mouse-select" @click="menuOpen = !menuOpen">
            {{ course || 'Scegli il corso' }}
            <div v-if="menuOpen" class="a11y-mouse-options">
              <div v-for="option in ['Design', 'Comunicazione']" :key="option" @click.stop="course = option; menuOpen = false">{{ option }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="action-form-submit">
        <button type="submit" class="btn" @focus="focusRegistration">Iscriviti</button>
        <p v-if="message" class="action-service-result" role="status">{{ message }}</p>
      </div>
    </form>
  </div>

  <div v-else-if="exampleId === 'puntamento'" class="action-itinerary">
    <div class="action-itinerary-heading"><h3>Il tuo itinerario</h3><span class="badge badge-outline">3 tappe</span></div>
    <ol class="list a11y-city-list action-route" aria-label="Ordine delle tappe">
      <li v-for="(city, index) in cities" :key="city" class="list-row" :draggable="!good" @dragstart="beginDrag(city, $event)" @dragend="draggedCity = ''" @dragover.prevent @drop.prevent="dropCity(city)">
        <span class="action-stop"><strong class="action-stop-number">{{ index + 1 }}.</strong><span>{{ city }}</span></span>
        <div v-if="good" class="a11y-actions">
          <button type="button" class="btn btn-outline" :disabled="index === 0" :aria-label="`Sposta ${city} su`" @click="moveCity(city, -1)">Su</button>
          <button type="button" class="btn btn-outline" :disabled="index === cities.length - 1" :aria-label="`Sposta ${city} giù`" @click="moveCity(city, 1)">Giù</button>
        </div>
        <span v-else class="a11y-drag-handle">Trascina</span>
      </li>
    </ol>
    <div class="action-itinerary-submit"><button type="button" class="btn" @click="saveItinerary">Salva l’itinerario</button>
      <p v-if="message" class="action-service-result" role="status">{{ message }}</p>
    </div>
  </div>

  <div v-else-if="exampleId === 'semantica'" class="action-order">
    <div ref="semanticAnchor" class="action-order-summary" tabindex="-1">
      <div class="a11y-product-frame action-order-product"><img :src="publicAsset(demoProductImage)" alt="Zaino rosso con due tasche frontali" /></div>
      <div class="action-order-copy"><h3>Ordine n. 204</h3><p>Zaino rosso</p><span class="badge badge-soft">Consegna programmata</span></div>
    </div>
    <AccessibilityLabControls><p class="a11y-small">Leggi data e ora senza mouse.</p><button type="button" class="btn btn-outline" @click="startSemanticTrial">Inizia la prova con Tab</button></AccessibilityLabControls>
    <div class="action-order-disclosure">
      <button v-if="good" type="button" class="btn btn-outline" :aria-expanded="expanded" :aria-controls="fieldId('details')" @click="toggleDetails">Dettagli consegna</button>
      <span v-else class="a11y-fake-link btn btn-outline" @click="toggleDetails">Dettagli consegna</span>
      <div v-show="expanded" :id="fieldId('details')" class="a11y-delivery action-order-delivery">
        <p>Consegna · 14 ottobre</p><p>Ora · 10:00</p>
      </div>
      <div class="action-order-confirmation"><button type="button" class="btn" @click="confirmDelivery" @focus="focusDeliveryConfirmation">Conferma consegna</button>
        <p v-if="message" class="action-service-result" role="status">{{ message }}</p>
      </div>
    </div>
  </div>

  <div v-else-if="exampleId === 'autenticazione'" class="action-account" :class="{ 'is-member': authenticated }">
    <div class="action-course-context action-account-context">
      <div class="action-course-photo"><AccessibilityServiceMedia kind="course" compact /></div>
      <div><h3 ref="authHeading" :tabindex="authenticated ? -1 : undefined">{{ authenticated ? 'Bentornata Sara' : 'Accedi ai tuoi laboratori' }}</h3><p>Iscrizioni e materiali del corso</p></div>
    </div>
    <div v-if="authenticated" class="action-member-area">
      <p role="status">{{ message }}</p>
      <p class="a11y-small">{{ email }}</p>
      <template v-if="!memberCourse">
        <h3 ref="memberHeading" tabindex="-1">I tuoi laboratori</h3>
        <ul class="list action-member-courses">
          <li v-for="value in ['Design', 'Comunicazione']" :key="value" class="list-row"><span>{{ value }}</span><button type="button" class="btn btn-outline" @click="openMemberCourse(value)">Apri {{ value }}</button></li>
        </ul>
      </template>
      <template v-else>
        <h3 ref="memberHeading" tabindex="-1">Laboratorio di {{ memberCourse }}</h3>
        <p>Accesso disponibile per Sara.</p>
        <button type="button" class="btn btn-outline" @click="returnToCourses">Torna ai laboratori</button>
      </template>
      <button type="button" class="btn btn-outline action-sign-out" @click="signOut">Esci</button>
    </div>
    <form v-else class="a11y-form action-account-form" novalidate @submit.prevent="signIn">
      <div class="action-field-grid">
        <div class="action-field">
          <label :for="fieldId('username')">Email</label>
          <input :id="fieldId('username')" ref="authEmailInput" v-model="email" class="input" type="email" name="username" :autocomplete="good ? 'username' : 'off'" @input="message = ''" />
        </div>
        <div class="action-field">
          <label :for="fieldId('password')">Password</label>
          <input :id="fieldId('password')" v-model="password" class="input" type="password" name="password" :autocomplete="good ? 'current-password' : 'off'" @paste="handlePaste" @input="pasteBlocked = false; message = ''" />
        </div>
      </div>
      <AccessibilityLabControls><p class="a11y-small">Password della prova: <strong>design-2026</strong></p>
        <button type="button" class="btn btn-outline" @click="simulatePaste">Simula l’incolla</button>
      </AccessibilityLabControls>
      <div class="action-form-submit"><button type="submit" class="btn">Accedi</button>
        <p v-if="message" class="action-service-result" role="status">{{ message }}</p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.action-enrollment, .action-itinerary, .action-order, .action-account { display: flex; flex: 1 1 0; flex-direction: column; gap: 20px; min-width: 0; min-height: 0; }
.action-course-context { display: grid; grid-template-columns: 192px minmax(0, 1fr); align-items: center; gap: 24px; min-width: 0; }
.action-course-photo { width: 192px; height: 144px; overflow: hidden; }
.slidev-layout.default .a11y-demo .action-course-photo :deep(.a11y-service-media) { height: 100%; }
.action-course-photo :deep(img) { width: 100%; height: 144px; object-fit: contain; object-position: center; }
.action-enrollment .action-course-context { grid-template-columns: 224px minmax(0, 1fr); }
.action-enrollment .action-course-photo { width: 224px; height: 168px; }
.action-enrollment .action-course-photo :deep(img) { height: 168px; }
.action-course-context h3, .action-itinerary-heading h3, .action-order-copy h3 { margin-bottom: 4px; }
.action-enrollment-form, .action-account-form { display: flex; flex: 1 1 0; flex-direction: column; gap: 20px; min-width: 0; min-height: 0; }
.action-field-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 16px; min-width: 0; }
.action-enrollment .action-field-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.action-field { display: grid; align-content: start; gap: 6px; min-width: 0; }
.action-field .a11y-mouse-select { display: flex; align-items: center; min-height: 44px; }
.action-form-submit, .action-itinerary-submit, .action-order-confirmation { display: flex; flex-direction: column; gap: 12px; min-height: 88px; }
.action-form-submit { margin-top: auto; }
.action-form-submit > .btn, .action-itinerary-submit > .btn, .action-order-confirmation > .btn { width: 100%; }
.action-itinerary-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.action-itinerary-heading .badge, .action-order-copy .badge { height: auto; min-height: 28px; padding: 2px 8px; border-color: var(--cvedi-rule); color: var(--cvedi-body); font-size: 18px; line-height: 1.35; }
.action-route { flex: 1 1 0; grid-template-rows: repeat(3, minmax(80px, 1fr)); gap: 0; min-height: 240px; }
.action-route li { position: relative; min-height: 80px; padding: 12px 0; border: 0; }
.action-route li:not(:last-child)::after { position: absolute; z-index: 0; top: calc(50% + 18px); bottom: calc(-50% + 18px); left: 18px; border-left: 1px solid var(--cvedi-rule); content: ''; }
.action-stop { display: flex; align-items: center; gap: 12px; }
.action-stop-number { position: relative; z-index: 1; display: grid; place-items: center; width: 36px; height: 36px; color: var(--section-primary); background: var(--cvedi-paper); border: 1px solid var(--section-primary); border-radius: 50%; font-variant-numeric: tabular-nums; }
.action-order-summary { display: grid; grid-template-columns: 176px minmax(0, 1fr); align-items: center; gap: 24px; min-height: 176px; padding-block: 0 16px; border-bottom: 1px solid var(--cvedi-rule); }
.action-order-product { width: 176px; height: 160px; aspect-ratio: auto; align-self: center; }
.action-order-copy { display: grid; gap: 8px; min-width: 0; }
.action-order-copy .badge { justify-self: start; background: var(--section-accent-soft); border-color: transparent; }
.action-order-disclosure { display: flex; flex: 1 1 0; flex-direction: column; align-items: stretch; gap: 16px; min-height: 0; }
.action-order-disclosure .a11y-fake-link { text-decoration: none; }
.action-order-delivery { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; margin-top: 0; padding: 12px 16px; background: var(--cvedi-gray-50); }
.action-order-confirmation { margin-top: auto; }
.action-account:not(.is-member) .action-course-photo, .action-account:not(.is-member) .action-course-photo :deep(img) { height: 128px; }
.action-account.is-member .action-course-context { grid-template-columns: 120px minmax(0, 1fr); }
.action-account.is-member .action-course-photo { width: 120px; height: 88px; }
.action-account.is-member .action-course-photo :deep(img) { height: 88px; }
.action-member-area { display: flex; flex: 1 1 0; flex-direction: column; gap: 12px; min-width: 0; min-height: 0; }
.action-member-area > .btn { align-self: start; }
.slidev-layout.default .a11y-demo .action-member-area > .action-sign-out { margin-top: auto; }
.action-member-courses { margin: 0; padding: 0; }
.action-member-courses .list-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 60px; padding: 8px 0; border-top: 1px solid var(--cvedi-rule); }
.action-service-result { padding-top: 8px; border-top: 1px solid var(--cvedi-rule); }
@media print {
  .action-enrollment, .action-itinerary, .action-account, .action-order { gap: 16px; }
  .action-course-photo, .action-course-photo :deep(img) { height: 128px; }
  .action-order-disclosure { gap: 12px; }
}
</style>
