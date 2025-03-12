import { List } from "antd"
import { type FC } from "react"
import { type Hotel, hotelData } from "src/shared/data/hotel.data"
import { HotelListItem } from "./hotel-list-item"

const HotelsList: FC = () => {
	return (
		<>
			<List<Hotel>
				pagination={{
					pageSize: 4
				}}
				dataSource={hotelData}
				renderItem={(item, index) => <HotelListItem data={item} key={index} />}
			/>
		</>
	)
}

export { HotelsList }
