import L from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css'

const issIcon = new L.Icon({
	iconUrl: '/iss.png',
	iconSize: [50, 50],
})

function App() {
	const [issLocation, setIssLocation] = useState({ latitude: 0, longitude: 0 })
	const [lastUpdate, setLastUpdate] = useState('')

	const fetchIssLocation = async () => {
		try {
			const response = await fetch('http://localhost:3000/iss-location')
			if (response.ok) {
				const data = await response.json()
				setIssLocation({
					latitude: parseFloat(data.iss_position.latitude),
					longitude: parseFloat(data.iss_position.longitude),
				})
				const date = new Date(data.timestamp * 1000)
				const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()} (${Intl.DateTimeFormat().resolvedOptions().timeZone})`
				setLastUpdate(formattedDate)
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

	return (
		<div className="App">
			<MapContainer
				center={[issLocation.latitude, issLocation.longitude]}
				zoom={2}
				style={{ height: '100vh', width: '100%' }}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
				/>
				<Marker
					position={[issLocation.latitude, issLocation.longitude]}
					icon={issIcon}
				/>
			</MapContainer>
			<div className="info-container">
				<span>Last Update: {lastUpdate}</span>
			</div>
		</div>
	)
}

export default App
