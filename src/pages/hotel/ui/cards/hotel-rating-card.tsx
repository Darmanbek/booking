import { LeftOutlined, RightOutlined, UserOutlined } from "@ant-design/icons"
import { Link, useParams } from "@tanstack/react-router"
import { Avatar, Button, Card, Empty, Flex, Space } from "antd"
import { useResponsive } from "antd-style"
import { type CarouselRef } from "antd/es/carousel"
import { type FC, useRef } from "react"
import {
	useGetHotelsBySlugRatingQuery,
	useGetHotelsBySlugReviewsQuery
} from "src/services/hotels"
import { Carousel, Paragraph, Title } from "src/shared/ui"
import { RatingContainer } from "src/widgets/rating-container"

const HotelRatingCard: FC = () => {
	const carouselRef = useRef<CarouselRef>(null)
	const { hotelSlug } = useParams({
		from: "/_layout/hotels/$citySlug/$hotelSlug"
	})
	const { sm = true } = useResponsive()

	const { data: hotelRating } = useGetHotelsBySlugRatingQuery(hotelSlug)
	const { data: reviews } = useGetHotelsBySlugReviewsQuery(hotelSlug)

	return (
		<RatingContainer
			text={
				hotelRating?.data?.average_rating
					? Number(Number(hotelRating?.data?.average_rating) || 0).toFixed(1)
					: null
			}
		>
			<Card
				title={
					<Flex vertical={true} align={"start"}>
						<Title level={3} style={{ fontSize: "inherit" }}>
							Очень хорошо
						</Title>
						<Link
							to={"."}
							hash={"reviews"}
							search={(prev) => prev}
							style={{ fontSize: 12 }}
						>
							{`${hotelRating?.data?.reviews_count || 0} отзывов`}
						</Link>
					</Flex>
				}
			>
				<Flex
					vertical={true}
					gap={8}
					style={{ minHeight: 250 }}
					justify={"space-between"}
				>
					{reviews?.data?.length ? (
						<>
							<Carousel
								autoplay={true}
								dots={false}
								style={{ height: "100%" }}
								ref={carouselRef}
								slidesToShow={1}
								arrows={false}
							>
								{reviews?.data?.map((review, index) => (
									<div key={index}>
										<Flex
											vertical={true}
											gap={4}
											style={{ padding: 8, paddingInline: 12 }}
										>
											<Space>
												<Avatar icon={<UserOutlined />} />
												{review?.hotel_id}
											</Space>
											<Paragraph
												style={{ height: "100%" }}
												ellipsis={{
													rows: 7,
													expandable: "collapsible"
												}}
											>
												{review?.comment}
											</Paragraph>
										</Flex>
									</div>
								))}
							</Carousel>
						</>
					) : (
						<>
							<Flex justify={"center"} align={"center"}>
								<Empty />
							</Flex>
						</>
					)}

					<Flex justify={"space-between"}>
						<Space>
							<Button
								shape={"circle"}
								type={"primary"}
								disabled={reviews?.data?.length === 0}
								onClick={() => carouselRef?.current?.prev()}
								icon={<LeftOutlined />}
							/>
							<Button
								shape={"circle"}
								type={"primary"}
								disabled={reviews?.data?.length === 0}
								onClick={() => carouselRef?.current?.next()}
								icon={<RightOutlined />}
							/>
						</Space>
						<Button
							type={"primary"}
							icon={`(+${hotelRating?.data?.reviews_count || 0})`}
							iconPosition={"end"}
						>
							{sm ? "Посмотреть все отзывы" : "Все отзывы"}
						</Button>
					</Flex>
				</Flex>
			</Card>
		</RatingContainer>
	)
}

export { HotelRatingCard }
