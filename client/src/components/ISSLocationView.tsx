import { useEffect, useState } from 'react'
import { ISSNowResponseData, ISSLocation, LocationStatus } from '../types'
import WorldMap from './WorldMap'
import Panel from './Panel'

export const DEFAULT_TIMESTAMP: number = -1
const DEFAULT_LOCATION: ISSLocation = { lat: 0, lng: 0 }

const SERVER_URL: string =
	import.meta.env.VITE_SERVER_URL ?? 'http://localhost:3000'
const POLLING_INTERVAL: number = import.meta.env.VITE_POLLING_INTERVAL
	? parseInt(import.meta.env.VITE_POLLING_INTERVAL)
	: 10000

function ISSLocationView() {
	const [issLocation, setIssLocation] = useState<ISSLocation>(DEFAULT_LOCATION)
	const [lastUpdateUnixTime, setLastUpdateUnixTime] =
		useState<number>(DEFAULT_TIMESTAMP)
	const [locationStatus, setLocationStatus] = useState<LocationStatus>(
		LocationStatus.PENDING
	)

	const fetchIssLocation = async (): Promise<void> => {
		setLocationStatus(LocationStatus.LOADING)

		return fetch(`${SERVER_URL}/api/iss-location`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(
						`Response not OK: ${response.status} ${response.statusText}`
					)
				}
				return response.json()
			})
			.then((data: ISSNowResponseData) => {
				setLastUpdateUnixTime(data.timestamp)
				setIssLocation({
					lat: parseFloat(data.iss_position.latitude),
					lng: parseFloat(data.iss_position.longitude),
				})
				setLocationStatus(LocationStatus.SUCCESS)
			})
			.catch((error) => {
				console.error('Error fetching ISS location:', error)
				setLocationStatus(LocationStatus.FAILURE)
				// throw error // optional re-throw to maintain Promise rejection
			})
	}

	useEffect(() => {
		fetchIssLocation()
		const interval = setInterval(fetchIssLocation, POLLING_INTERVAL)

		return () => clearInterval(interval)
	}, [])

	return (
		<>
			<WorldMap
				issLocation={issLocation}
				lastUpdateUnixTime={lastUpdateUnixTime}
			/>
			<Panel
				lastUpdateUnixTime={lastUpdateUnixTime}
				locationStatus={locationStatus}
				fetchIssLocation={fetchIssLocation}
			/>
		</>
	)
}

export default ISSLocationView
