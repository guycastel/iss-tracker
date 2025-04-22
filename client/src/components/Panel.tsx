import { FaSync } from 'react-icons/fa'
import './Panel.css'

interface PanelProps {
	readonly lastUpdateUnixTime: number
	readonly isIssLocated: boolean
	readonly fetchIssLocation: () => Promise<void>
}

function Panel({
	lastUpdateUnixTime,
	isIssLocated,
	fetchIssLocation,
}: PanelProps) {
	let formattedLastUpdate = 'Locating ISS...'

	if (isIssLocated) {
		const date = new Date(lastUpdateUnixTime * 1000)
		formattedLastUpdate = `Last Update: ${date.toLocaleDateString()} ${date.toLocaleTimeString()} (${Intl.DateTimeFormat().resolvedOptions().timeZone})`
	}

	return (
		<div className="panel-container">
			<button className="refresh-button" onClick={fetchIssLocation}>
				<FaSync />
			</button>
			<span>{formattedLastUpdate}</span>
		</div>
	)
}

export default Panel
