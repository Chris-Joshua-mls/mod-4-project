import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/mod-4-project/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                info: resolve(__dirname, 'info.html'),
            }
        }
    }
})