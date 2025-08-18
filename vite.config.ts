/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	test: {
		environment: 'happy-dom',
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
