import L, { type Marker as MarkerRef } from "leaflet"
import { forwardRef } from "react"
import { Marker, type MarkerProps } from "react-leaflet"

const RedMarkerIcon = new L.Icon({
	iconUrl: "/map/marker-icon-red.png",
	shadowUrl: "/map/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
})

const RedMarker = forwardRef<MarkerRef, MarkerProps>((props, ref) => {
	return <Marker ref={ref} icon={RedMarkerIcon} {...props} />
})
RedMarker.displayName = "RedMarker"

export { RedMarker }
