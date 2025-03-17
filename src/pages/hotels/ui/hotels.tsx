import { HomeOutlined } from "@ant-design/icons"
import { Link, useParams } from "@tanstack/react-router"
import { Breadcrumb, Card, Col, Flex, Row, Space } from "antd"
import { type FC } from "react"
import { cityData } from "src/shared/data/city.data"
import { hotelData } from "src/shared/data/hotel.data"
import { Container, Title } from "src/shared/ui"
import { HotelsMapCard } from "./cards/hotels-map-card"
import { HotelsForm } from "./forms/hotels-form"
import { HotelsList } from "./lists/hotels-list"

const Hotels: FC = () => {
	const { citySlug } = useParams({
		strict: false
	})
	const city = cityData.find((el) => el.slug === citySlug)

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
									title: city?.city
								}
							]}
						/>
					</Card>
					<Row gutter={20}>
						<Col span={8}>
							<Flex vertical={true} gap={20} style={{ height: "100%" }}>
								<HotelsMapCard data={hotelData} />
								<HotelsForm />
							</Flex>
						</Col>
						<Col span={16}>
							<Flex vertical={true} gap={20}>
								<Card>
									<Title level={4}>{city?.city}: доступно 368 вариантов</Title>
								</Card>
								<HotelsList />
							</Flex>
						</Col>
					</Row>
				</Flex>
			</Container>
		</section>
	)
}

export { Hotels }
