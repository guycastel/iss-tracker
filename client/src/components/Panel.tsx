import { FaSync } from 'react-icons/fa'
import { LocationStatus } from '../types'
import { DEFAULT_TIMESTAMP } from './ISSLocationView'
import './Panel.css'

interface PanelProps {
	readonly lastUpdateUnixTime: number
	readonly locationStatus: LocationStatus
	readonly fetchIssLocation: () => Promise<void>
}

function Panel({
	lastUpdateUnixTime,
	locationStatus,
	fetchIssLocation,
}: PanelProps) {
	let message = ''

	if (lastUpdateUnixTime != DEFAULT_TIMESTAMP) {
		const date = new Date(lastUpdateUnixTime * 1000)
		message = `Last Update: ${date.toLocaleDateString()} ${date.toLocaleTimeString()} (${Intl.DateTimeFormat().resolvedOptions().timeZone})`

		switch (locationStatus) {
			case LocationStatus.LOADING:
				message += ' - Refreshing...'
				break
			case LocationStatus.FAILURE:
				message += ' - ISS lost 😳 Displaying last known position'
				break
		}
	} else {
		// ISS never found
		switch (locationStatus) {
			case LocationStatus.PENDING:
				message = 'Initializing...'
				break
			case LocationStatus.LOADING:
				message = 'Locating ISS...'
				break
			case LocationStatus.FAILURE:
				message = 'Something went wrong 🫠'
				break
		}
	}

	return (
		<div className="panel-container">
			<button className="refresh-button" onClick={fetchIssLocation}>
				<FaSync />
			</button>
			<span>{message}</span>
		</div>
	)
}

export default Panel
