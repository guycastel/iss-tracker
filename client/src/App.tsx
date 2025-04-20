import L from 'leaflet'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { FaSync } from 'react-icons/fa'
import './App.css'
import { ISSNowResponseData } from './types'

type ISSLocation = [number, number] // [latitude, longitude]
const DEFAULT_LOCATION: ISSLocation = [0, 0]

const SERVER_URL = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:3000'
const POLLING_INTERVAL = import.meta.env.VITE_POLLING_INTERVAL
	? parseInt(import.meta.env.VITE_POLLING_INTERVAL)
	: 10000

const issIcon = new L.Icon({
	iconUrl: '/iss.png',
	iconSize: [50, 50],
})

function App() {
	const [issLocation, setIssLocation] = useState<ISSLocation>(DEFAULT_LOCATION)
	const [lastUpdateUnixTime, setLastUpdateUnixTime] = useState<number>(0)
	const [isIssLocated, setIsIssLocated] = useState<boolean>(false)

	const fetchIssLocation = async () => {
		try {
			const response = await fetch(`${SERVER_URL}/api/iss-location`)
			if (response.ok) {
				const data: ISSNowResponseData = await response.json()
				setLastUpdateUnixTime(data.timestamp)
				setIssLocation([
					parseFloat(data.iss_position.latitude),
					parseFloat(data.iss_position.longitude),
				])
				setIsIssLocated(true)
			} else {
				throw new Error(
					`Response not OK: ${response.status} ${response.statusText}`
				)
			}
		} catch (error) {
			console.error('Error fetching ISS location:', error)
		}
	}

	useEffect(() => {
		fetchIssLocation()
		const interval = setInterval(fetchIssLocation, POLLING_INTERVAL)

		return () => clearInterval(interval)
	}, [])

	let formattedLastUpdate = 'Locating ISS...'

	if (isIssLocated) {
		const date = new Date(lastUpdateUnixTime * 1000)
		formattedLastUpdate = `Last Update: ${date.toLocaleDateString()} ${date.toLocaleTimeString()} (${Intl.DateTimeFormat().resolvedOptions().timeZone})`
	}

	return (
		<div className="App">
			<MapContainer
				center={issLocation}
				zoom={2}
				style={{ height: '100vh', width: '100%' }}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
				/>
				{isIssLocated && (
					<Marker position={issLocation} icon={issIcon}>
						<Popup>
							<b>lat</b>: {issLocation[0]} <br />
							<b>lng</b>: {issLocation[1]}
						</Popup>
					</Marker>
				)}
			</MapContainer>
			<div className="info-container">
				<button className="refresh-button" onClick={fetchIssLocation}>
					<FaSync />
				</button>
				<span>{formattedLastUpdate}</span>
			</div>
		</div>
	)
}

export default App
