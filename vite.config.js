import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

export default defineConfig({
  plugins: [react()],
  // Vite's cache dir lives under node_modules by default, which sits inside
  // Dropbox here — the sync client locks files mid-write and causes EBUSY
  // errors on Windows. Keeping the cache outside the synced tree avoids that.
  cacheDir: join(tmpdir(), 'vite-cache-secureagents')
})
