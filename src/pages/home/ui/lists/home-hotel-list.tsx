import { type FC } from "react"
import { useGetHotelsPopularQuery } from "src/services/hotels"
import { HotelCarouselList } from "src/widgets/hotel"
import { TitleContainer } from "src/widgets/title-container"

const HomeHotelList: FC = () => {
	const { data: hotelsPopular, isLoading } = useGetHotelsPopularQuery({
		limit: 10
	})

	if (hotelsPopular?.data?.length === 0) return

	return (
		<>
			<TitleContainer title={"Рекомендуемые отели"}>
				<HotelCarouselList data={hotelsPopular?.data} loading={isLoading} />
			</TitleContainer>
		</>
	)
}

export { HomeHotelList }
