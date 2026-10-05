export default {
  resolve: {
    alias: {
      // Slidev installs Twoslash even without code blocks. Keep ordinary tooltips
      // without its incompatible FloatingVue Popper patch in this deck.
      '@shikijs/vitepress-twoslash/client': 'floating-vue',
    },
  },
  server: {
    host: 'localhost',
    fs: {
      // Vite rejects ':' in the workspace path before checking fs.allow.
      // Bind to loopback so this local Slidev preview remains private.
      strict: !process.cwd().includes(':'),
    },
  },
}
