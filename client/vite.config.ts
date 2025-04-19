import dotenv from 'dotenv';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

dotenv.config()

export default defineConfig({
	plugins: [react()],
	server: {
		port: parseInt(process.env.CLIENT_PORT ?? '5173', 10),
	},
	preview: {
		port: parseInt(process.env.CLIENT_PORT ?? '5173', 10),
	},
})
