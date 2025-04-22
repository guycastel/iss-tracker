import { useEffect, useState } from 'react'
import { ISSNowResponseData, ISSLocation } from '../types'
import WorldMap from './WorldMap'
import Panel from './Panel'

const DEFAULT_LOCATION: ISSLocation = { lat: 0, lng: 0 }

const SERVER_URL: string =
	import.meta.env.VITE_SERVER_URL ?? 'http://localhost:3000'
const POLLING_INTERVAL: number = import.meta.env.VITE_POLLING_INTERVAL
	? parseInt(import.meta.env.VITE_POLLING_INTERVAL)
	: 10000

function ISSLocationView() {
	const [issLocation, setIssLocation] = useState<ISSLocation>(DEFAULT_LOCATION)
	const [lastUpdateUnixTime, setLastUpdateUnixTime] = useState<number>(0)
	const [isIssLocated, setIsIssLocated] = useState<boolean>(false)

	const fetchIssLocation = async () => {
		try {
			const response = await fetch(`${SERVER_URL}/api/iss-location`)
			if (response.ok) {
				const data: ISSNowResponseData = await response.json()
				setLastUpdateUnixTime(data.timestamp)
				setIssLocation({
					lat: parseFloat(data.iss_position.latitude),
					lng: parseFloat(data.iss_position.longitude),
				})
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

	return (
		<>
			<WorldMap issLocation={issLocation} isIssLocated={isIssLocated} />
			<Panel
				lastUpdateUnixTime={lastUpdateUnixTime}
				isIssLocated={isIssLocated}
				fetchIssLocation={fetchIssLocation}
			/>
		</>
	)
}

export default ISSLocationView
