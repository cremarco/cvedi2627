import { runLessonAudio } from './lesson-audio.mjs'

await runLessonAudio({
  lessonSource: 'progetti/slide/assets/booklet/lezione-griglie/manifest.json',
  settingsSource: 'progetti/slide/assets/booklet/lezione-griglie/audio-settings.json',
  directory: 'progetti/slide/assets/audio/lezione-griglie/',
})
