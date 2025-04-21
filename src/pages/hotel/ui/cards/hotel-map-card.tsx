import { useParams } from "@tanstack/react-router"
import { Card, Empty, Flex, Spin } from "antd"
import type L from "leaflet"
import { type FC, useEffect, useRef } from "react"
import { Marker, Popup } from "react-leaflet"
import {
	useGetHotelsBySlugLocationQuery,
	useGetHotelsBySlugQuery
} from "src/services/hotels"
import { Text, Title } from "src/shared/ui"
import { Map } from "src/widgets/map/map"
import { MapHotelCard } from "src/widgets/map/map-hotel-card"

const HotelMapCard: FC = () => {
	const popupRef = useRef<L.Popup>(null)
	const { hotelSlug } = useParams({
		from: "/_layout/hotels/$citySlug/$hotelSlug"
	})

	const { data: hotel, isLoading: hotelLoading } =
		useGetHotelsBySlugQuery(hotelSlug)
	const { data: hotelLocation, isLoading: hotelLocationLoading } =
		useGetHotelsBySlugLocationQuery(hotelSlug)

	useEffect(() => {
		if (popupRef.current && hotelLocation?.data?.coordinates) {
			popupRef.current.openPopup({
				lng: hotelLocation?.data?.coordinates?.longitude,
				lat: hotelLocation?.data?.coordinates?.longitude
			})
		}
	}, [hotelLocation?.data?.coordinates])
	return (
		<Card
			id={"location"}
			title={
				<Flex vertical={true} gap={4} style={{ paddingBlock: 12 }}>
					<Title level={3} style={{ fontSize: "inherit" }}>
						Расположение
					</Title>
					<Text style={{ fontSize: 14, fontWeight: 500 }}>
						{hotelLocationLoading
							? "Загрузка"
							: hotelLocation?.data?.address || "Нейзвестный адресс"}
					</Text>
				</Flex>
			}
		>
			<Spin spinning={hotelLoading || hotelLocationLoading}>
				{hotelLocation?.data?.coordinates ? (
					<Map
						scrollWheelZoom={false}
						center={{
							lat: hotelLocation?.data?.coordinates?.latitude,
							lng: hotelLocation?.data?.coordinates?.longitude
						}}
					>
						<Marker
							position={{
								lat: hotelLocation?.data?.coordinates?.latitude,
								lng: hotelLocation?.data?.coordinates?.longitude
							}}
							autoPan={true}
						>
							<Popup ref={popupRef}>
								<MapHotelCard data={hotel?.data} />
							</Popup>
						</Marker>
					</Map>
				) : (
					<Empty />
				)}
			</Spin>
		</Card>
	)
}

export { HotelMapCard }
