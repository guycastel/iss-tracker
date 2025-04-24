import L from 'leaflet'
import { useMap } from 'react-leaflet'
// @ts-expect-error: no type definition for leaflet.terminator
import Terminator from '@joergdietrich/leaflet.terminator'
import { useEffect } from 'react'

function NightOverlay() {
	const map = useMap()

	useEffect(() => {
		const terminator = new Terminator({ resolution: 2 })
		const overlay = L.layerGroup([terminator]).addTo(map)

		const updateTerminator = () => {
			terminator.setTime()
			map.invalidateSize()
		}

		const interval = setInterval(updateTerminator, 60000)
		window.addEventListener('resize', updateTerminator)
		updateTerminator()

		return () => {
			clearInterval(interval)
			window.removeEventListener('resize', updateTerminator)
			overlay.remove()
		}
	}, [map])

	return null
}

export default NightOverlay
