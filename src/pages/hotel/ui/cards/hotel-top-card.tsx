import { EnvironmentFilled, HeartOutlined } from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import { Button, Card, Divider, Flex, Space } from "antd"
import { type FC } from "react"
import type { City } from "src/shared/data/city.data"
import type { Hotel } from "src/shared/data/hotel.data"
import { Text, Title } from "src/shared/ui"
import { formatPriceWithCurrency } from "src/shared/utils/format.utils"

interface HotelTopCardProps {
	data?: Hotel
	city?: City
}

const HotelTopCard: FC<HotelTopCardProps> = ({ data: hotel, city }) => {
	return (
		<Card>
			<Flex align={"center"}>
				<Button icon={<HeartOutlined />} size={"large"} shape={"circle"} />
				<Divider
					type={"vertical"}
					style={{ maxHeight: "100%", height: 50, display: "block" }}
				/>
				<Flex justify={"space-between"} style={{ width: "100%" }}>
					<Flex vertical={true} gap={6}>
						<Title level={4}>{hotel?.name}</Title>
						<Text type={"secondary"}>
							<Space split={<Text>•</Text>}>
								<Space>
									<EnvironmentFilled />
									<Link to={"."}>{`${hotel?.address}, ${city?.city}`}</Link>
								</Space>
								<Link to={"."}>Показать на карте</Link>
							</Space>
						</Text>
					</Flex>
					<Flex vertical={true} gap={6}>
						<Title level={4} style={{ textAlign: "end" }}>
							{formatPriceWithCurrency(hotel?.price)}
						</Title>
						<Button type={"primary"}>Посмотреть цены</Button>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	)
}

export { HotelTopCard }
