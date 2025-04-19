import L from 'leaflet'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { FaSync } from 'react-icons/fa'
import './App.css'
import { ISSNowResponseData } from './types'

type ISS_LOCATION_TYPE = [number, number] // [latitude, longitude]
const DEFAULT_LOCATION: ISS_LOCATION_TYPE = [0, 0]

const SERVER_URL = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:3000'

const issIcon = new L.Icon({
	iconUrl: '/iss.png',
	iconSize: [50, 50],
})

function App() {
	const [issLocation, setIssLocation] =
		useState<ISS_LOCATION_TYPE>(DEFAULT_LOCATION)
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
		const interval = setInterval(fetchIssLocation, 10000)

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
				{isIssLocated && <Marker position={issLocation} icon={issIcon} />}
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
