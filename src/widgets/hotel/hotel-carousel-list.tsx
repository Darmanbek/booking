import { Carousel } from "antd"
import { useResponsive } from "antd-style"
import { type FC, useMemo } from "react"
import { type Hotel } from "src/services/hotels"
import { CarouselNextButton, CarouselPrevButton } from "src/shared/ui/carousel"
import { formatNumber } from "src/shared/utils"
import { HotelCard } from "./hotel-card"
import { HotelLoadingCard } from "./hotel-loading-card"
import { useHotelStyles } from "./hotel.style"

interface HotelCarouselListProps {
	data?: Hotel[]
	loading?: boolean
}

const HotelCarouselList: FC<HotelCarouselListProps> = ({
	data: hotels,
	loading
}) => {
	const { styles } = useHotelStyles()
	const { xs, sm, md, lg } = useResponsive()

	const size = useMemo(() => {
		if (formatNumber(hotels?.length) > 4) return 4
		return formatNumber(hotels?.length) || 1
	}, [hotels])

	return (
		<Carousel
			// autoplay={true}
			swipe={true}
			slidesToShow={lg ? size : md ? 3 : sm ? 2 : xs ? 1 : size}
			arrows={true}
			infinite={false}
			draggable={true}
			swipeToSlide={true}
			className={styles.carousel}
			dots={false}
			prevArrow={<CarouselPrevButton />}
			nextArrow={<CarouselNextButton />}
		>
			{loading
				? Array.from({ length: size }).map((_, index) => (
						<HotelLoadingCard key={index} />
					))
				: hotels?.map((hotel, index) => (
						<div key={index} className={styles.item}>
							<HotelCard data={hotel} />
						</div>
					))}
		</Carousel>
	)
}

export { HotelCarouselList }
