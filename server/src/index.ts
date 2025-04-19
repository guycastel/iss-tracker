import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { initContract } from '@ts-rest/core';
import { createExpressEndpoints, initServer } from '@ts-rest/express';
import { z } from 'zod';

dotenv.config()

const app = express()
const port = 3000

const clientPort = process.env.CLIENT_PORT ?? '5173'
const enableAllOrigins = process.env.ENABLE_ALL_ORIGINS === 'true'
const allowedOrigins = [`http://localhost:${clientPort}`]

app.use(
	cors({
		origin: enableAllOrigins ? true : allowedOrigins,
	})
)

// Define the ts-rest contract
const c = initContract()
export const contract = c.router({
	getIssLocation: {
		method: 'GET',
		path: '/iss-location',
		responses: {
			200: z.object({
				message: z.string(),
				timestamp: z.number(),
				iss_position: z.object({
					latitude: z.string(),
					longitude: z.string(),
				}),
			}),
		},
	},
})

// Initial ISS location data
let issLocation = {
	message: 'success',
	timestamp: Date.now(),
	iss_position: {
		latitude: '0.0',
		longitude: '0.0',
	},
}

// Fetch ISS location every 10 seconds
setInterval(async () => {
	try {
		const response = await fetch('http://api.open-notify.org/iss-now.json')
		if (response.ok) {
			issLocation = await response.json()
		}
	} catch (error) {
		console.error('Error fetching ISS location:', error)
	}
}, 10000)

// Initialize the server with the contract
const s = initServer()
const router = s.router(contract, {
	getIssLocation: async () => ({
		status: 200,
		body: issLocation,
	}),
})

// Create endpoints
createExpressEndpoints(contract, router, app)

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})
