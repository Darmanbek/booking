import { UserOutlined } from "@ant-design/icons"
import { Avatar, Card, Descriptions } from "antd"
import { type FC } from "react"
import { type HotelRoom } from "src/services/hotels"
import { Counter, Title } from "src/shared/ui"
import { formatPriceWithCurrency } from "src/shared/utils/format.utils"

interface HotelVariantCardProps {
	data: HotelRoom
}

const HotelVariantCard: FC<HotelVariantCardProps> = ({ data: room }) => {
	return (
		<Card
			style={{
				minWidth: 250,
				maxWidth: 250
			}}
			actions={[
				<Counter
					spaceProps={{
						style: {
							width: "100%",
							paddingInline: 12
						}
					}}
					style={{ width: "100%", maxWidth: "100%", textAlign: "center" }}
					key={"Counter"}
					min={0}
				/>
			]}
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
								{Array.from({
									length: Number(Number(room?.max_guests) || 0)
								}).map((_, i) => (
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
								{formatPriceWithCurrency(room?.base_price)}
							</Title>
						)
					}
				]}
			/>
		</Card>
	)
}

export { HotelVariantCard }
