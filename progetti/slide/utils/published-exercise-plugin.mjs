import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { nativeExamples } from '../data/esercitazioni/native-examples.mjs'

/** Publish only examples actually used by the authorized exercise. */
export function publishedExercisePlugin(slideRoot) {
  const nativeFile = path.join(slideRoot, 'data/esercitazioni/native-examples.mjs')
  const frameworkFile = path.join(slideRoot, 'data/esercitazioni/framework-curriculum.mjs')
  return {
    name: 'cvedi-published-exercise-examples', apply: 'build', enforce: 'pre',
    async load(id) {
      const file = id.split('?')[0]
      if (file === frameworkFile) return 'export const examples = {}'
      if (file !== nativeFile) return
      const slides = JSON.parse(await readFile(path.join(slideRoot, 'data/esercitazioni/01.json'), 'utf8'))
      const selected = {}
      function collect(value) {
        if (typeof value === 'string' && Object.hasOwn(nativeExamples, value)) selected[value] = nativeExamples[value]
        else if (Array.isArray(value)) value.forEach(collect)
        else if (value && typeof value === 'object') Object.values(value).forEach(collect)
      }
      collect(slides)
      return `export const nativeExamples = ${JSON.stringify(selected)};\nexport { renderNativeDocument } from './native-document.mjs';`
    },
  }
}
