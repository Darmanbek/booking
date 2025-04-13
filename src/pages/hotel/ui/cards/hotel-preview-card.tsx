import { useParams } from "@tanstack/react-router"
import { Card, Carousel, Col, Empty, Image, Row, Spin } from "antd"
import { type FC, useMemo } from "react"
import { useGetHotelsBySlugImagesQuery } from "src/services/hotels"
import { CarouselNextButton, CarouselPrevButton } from "src/shared/ui/carousel"
import { useHotelCardStyles } from "./hotel-card.style"

const HotelPreviewCard: FC = () => {
	const { styles } = useHotelCardStyles()
	const { hotelSlug } = useParams({
		from: "/_layout/hotels/$citySlug/$hotelSlug"
	})

	const { data: hotelImages, isLoading } =
		useGetHotelsBySlugImagesQuery(hotelSlug)

	const mainImage = useMemo(() => {
		return hotelImages?.data?.[0]
	}, [hotelImages?.data])

	const secondImage = useMemo(() => {
		if (
			!(hotelImages?.data && hotelImages?.data?.[1] && hotelImages?.data?.[2])
		)
			return []
		return [hotelImages?.data?.[1], hotelImages?.data?.[2]]
	}, [hotelImages?.data])

	const otherImages = useMemo(() => {
		if (!hotelImages?.data) return []

		const images = hotelImages.data.slice(3)
		const chunkSize = 4

		const chunks = []
		for (let i = 0; i < images.length; i += chunkSize) {
			chunks.push(images.slice(i, i + chunkSize))
		}

		return chunks
	}, [hotelImages?.data])

	return (
		<Card
			style={{ overflow: "hidden" }}
			styles={{
				body: {
					padding: 0
				}
			}}
		>
			<Spin spinning={isLoading}>
				{hotelImages?.data?.length ? (
					<Image.PreviewGroup>
						<Carousel
							dots={false}
							infinite={false}
							className={styles.carousel}
							slidesToShow={4}
							draggable={true}
							arrows={true}
							centerMode={false}
							prevArrow={<CarouselPrevButton />}
							nextArrow={<CarouselNextButton />}
						>
							{mainImage && (
								<div>
									<Image
										style={{ height: 300, width: 300, objectFit: "cover" }}
										height={300}
										width={300}
										src={mainImage?.image}
										alt={`Фото ${mainImage?.position}`}
									/>
								</div>
							)}
							<div>
								<Row style={{ rowGap: 2 }}>
									{secondImage?.map((item, index) => (
										<Col key={index} span={24} style={{ height: 150 }}>
											<Image
												style={{ height: "100%", objectFit: "cover" }}
												height={150}
												width={300}
												src={item?.image}
												alt={`Фото ${item?.position}`}
											/>
										</Col>
									))}
								</Row>
							</div>
							{otherImages?.map((item, index) => (
								<div key={index}>
									<Row gutter={2} style={{ rowGap: 2 }}>
										{item?.map((child, index) => (
											<Col key={index} span={12} style={{ height: 150 }}>
												<Image
													style={{ height: "100%", objectFit: "cover" }}
													height={150}
													width={150}
													src={child?.image}
													alt={`Фото ${child.position}`}
												/>
											</Col>
										))}
									</Row>
								</div>
							))}
						</Carousel>
					</Image.PreviewGroup>
				) : (
					<Empty />
				)}
			</Spin>
		</Card>
	)
}

export { HotelPreviewCard }
