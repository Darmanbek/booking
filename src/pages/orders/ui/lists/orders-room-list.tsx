import { List } from "antd"
import { type FC } from "react"
import type { BookingRoom } from "src/services/booking"
import { OrdersRoomListItem } from "./orders-room-list-item"

interface OrdersRoomListProps {
	data?: BookingRoom[]
}

const OrdersRoomList: FC<OrdersRoomListProps> = ({ data: rooms }) => {
	return (
		<>
			<List<BookingRoom>
				dataSource={rooms}
				renderItem={(item) => <OrdersRoomListItem data={item?.room} />}
			/>
		</>
	)
}

export { OrdersRoomList }
