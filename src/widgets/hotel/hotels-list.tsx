import { List, type ListProps } from "antd"
import { type FC } from "react"
import { type Hotel } from "src/services/hotels"
import { HotelsListItem } from "./hotels-list-item"

interface HotelsListProps {
	data: Hotel[]
	loading?: boolean
	pagination?: ListProps<Hotel>["pagination"]
}

const HotelsList: FC<HotelsListProps> = ({
	data,
	loading,
	pagination = {
		pageSize: 10
	}
}) => {
	return (
		<>
			<List<Hotel>
				pagination={pagination}
				loading={loading}
				dataSource={data}
				renderItem={(item, index) => <HotelsListItem data={item} key={index} />}
			/>
		</>
	)
}

export { HotelsList }
