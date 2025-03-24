import { UserOutlined } from "@ant-design/icons"
import { Avatar, Card, Descriptions } from "antd"
import { type FC } from "react"
import { Counter, Title } from "src/shared/ui"
import { formatPriceWithCurrency } from "src/shared/utils/format.utils"

interface HotelVariantCardProps {
	data: number
}

const HotelVariantCard: FC<HotelVariantCardProps> = ({ data: index }) => {
	return (
		<Card
			style={{
				minWidth: 250
			}}
			actions={[<Counter style={{ width: "100%" }} key={"Counter"} min={0} />]}
		>
			<Descriptions
				layout={"vertical"}
				column={1}
				items={[
					{
						key: "guests",
						label: "Количество гостей",
						children: (
							<Avatar.Group>
								{Array.from({ length: index + 1 }).map((_, i) => (
									<Avatar icon={<UserOutlined />} key={i} />
								))}
							</Avatar.Group>
						)
					},
					{
						key: "price",
						label: "Цена за 1 ночь",
						children: (
							<Title level={5} style={{ fontSize: 14 }}>
								{formatPriceWithCurrency(300_000 * (index + 1))}
							</Title>
						)
					}
				]}
			/>
		</Card>
	)
}

export { HotelVariantCard }
