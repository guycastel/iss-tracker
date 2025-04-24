import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { ISSLocation } from '../types'
import { DEFAULT_TIMESTAMP } from './ISSLocationView'
import NightOverlay from './NightOverlay'
import 'leaflet/dist/leaflet.css'
import './WorldMap.css'

interface WorldMapProps {
	readonly lastUpdateUnixTime: number
	readonly issLocation: ISSLocation
}

const issIcon = new L.Icon({
	iconUrl: '/iss.png',
	iconSize: [50, 50],
})

const MAX_BOUNDS: L.LatLngBoundsExpression = [
	[-90, -360],
	[90, 360],
]

function WorldMap({ lastUpdateUnixTime, issLocation }: WorldMapProps) {
	return (
		<MapContainer
			className="map-container"
			center={issLocation}
			zoom={2}
			minZoom={2}
			maxZoom={10}
			worldCopyJump={true}
			maxBounds={MAX_BOUNDS}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
			/>
			<NightOverlay />
			{lastUpdateUnixTime != DEFAULT_TIMESTAMP && (
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
