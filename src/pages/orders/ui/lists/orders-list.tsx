import { List, type ListProps } from "antd"
import { type FC } from "react"
import type { Booking } from "src/services/booking"
import { OrdersListItem } from "./orders-list-item"

interface HotelsListProps {
	data?: Booking[]
	loading?: boolean
	pagination?: ListProps<Booking>["pagination"]
}

const OrdersList: FC<HotelsListProps> = ({
	data,
	loading,
	pagination = {
		pageSize: 10
	}
}) => {
	return (
		<>
			<List<Booking>
				rowKey={"id"}
				pagination={pagination}
				loading={loading}
				dataSource={data}
				renderItem={(item, index) => <OrdersListItem data={item} key={index} />}
			/>
		</>
	)
}

export { OrdersList }
