import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import express from 'express'
import fetch from 'node-fetch'
import { ISSNowResponseData } from './types'

const ISS_NOW_API_URL: string = 'http://api.open-notify.org/iss-now.json'

const SERVER_PORT: string = process.env.SERVER_PORT ?? '3000'
const CLIENT_PORT: string = process.env.CLIENT_PORT ?? '5173'
const CORS_ENABLE_ALL_ORIGINS: boolean =
	(process.env.CORS_ENABLE_ALL_ORIGINS ?? '').toLowerCase() === 'true'

const allowedOrigins: string[] = CORS_ENABLE_ALL_ORIGINS
	? ['*']
	: [`http://localhost:${CLIENT_PORT}`]

const app = express()

app.use(
	cors({
		origin: CORS_ENABLE_ALL_ORIGINS ? true : allowedOrigins,
	})
)

app.get('/api/iss-location', async (req, res) => {
	try {
		const response = await fetch(ISS_NOW_API_URL)
		if (response.ok) {
			const data: ISSNowResponseData =
				(await response.json()) as ISSNowResponseData
			res.status(200).json(data)
		} else {
			throw new Error(
				`Response not OK: ${response.status} ${response.statusText}`
			)
		}
	} catch (error) {
		console.error('Error fetching ISS location:', error)
		res.status(500).send('Internal Server Error')
	}
})

app.listen(SERVER_PORT, () => {
	console.log(`Server is running on http://localhost:${SERVER_PORT}`)
})
