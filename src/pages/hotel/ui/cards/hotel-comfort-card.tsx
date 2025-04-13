import { BankOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import { useParams } from "@tanstack/react-router"
import { Card, Descriptions, Divider, Flex, Space } from "antd"
import { type FC } from "react"
import {
	useGetHotelsBySlugAmenitiesQuery,
	useGetHotelsBySlugLocationQuery
} from "src/services/hotels"
import { useTranslation } from "src/shared/hooks"

const HotelComfortCard: FC = () => {
	const { hotelSlug } = useParams({
		from: "/_layout/hotels/$citySlug/$hotelSlug"
	})
	const { t } = useTranslation()
	const { data: hotelAmenities, isLoading: amenitiesLoading } =
		useGetHotelsBySlugAmenitiesQuery(hotelSlug)
	const { data: hotelLocation, isLoading: locationLoading } =
		useGetHotelsBySlugLocationQuery(hotelSlug)

	return (
		<Card
			style={{ height: "100%" }}
			loading={amenitiesLoading || locationLoading}
		>
			<Flex>
				<Descriptions
					title={"Популярные удобства"}
					column={1}
					items={hotelAmenities?.data?.[0]?.hotel_amenities?.map((item) => ({
						key: item.id,
						children: (
							<Space>
								<ExclamationCircleOutlined />
								{t(item.name)}
							</Space>
						)
					}))}
				/>
				<Divider type={"vertical"} style={{ height: "inherit" }} />
				<Descriptions
					title={"Расположение"}
					column={1}
					items={[
						{
							key: "to_airport",
							children: (
								<Space>
									<BankOutlined />
									{`До аэропорта • ${hotelLocation?.data?.to_airport} км`}
								</Space>
							)
						},
						{
							key: "to_railway",
							children: (
								<Space>
									<BankOutlined />
									{`До ж/д вокзала • ${hotelLocation?.data?.to_railway} км`}
								</Space>
							)
						},
						{
							key: "to_city_center",
							children: (
								<Space>
									<BankOutlined />
									{`До центра города • ${hotelLocation?.data?.to_city_center} км`}
								</Space>
							)
						}
					]}
				/>
			</Flex>
		</Card>
	)
}

export { HotelComfortCard }
