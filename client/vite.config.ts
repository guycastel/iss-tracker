import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd())

	return {
		plugins: [react()],
		server: {
			port: parseInt(env.VITE_CLIENT_PORT ?? '5173'),
		},
		preview: {
			port: parseInt(env.VITE_CLIENT_PORT ?? '5173'),
		},
	}
})
