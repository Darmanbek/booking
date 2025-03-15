import { Card, Carousel, Col, Image, Row } from "antd"
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
					<div>
						<Image
							style={{ height: 300, width: 300, objectFit: "cover" }}
							height={300}
							width={300}
							src={hotel?.image}
							alt={hotel?.name}
						/>
					</div>
					<div>
						<Row style={{ rowGap: 2 }}>
							{Array.from({ length: 2 }).map((_, index) => (
								<Col key={index} span={24} style={{ height: 150 }}>
									<Image
										style={{ height: "100%", objectFit: "cover" }}
										height={150}
										width={300}
										src={hotel?.image}
										alt={hotel?.name}
									/>
								</Col>
							))}
						</Row>
					</div>
					{Array.from({ length: 15 }).map((_, index) => (
						<div key={index}>
							<Row gutter={2} style={{ rowGap: 2 }}>
								{Array.from({ length: 4 }).map((_, index) => (
									<Col key={index} span={12} style={{ height: 150 }}>
										<Image
											style={{ height: "100%", objectFit: "cover" }}
											height={150}
											width={150}
											src={hotel?.image}
											alt={hotel?.name}
										/>
									</Col>
								))}
							</Row>
						</div>
					))}
				</Carousel>
			</Image.PreviewGroup>
		</Card>
	)
}

export { HotelPreviewCard }
