import { type FC } from "react"
import { useGetBookingQuery } from "src/services/booking"
import { OrdersList } from "./lists"

const Orders: FC = () => {
	const { data: bookings, isLoading, isFetching } = useGetBookingQuery()

	return (
		<>
			<OrdersList
				data={bookings?.data || []}
				loading={isLoading || isFetching}
			/>
		</>
	)
}

export { Orders }
