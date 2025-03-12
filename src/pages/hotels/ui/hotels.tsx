import { Card, Col, Flex, Row } from "antd"
import { type FC } from "react"
import { Container, Title } from "src/shared/ui"
import { HotelsForm } from "./forms/hotels-form"
import { HotelsList } from "./lists/hotels-list"

const Hotels: FC = () => {
	return (
		<section>
			<Container>
				<Flex vertical={true}>
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
