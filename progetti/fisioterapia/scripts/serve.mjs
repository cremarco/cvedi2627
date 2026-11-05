import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
const root=fileURLToPath(new URL('../',import.meta.url))
const port=Number(process.env.PASSO_PORT || 3045)
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'}
const server=createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)
  const file=pathname==='/'?'index.html':pathname.slice(1)
  const allowed=['index.html','app.js','favicon.svg'].includes(file)||/^(styles\/site\.css|data\/[a-z-]+\.mjs|assets\/images\/[a-z-]+\.webp|assets\/fonts\/[a-zA-Z0-9.-]+)$/.test(file)
  if(!allowed||file.includes('..')){res.writeHead(404);res.end('Pagina non trovata');return}
  const content=await readFile(path.join(root,file))
  res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'same-origin','X-Robots-Tag':'noindex, nofollow'})
  res.end(content)
 }catch{res.writeHead(404);res.end('Pagina non trovata')}
})
server.listen(port,'127.0.0.1',()=>console.log(`Passo: http://localhost:${port}/`))
process.on('SIGTERM',()=>server.close())
process.on('SIGINT',()=>server.close())
