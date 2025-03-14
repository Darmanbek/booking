import { HomeOutlined } from "@ant-design/icons"
import { Link, useParams } from "@tanstack/react-router"
import { Breadcrumb, Card, Col, Flex, Row, Space } from "antd"
import { type FC } from "react"
import { cityData } from "src/shared/data/city.data"
import { useToken } from "src/shared/hooks"
import { Container, Title } from "src/shared/ui"
import { HotelsForm } from "./forms/hotels-form"
import { HotelsList } from "./lists/hotels-list"

const Hotels: FC = () => {
	const { citySlug } = useParams({
		strict: false
	})
	const city = cityData.find((el) => el.slug === citySlug)

	const { token } = useToken()
	return (
		<section>
			<Container>
				<Flex vertical={true} gap={20}>
					<Breadcrumb
						items={[
							{
								title: (
									<Link to={"/"} style={{ color: token.colorLink }}>
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
					<Row gutter={20}>
						<Col span={8}>
							<HotelsForm />
						</Col>
						<Col span={16}>
							<Flex vertical={true} gap={20}>
								<Card>
									<Title level={4}>Ташкент: доступно 368 вариантов</Title>
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
