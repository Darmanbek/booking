import {
	BankOutlined,
	CarOutlined,
	CoffeeOutlined,
	WifiOutlined
} from "@ant-design/icons"
import { Card, Descriptions, Divider, Flex, Space } from "antd"
import { type FC } from "react"

const HotelComfortCard: FC = () => {
	return (
		<Card style={{ height: "100%" }}>
			<Flex>
				<Descriptions
					title={"Популярные удобства"}
					column={1}
					items={Array.from({ length: 2 }).flatMap((_, index) => [
						{
							key: "wifi" + index,
							children: (
								<Space>
									<WifiOutlined />
									{"Бесплатный интернет"}
								</Space>
							)
						},
						{
							key: "restaurant" + index,
							children: (
								<Space>
									<CoffeeOutlined />
									{"Бар или ресторан"}
								</Space>
							)
						},
						{
							key: "parking" + index,
							children: (
								<Space>
									<CarOutlined />
									{"Парковка"}
								</Space>
							)
						}
					])}
				/>
				<Divider type={"vertical"} style={{ height: "inherit" }} />
				<Descriptions
					title={"Расположение"}
					column={1}
					items={Array.from({ length: 3 }).map((_, index) => ({
						key: index,
						children: (
							<Space>
								<BankOutlined />
								{"Тобольские ворота • 640 м"}
							</Space>
						)
					}))}
				/>
			</Flex>
		</Card>
	)
}

export { HotelComfortCard }
