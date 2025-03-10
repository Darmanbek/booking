import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import { Button, Carousel } from "antd"
import { type FC } from "react"
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
			prevArrow={<Button icon={<LeftOutlined />} />}
			nextArrow={<Button icon={<RightOutlined />} />}
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
