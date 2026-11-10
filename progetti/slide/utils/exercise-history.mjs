/** Keep the static host's direct entries scoped to standalone exercise decks. */
export const isExerciseDeck = id => /^esercitazione-\d{2}$/.test(id || '')

export function exerciseHistoryPaths(slides) {
  const slidesPaths = [...new Set(slides.flatMap(slide => [String(slide.no), ...(slide.alias ? [slide.alias] : [])]))]
  return [...slidesPaths, ...slidesPaths.map(slide => `presenter/${slide}`), 'presenter', 'entry', 'overview', 'notes', 'notes-edit', 'print', 'presenter/print']
}

/** Migrate existing bookmarks before Slidev initializes its history router. */
export function exerciseHashRedirectScript(base) {
  return `(()=>{function redirect(){if(!location.hash.startsWith('#/'))return;const [route,query='']=location.hash.slice(2).split('?');if(!/^(?:(?:presenter|export)\\/)?[\\w-]*\\/?$/.test(route))return;const params=new URLSearchParams(location.search);for(const [key,value] of new URLSearchParams(query))params.set(key,value);const search=params.toString();location.replace(${JSON.stringify(base)}+route.replace(/\\/$/,'')+(route?'/':'')+(search?'?'+search:''))}addEventListener('hashchange',redirect);redirect()})()`
}

export const withExerciseHashRedirect = (html, base) => html.replace('<head>', `<head><script id="cvedi-exercise-history">${exerciseHashRedirectScript(base)}</script>`)
