import { CloseOutlined } from "@ant-design/icons"
import { useNavigate, useParams, useSearch } from "@tanstack/react-router"
import { Button, Card, Flex, Spin } from "antd"
import { type FC, useEffect, useMemo, useRef, useState } from "react"
import { Marker, Popup } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import type { Hotel } from "src/services/hotels"
import { useGetLocationBySlugQuery } from "src/services/locations"
import { Map, type MapRef } from "src/widgets/map"
import { MapHotelCard } from "src/widgets/map/map-hotel-card"
import { RedMarker } from "src/widgets/map/red-marker"

interface HotelsMapCardProps {
	data: Hotel[]
}

const HotelsMapCard: FC<HotelsMapCardProps> = ({ data: hotels }) => {
	const mapRef = useRef<MapRef>(null)
	const navigate = useNavigate()
	const { citySlug } = useParams({
		strict: false
	})
	const searchParams = useSearch({
		strict: false
	})
	const { data: city } = useGetLocationBySlugQuery(citySlug)
	const [center, setCenter] = useState<[number, number] | null>(null)

	const cityCenter: [number, number] | undefined = useMemo(() => {
		if (city && city?.data?.geocode_lat && city?.data?.geocode_lng) {
			return [city.data.geocode_lat, city.data.geocode_lng]
		}
	}, [city])

	useEffect(() => {
		if (searchParams.coordinates) return
		if (city && city.data.geocode_lat && city.data.geocode_lng) {
			setCenter([city.data.geocode_lat, city.data.geocode_lng])
			if (mapRef.current) {
				mapRef.current.setView([city.data.geocode_lat, city.data.geocode_lng])
			}
		}
	}, [city, searchParams.coordinates])

	useEffect(() => {
		if (searchParams.coordinates) {
			const [latitude, longitude] = searchParams.coordinates.split("-")
			if (Number(latitude) && Number(longitude)) {
				setCenter([Number(latitude), Number(longitude)])
				if (mapRef.current) {
					mapRef.current.setView([Number(latitude), Number(longitude)])
				}
			}
		}
	}, [searchParams.coordinates])

	return (
		<Card
			styles={{
				body: {
					position: "relative"
				}
			}}
		>
			{center ? (
				<>
					<Map center={center} fullscreenControl={true} ref={mapRef}>
						<MarkerClusterGroup>
							{hotels.map((hotel, index) => (
								<Marker
									key={index}
									position={{
										lat: hotel?.location?.coordinates?.latitude,
										lng: hotel?.location?.coordinates?.longitude
									}}
								>
									<Popup>
										<MapHotelCard data={hotel} />
									</Popup>
								</Marker>
							))}
							{cityCenter && (
								<RedMarker position={cityCenter}>
									<Popup>
										<b>{city?.data?.name}</b>
									</Popup>
								</RedMarker>
							)}
						</MarkerClusterGroup>
					</Map>
					<Button
						icon={<CloseOutlined />}
						hidden={!searchParams.coordinates}
						onClick={() => {
							navigate({
								to: ".",
								search: (prev) => ({
									...prev,
									coordinates: undefined
								}),
								resetScroll: false
							})
							if (city && city.data.geocode_lat && city.data.geocode_lng) {
								setCenter([city.data.geocode_lat, city.data.geocode_lng])
								if (mapRef.current) {
									mapRef.current.setView([
										city.data.geocode_lat,
										city.data.geocode_lng
									])
								}
							}
						}}
						style={{
							position: "absolute",
							top: 24 + 8,
							right: 24 + 8,
							zIndex: 400
						}}
					/>
				</>
			) : (
				<Flex
					justify={"center"}
					align={"center"}
					style={{ minHeight: 300, width: "100%" }}
				>
					<Spin spinning={true} />
				</Flex>
			)}
		</Card>
	)
}

export { HotelsMapCard }
