export default {
  server: {
    host: 'localhost',
    fs: {
      // Vite rejects ':' in the workspace path before checking fs.allow.
      // Bind to loopback so this local Slidev preview remains private.
      strict: !process.cwd().includes(':'),
    },
  },
}
