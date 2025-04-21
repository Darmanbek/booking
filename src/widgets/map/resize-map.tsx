import { type FC } from "react"
import { useMap } from "react-leaflet"
import { useDebounceEffect } from "src/shared/hooks"

interface ResizeMapProps {
	open: boolean
}

const ResizeMap: FC<ResizeMapProps> = ({ open }) => {
	const map = useMap()

	useDebounceEffect(() => {
		if (open) {
			map.invalidateSize()
		}
	}, [open, map])

	return null
}

export { ResizeMap }
