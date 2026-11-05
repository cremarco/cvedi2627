import { syncDirections } from '@slidev/client/state/storage.ts'

export default function setup() {
  // Slidev otherwise echoes received navigation back as a new viewer update.
  // Delayed echoes can move the presenter back to an earlier slide. Start each
  // page with the presenter in control, including after stale saved settings.
  syncDirections.value = {
    presenterSend: true,
    presenterReceive: false,
    viewerSend: false,
    viewerReceive: true,
  }
}
