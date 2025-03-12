import { Carousel } from "antd"
import { useResponsive } from "antd-style"
import { type FC } from "react"
import { hotelData } from "src/shared/data/hotel.data"
import { CarouselNextButton, CarouselPrevButton } from "src/shared/ui/carousel"
import { HotelCard } from "./hotel-card"
import { useHotelStyles } from "./hotel.style"

const HotelCarouselList: FC = () => {
	const { styles } = useHotelStyles()
	const { xs, sm, md, lg } = useResponsive()

	return (
		<Carousel
			autoplay={true}
			swipe={true}
			slidesToShow={lg ? 4 : md ? 3 : sm ? 2 : xs ? 1 : 4}
			arrows={true}
			draggable={true}
			swipeToSlide={true}
			className={styles.carousel}
			dots={false}
			prevArrow={<CarouselPrevButton />}
			nextArrow={<CarouselNextButton />}
		>
			{hotelData.map((hotel, index) => (
				<div key={index} className={styles.item}>
					<HotelCard data={hotel} />
				</div>
			))}
		</Carousel>
	)
}

export { HotelCarouselList }
