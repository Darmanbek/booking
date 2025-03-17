import { Card } from "antd"
import { type FC } from "react"
import { Marker, Popup } from "react-leaflet"
import { type Hotel } from "src/shared/data/hotel.data"
import { Map } from "src/widgets/map"
import { MapHotelCard } from "src/widgets/map/map-hotel-card"

interface HotelsMapCardProps {
	data: Hotel[]
}

const HotelsMapCard: FC<HotelsMapCardProps> = ({ data: hotels }) => {
	return (
		<Card>
			<Map>
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
			</Map>
		</Card>
	)
}

export { HotelsMapCard }
