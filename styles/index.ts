import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'
import '@fontsource/merriweather/latin-400.css'
import '@fontsource/merriweather/latin-300-italic.css'
import '@fontsource/merriweather/latin-700.css'

import './daisy-built.css'
import './tokens.css'
import './slides.css'
import './components.css'
import './booklet.css'
import './lessons.css'
import './compositions.css'
import './ux-examples.css'
import './ux-process.css'
import './grades.css'
import './motion.css'
import './published.css'

// A production build can also be previewed locally. Hide only on online hosts.
if (typeof window !== 'undefined') {
  const hostname = window.location.hostname.toLowerCase()
  const localHost = hostname === 'localhost'
    || hostname.endsWith('.localhost')
    || hostname.endsWith('.local')
    || hostname === '[::1]'
    || hostname === '::1'
    || hostname === '0.0.0.0'
    || /^127\./.test(hostname)
    || /^10\./.test(hostname)
    || /^192\.168\./.test(hostname)
    || /^172\.(1[6-9]|2\d|3[01])\./.test(hostname)

  document.documentElement.classList.toggle('cvedi-published', import.meta.env.PROD && !localHost)
}
