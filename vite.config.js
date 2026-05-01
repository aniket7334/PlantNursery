import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function trefleProxyPlugin(apiToken) {
  return {
    name: 'trefle-proxy',
    configureServer(server) {
      server.middlewares.use('/api/trefle/plants', async (req, res) => {
        if (!apiToken) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Missing VITE_TREFLE_API_KEY in .env' }))
          return
        }

        try {
          const requestUrl = new URL(req.url, 'http://localhost')
          const targetUrl = new URL('https://trefle.io/api/v1/plants')

          requestUrl.searchParams.forEach((value, key) => {
            targetUrl.searchParams.append(key, value)
          })

          targetUrl.searchParams.set('token', apiToken.trim())

          const response = await fetch(targetUrl)
          const body = await response.text()

          res.statusCode = response.status
          res.setHeader('Content-Type', 'application/json')
          res.end(body)
        } catch (error) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error: 'Failed to reach Trefle API',
              details: error instanceof Error ? error.message : 'Unknown error',
            }),
          )
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), trefleProxyPlugin(env.VITE_TREFLE_API_KEY)],
  }
})
