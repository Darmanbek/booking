import { ArrowRightOutlined } from "@ant-design/icons"
import { useParams } from "@tanstack/react-router"
import { Button, Col, Flex, Row, Steps } from "antd"
import { type FC } from "react"
import { hotelData } from "src/shared/data/hotel.data"
import { Container } from "src/shared/ui"
import { ReverseHotelCard, ReverseInfoCard } from "./cards"

const Reverse: FC = () => {
	const { hotelSlug } = useParams({ strict: false })

	const hotel = hotelData.find((el) => el.slug === hotelSlug)
	return (
		<section>
			<Container>
				<Flex vertical={true} gap={20}>
					<Steps
						current={1}
						items={[
							{
								title: "Выбор отеля"
							},
							{
								title: "Бронирование"
							},
							{
								title: "Способ оплаты"
							}
						]}
					/>
					<Row gutter={20} style={{ rowGap: 20 }}>
						<Col span={16}>
							<Flex vertical={true} gap={20}>
								<ReverseHotelCard data={hotel} />
							</Flex>
						</Col>
						<Col span={8}>
							<ReverseInfoCard />
						</Col>
					</Row>
					<Flex justify={"center"}>
						<Button
							size={"large"}
							type={"primary"}
							iconPosition={"end"}
							icon={<ArrowRightOutlined />}
						>
							Продолжить
						</Button>
					</Flex>
				</Flex>
			</Container>
		</section>
	)
}

export { Reverse }
