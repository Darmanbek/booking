import { Card } from "antd"
import { type FC, useRef } from "react"
import { Marker, Popup } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import { type Hotel } from "src/shared/data/hotel.data"
import { Map, MapRef } from "src/widgets/map"
import { MapHotelCard } from "src/widgets/map/map-hotel-card"

interface HotelsMapCardProps {
	data: Hotel[]
}

const HotelsMapCard: FC<HotelsMapCardProps> = ({ data: hotels }) => {
	const mapRef = useRef<MapRef>(null)

	return (
		<Card>
			<Map fullscreenControl={true} ref={mapRef}>
				<MarkerClusterGroup>
					{hotels.map((hotel, index) => (
						<Marker
							key={index}
							position={{
								lat: hotel.location.lat,
								lng: hotel.location.lng
							}}
						>
							<Popup>
								<MapHotelCard data={hotel} />
							</Popup>
						</Marker>
					))}
				</MarkerClusterGroup>
			</Map>
		</Card>
	)
}

export { HotelsMapCard }
