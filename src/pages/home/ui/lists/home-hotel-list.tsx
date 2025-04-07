import { type FC } from "react"
import { HotelCarouselList } from "src/widgets/hotel/hotel-carousel-list"
import { TitleContainer } from "src/widgets/title-container"

const HomeHotelList: FC = () => {
	return (
		<>
			<TitleContainer title={"Рекомендуемые отели"}>
				<HotelCarouselList />
			</TitleContainer>
		</>
	)
}

export { HomeHotelList }
