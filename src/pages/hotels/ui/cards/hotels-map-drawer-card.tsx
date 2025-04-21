import { CloseOutlined } from "@ant-design/icons"
import { useNavigate, useParams, useSearch } from "@tanstack/react-router"
import { Button, Drawer, Flex, Spin } from "antd"
import { type FC, useEffect, useMemo, useRef, useState } from "react"
import { Marker, Popup } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import type { Hotel } from "src/services/hotels"
import { useGetLocationBySlugQuery } from "src/services/locations"
import { useMenuStore } from "src/shared/store"
import { Map, type MapRef, ResizeMap } from "src/widgets/map"
import { MapHotelCard } from "src/widgets/map/map-hotel-card"
import { RedMarker } from "src/widgets/map/red-marker"

interface HotelsMapDrawerCardProps {
	data: Hotel[]
}

const HotelsMapDrawerCard: FC<HotelsMapDrawerCardProps> = ({
	data: hotels
}) => {
	const { map, toggleMap } = useMenuStore()
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
		<Drawer
			open={map}
			onClose={() => {
				if (map) {
					toggleMap()
				}
			}}
			width={"100%"}
			title={"Карта"}
			styles={{
				body: {
					padding: 0
				}
			}}
		>
			<div style={{ position: "relative" }}>
				{center ? (
					<>
						<Map
							style={{ height: "calc(100vh - 57px)" }}
							center={center}
							ref={mapRef}
						>
							<ResizeMap open={map} />
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
								top: 8,
								right: 8,
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
			</div>
		</Drawer>
	)
}

export { HotelsMapDrawerCard }
