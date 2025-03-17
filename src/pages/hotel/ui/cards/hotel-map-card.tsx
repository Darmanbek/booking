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
	const markerRef = useRef<L.Marker>(null)

	useEffect(() => {
		if (markerRef.current) {
			markerRef.current.openPopup()
		}
	}, [])
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
			<Map scrollWheelZoom={false} center={hotel?.location}>
				{hotel?.location && (
					<Marker position={hotel?.location} ref={markerRef}>
						<Popup>
							<MapHotelCard data={hotel} />
						</Popup>
					</Marker>
				)}
			</Map>
		</Card>
	)
}

export { HotelMapCard }
