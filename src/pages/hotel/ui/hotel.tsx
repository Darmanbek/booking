import { HomeOutlined } from "@ant-design/icons"
import { Link, useParams, useSearch } from "@tanstack/react-router"
import { Breadcrumb, Card, Col, Flex, Row, Space } from "antd"
import dayjs from "dayjs"
import { type FC } from "react"
import { useGetLocationBySlugQuery } from "src/services/locations"
import { hotelData } from "src/shared/data/hotel.data"
import { Container } from "src/shared/ui"
import {
	HotelComfortCard,
	HotelDescriptionCard,
	HotelMapCard,
	HotelOrdersCard,
	HotelPreviewCard,
	HotelRatingCard,
	HotelReviewsCard,
	HotelServicesCard,
	HotelTopCard,
	HotelVariantsCard
} from "./cards"

const Hotel: FC = () => {
	const search = useSearch({ strict: false })
	const { hotelSlug, citySlug = "" } = useParams({
		strict: false
	})
	const { data: city } = useGetLocationBySlugQuery(citySlug)
	const hotel = hotelData.find((el) => el.slug === hotelSlug)

	return (
		<section>
			<Container>
				<Flex vertical={true} gap={20}>
					<Card>
						<Breadcrumb
							items={[
								{
									title: (
										<Link to={"/"}>
											<Space>
												<HomeOutlined />
												Главная
											</Space>
										</Link>
									)
								},
								{
									title: (
										<Link
											to={"/hotels/$citySlug"}
											params={{ citySlug }}
											search={search}
										>
											{city ? city?.data?.name : "Загрузка"}
										</Link>
									)
								},
								search
									? {
											title:
												search.from_date &&
												search.to_date &&
												`${dayjs(search.from_date).format("dd, DD MMM")} — ${dayjs(search.to_date).format("dd, DD MMM")}`
										}
									: {},
								{
									title: hotel?.name
								}
							]}
						/>
					</Card>
					<HotelTopCard />
					<HotelPreviewCard data={hotel} />
					<Row gutter={20} style={{ rowGap: 20 }}>
						<Col span={12}>
							<HotelRatingCard />
						</Col>
						<Col span={12}>
							<HotelComfortCard />
						</Col>
					</Row>
					<Row gutter={20} style={{ rowGap: 20 }}>
						<Col span={16}>
							<Flex vertical={true} gap={20}>
								<HotelMapCard data={hotel} />
								<HotelVariantsCard />
								<HotelDescriptionCard />
								<HotelServicesCard />
							</Flex>
						</Col>
						<Col span={8}>
							<HotelOrdersCard />
						</Col>
					</Row>
					<HotelReviewsCard />
				</Flex>
			</Container>
		</section>
	)
}

export { Hotel }
