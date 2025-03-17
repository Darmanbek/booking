import { type Map as LeafletMap } from "leaflet"
import { forwardRef } from "react"
import { MapContainer, type MapContainerProps, TileLayer } from "react-leaflet"

const Map = forwardRef<LeafletMap, MapContainerProps>(
	({ children, style, ...rest }, ref) => {
		return (
			<MapContainer
				ref={ref}
				center={[41.2995, 69.2401]}
				zoom={13}
				style={{ height: 300, width: "100%", ...style }}
				{...rest}
			>
				<TileLayer
					url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
					attribution={`&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="nofollow">OpenStreetMap</a> участники`}
				/>
				{children}
			</MapContainer>
		)
	}
)

export { Map }
