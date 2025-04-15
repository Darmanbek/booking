import { List } from "antd"
import { type FC } from "react"
import type { HotelRoom } from "src/services/hotels"
import { OrdersRoomListItem } from "./orders-room-list-item"

interface OrdersRoomListProps {
	data?: HotelRoom[]
}

const OrdersRoomList: FC<OrdersRoomListProps> = ({ data: rooms }) => {
	return (
		<>
			<List<HotelRoom>
				dataSource={rooms}
				renderItem={(item) => <OrdersRoomListItem data={item} />}
			/>
		</>
	)
}

export { OrdersRoomList }
