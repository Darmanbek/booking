import { Card, Carousel, Image } from "antd"
import { type FC } from "react"
import type { Hotel } from "src/shared/data/hotel.data"
import { CarouselNextButton, CarouselPrevButton } from "src/shared/ui/carousel"
import { useHotelCardStyles } from "./hotel-card.style"

interface HotelPreviewCardProps {
	data?: Hotel
}

const HotelPreviewCard: FC<HotelPreviewCardProps> = ({ data: hotel }) => {
	const { styles } = useHotelCardStyles()

	return (
		<Card
			style={{ overflow: "hidden" }}
			styles={{
				body: {
					padding: 0
				}
			}}
		>
			<Image.PreviewGroup>
				<Carousel
					dots={false}
					infinite={false}
					className={styles.carousel}
					slidesToShow={4}
					draggable={true}
					arrows={true}
					prevArrow={<CarouselPrevButton />}
					nextArrow={<CarouselNextButton />}
				>
					{Array.from({ length: 30 }).map((_, index) => (
						<div key={index}>
							<Image
								style={{ height: "100%", objectFit: "cover" }}
								height={300}
								width={300}
								src={hotel?.image}
								alt={hotel?.name}
							/>
						</div>
					))}
				</Carousel>
			</Image.PreviewGroup>
		</Card>
	)
}

export { HotelPreviewCard }
