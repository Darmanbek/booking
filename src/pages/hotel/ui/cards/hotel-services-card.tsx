import { ExclamationCircleOutlined } from "@ant-design/icons"
import { useParams } from "@tanstack/react-router"
import { Card, Col, Descriptions, Row, Space } from "antd"
import { type FC } from "react"
import { useGetHotelsBySlugAmenitiesQuery } from "src/services/hotels"
import { useTranslation } from "src/shared/hooks"
import { Text } from "src/shared/ui"

const HotelServicesCard: FC = () => {
	const { hotelSlug } = useParams({
		from: "/_layout/hotels/$citySlug/$hotelSlug"
	})
	const { t } = useTranslation()
	const { data: hotelAmenities } = useGetHotelsBySlugAmenitiesQuery(hotelSlug)

	return (
		<Card title={"Услуги и удобства"}>
			<Row gutter={20} style={{ rowGap: 20 }}>
				{hotelAmenities?.data?.map((item, index) => (
					<Col key={index} xs={24} sm={12} md={8}>
						<Descriptions
							column={1}
							title={
								<Space style={{ fontSize: 14 }}>
									<ExclamationCircleOutlined />
									<>{t(item?.name)}</>
								</Space>
							}
							items={item?.hotel_amenities?.map((childItem) => ({
								key: childItem?.id,
								children: (
									<Space align={"center"}>
										<Text type={"secondary"}>•</Text>
										{t(childItem?.name)}
									</Space>
								)
							}))}
						/>
					</Col>
				))}
			</Row>
		</Card>
	)
}

export { HotelServicesCard }
