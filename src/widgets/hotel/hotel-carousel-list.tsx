import { Carousel } from "antd"
import { type FC } from "react"
import { CarouselNextButton, CarouselPrevButton } from "src/shared/ui/carousel"
import { HotelCard } from "./hotel-card"
import { useHotelStyles } from "./hotel.style"

const HotelCarouselList: FC = () => {
	const { styles } = useHotelStyles()

	return (
		<Carousel
			autoplay={true}
			swipe={true}
			slidesToShow={4}
			arrows={true}
			draggable={true}
			swipeToSlide={true}
			className={styles.carousel}
			dots={false}
			prevArrow={<CarouselPrevButton />}
			nextArrow={<CarouselNextButton />}
		>
			{Array.from({ length: 20 }).map((_, index) => (
				<div key={index} className={styles.item}>
					<HotelCard />
				</div>
			))}
		</Carousel>
	)
}

export { HotelCarouselList }
