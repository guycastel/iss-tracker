import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { ISSLocation } from '../types'
import 'leaflet/dist/leaflet.css'
import './WorldMap.css'

interface WorldMapProps {
	readonly isIssLocated: boolean
	readonly issLocation: ISSLocation
}

const issIcon = new L.Icon({
	iconUrl: '/iss.png',
	iconSize: [50, 50],
})

function WorldMap({ isIssLocated, issLocation }: WorldMapProps) {
	return (
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
						<b>lat</b>: {issLocation.lat} <br />
						<b>lng</b>: {issLocation.lng}
					</Popup>
				</Marker>
			)}
		</MapContainer>
	)
}

export default WorldMap
