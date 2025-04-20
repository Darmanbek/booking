import { type FC } from "react"
import { useGetBookingQuery } from "src/services/booking"
import { ReviewForm } from "./forms"
import { OrdersList } from "./lists"

const Orders: FC = () => {
	const { data: bookings, isLoading, isFetching } = useGetBookingQuery()

	return (
		<>
			<ReviewForm />
			<OrdersList
				data={bookings?.data || []}
				loading={isLoading || isFetching}
			/>
		</>
	)
}

export { Orders }
