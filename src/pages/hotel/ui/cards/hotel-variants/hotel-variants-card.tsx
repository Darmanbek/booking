import { useParams } from "@tanstack/react-router"
import { Card, List } from "antd"
import { useResponsive } from "antd-style"
import { type FC } from "react"
import {
	type HotelRoom,
	useGetHotelsBySlugRoomsSearchQuery
} from "src/services/hotels"
import { useSearchStore } from "src/shared/store"
import { formatDate } from "src/shared/utils"
import { HotelVariantsCardItem } from "./hotel-variants-card-item"

const HotelVariantsCard: FC = () => {
	const { hotelSlug } = useParams({
		from: "/_layout/hotels/$citySlug/$hotelSlug"
	})
	const { search } = useSearchStore()
	const { sm = true } = useResponsive()

	const { data: hotelRooms } = useGetHotelsBySlugRoomsSearchQuery(hotelSlug, {
		guests: search.guests,
		check_in: formatDate(search.dates[0]),
		check_out: formatDate(search.dates[1])
	})

	return (
		<Card
			title={"Доступные варианты"}
			id={"rooms"}
			styles={{
				body: {
					padding: sm ? 24 : 16
				}
			}}
		>
			<List<HotelRoom>
				dataSource={hotelRooms?.data || []}
				renderItem={(item) => <HotelVariantsCardItem data={item} />}
			/>
		</Card>
	)
}

export { HotelVariantsCard }
