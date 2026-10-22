import { publicationExtensions } from '../utils/publication.mjs'
import { lessonDeckExtensions } from '../utils/lesson-decks.mjs'

export default ({ mode, filepath }: { mode?: string; filepath: string }) => [
  ...publicationExtensions(mode),
  ...lessonDeckExtensions(process.env.CVEDI_DECK, filepath),
]
