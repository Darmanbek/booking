import { useParams, useSearch } from "@tanstack/react-router"
import { List } from "antd"
import { type FC } from "react"
import { type Hotel, useGetHotelsSearchQuery } from "src/services/hotels"
import { useSearchStore } from "src/shared/store"
import { formatDate, formatGuests } from "src/shared/utils"
import { HotelListItem } from "./hotel-list-item"

const HotelsList: FC = () => {
	const { citySlug = "" } = useParams({ strict: false })
	const { dates, guests } = useSearchStore((state) => state.search)
	const searchParams = useSearch({
		strict: false
	})
	const {
		data: hotels,
		isLoading,
		isFetching
	} = useGetHotelsSearchQuery({
		city: citySlug,
		check_in: searchParams?.from_date || formatDate(dates[0]),
		check_out: searchParams?.to_date || formatDate(dates[1]),
		guests: formatGuests(searchParams?.guests) || guests
	})

	return (
		<>
			<List<Hotel>
				pagination={{
					pageSize: 10
				}}
				loading={isLoading || isFetching}
				dataSource={hotels?.data}
				renderItem={(item, index) => <HotelListItem data={item} key={index} />}
			/>
		</>
	)
}

export { HotelsList }
