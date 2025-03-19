import { Card, List } from "antd"
import { type FC } from "react"
import { HotelVariantsCardItem } from "./hotel-variants-card-item"

const HotelVariantsCard: FC = () => {
	return (
		<Card title={"Доступные варианты"}>
			<List
				dataSource={Array.from({ length: 5 }).fill({})}
				renderItem={() => <HotelVariantsCardItem />}
			/>
		</Card>
	)
}

export { HotelVariantsCard }
