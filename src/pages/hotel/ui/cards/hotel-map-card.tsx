import { Card, Flex } from "antd"
import type L from "leaflet"
import { type FC, useEffect, useRef } from "react"
import { Marker, Popup } from "react-leaflet"
import { type Hotel } from "src/shared/data/hotel.data"
import { Text, Title } from "src/shared/ui"
import { Map } from "src/widgets/map"
import { MapHotelCard } from "src/widgets/map/map-hotel-card"

interface HotelMapCardProps {
	data?: Hotel
}

const HotelMapCard: FC<HotelMapCardProps> = ({ data: hotel }) => {
	const popupRef = useRef<L.Popup>(null)

	useEffect(() => {
		if (popupRef.current && hotel?.location) {
			popupRef.current.openPopup(hotel?.location)
		}
	}, [hotel?.location])
	return (
		<Card
			title={
				<Flex vertical={true} gap={4} style={{ paddingBlock: 12 }}>
					<Title level={3} style={{ fontSize: "inherit" }}>
						Расположение
					</Title>
					<Text style={{ fontSize: 14, fontWeight: 500 }}>
						{hotel?.address}
					</Text>
				</Flex>
			}
		>
			{hotel?.location && (
				<Map scrollWheelZoom={false} center={hotel?.location}>
					<Marker position={hotel?.location} autoPan={true}>
						<Popup autoPan={true}>
							<MapHotelCard data={hotel} />
						</Popup>
					</Marker>
				</Map>
			)}
		</Card>
	)
}

export { HotelMapCard }
