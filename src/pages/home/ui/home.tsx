import { Flex } from "antd"
import { type FC } from "react"
import { Container } from "src/shared/ui"
import { HotelCarouselList } from "src/widgets/hotel/hotel-carousel-list"
import { TitleContainer } from "src/widgets/title-container"

const Home: FC = () => {
	return (
		<>
			<section>
				<Container>
					<Flex vertical={true}>
						<TitleContainer title={"Отели"}>
							<HotelCarouselList />
						</TitleContainer>
					</Flex>
				</Container>
			</section>
		</>
	)
}

export { Home }
