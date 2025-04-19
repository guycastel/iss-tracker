import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import fetch from 'node-fetch'
import { ISSNowResponseData } from './types'

dotenv.config()

const serverPort: string = process.env.SERVER_PORT ?? '3000'
const clientPort: string = process.env.CLIENT_PORT ?? '5173'
const enableAllOrigins: boolean = process.env.ENABLE_ALL_ORIGINS === 'true'
const allowedOrigins: string[] = [`http://localhost:${clientPort}`]

const POLLING_URL: string = 'http://api.open-notify.org/iss-now.json'

const app = express()

app.use(
	cors({
		origin: enableAllOrigins ? true : allowedOrigins,
	})
)

// Update the GET /iss-location endpoint to use ISSNowResponseData
app.get('/iss-location', async (req, res) => {
	try {
		const response = await fetch(POLLING_URL)
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

app.listen(serverPort, () => {
	console.log(`Server is running on http://localhost:${serverPort}`)
})
