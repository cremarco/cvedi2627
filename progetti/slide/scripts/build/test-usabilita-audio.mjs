import { runLessonAudio } from './lesson-audio.mjs'

// Use the same voice, delivery and encoding as Griglie and Composizione.
await runLessonAudio({
  lessonSource: 'progetti/slide/assets/lezione-test-usabilita/manifest.json',
  settingsSource: 'progetti/slide/assets/booklet/lezione-griglie/audio-settings.json',
  directory: 'progetti/slide/assets/audio/lezione-test-usabilita/',
})
