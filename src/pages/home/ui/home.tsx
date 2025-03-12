import { Flex } from "antd"
import { type FC } from "react"
import { Container } from "src/shared/ui"
import { CityCardList } from "src/widgets/city/city-card-list"
import { HotelCarouselList } from "src/widgets/hotel/hotel-carousel-list"
import { TitleContainer } from "src/widgets/title-container"

const Home: FC = () => {
	return (
		<>
			<section>
				<Container>
					<Flex vertical={true} gap={20}>
						<TitleContainer title={"Рекомендуемые отели"}>
							<HotelCarouselList />
						</TitleContainer>
						<TitleContainer title={"Популярные направления"}>
							<CityCardList />
						</TitleContainer>
					</Flex>
				</Container>
			</section>
		</>
	)
}

export { Home }
