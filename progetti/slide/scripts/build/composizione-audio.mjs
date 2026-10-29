import { runLessonAudio } from './lesson-audio.mjs'

// Share the exact voice and settings used for Griglie e layout.
await runLessonAudio({
  lessonSource: 'progetti/slide/assets/booklet/lezione-composizione/manifest.json',
  settingsSource: 'progetti/slide/assets/booklet/lezione-griglie/audio-settings.json',
  directory: 'progetti/slide/assets/audio/lezione-composizione/',
})
