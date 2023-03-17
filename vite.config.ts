import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const base = mode === 'github' ? '/theme-gallery/' : '/'
    return {
        base: base,
        plugins: [vue()],
        envDir: './config',
        build: {
            target: 'es2015',
            cssTarget: 'chrome61'
        }
    }
})
