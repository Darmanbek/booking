import { UserOutlined } from "@ant-design/icons"
import { useParams } from "@tanstack/react-router"
import { Avatar, Card, Col, Flex, List, Progress, Row } from "antd"
import { useResponsive } from "antd-style"
import { type FC, useState } from "react"
import { useGetCategoriesQuery } from "src/services/categories"
import {
	HotelReview,
	useGetHotelsBySlugRatingQuery,
	useGetHotelsBySlugReviewsQuery
} from "src/services/hotels"
import { useTranslation } from "src/shared/hooks"
import { Text, Title } from "src/shared/ui"
import { formatCustomDate, formatNumber } from "src/shared/utils"
import { RatingContainer } from "src/widgets/rating-container"
import { RatingTag } from "src/widgets/rating-tag"

const HotelReviewsCard: FC = () => {
	const { hotelSlug } = useParams({
		from: "/_layout/hotels/$citySlug/$hotelSlug"
	})
	const { t } = useTranslation()
	const [params, setParams] = useState({
		page: 1,
		pageSize: 5
	})

	const { sm = true } = useResponsive()
	const { data: hotelRating } = useGetHotelsBySlugRatingQuery(hotelSlug)
	const { data: hotelReviews, isLoading: reviewsLoading } =
		useGetHotelsBySlugReviewsQuery(hotelSlug, {
			page: params.page,
			page_size: params.pageSize
		})
	const { data: categories } = useGetCategoriesQuery()

	const ratings = (
		<Row style={{ width: "100%" }} justify={"end"} gutter={24}>
			{hotelRating?.data?.category_ratings?.map((item, index) => (
				<Col sm={12} md={8} key={index}>
					<Progress
						size={"small"}
						percent={formatNumber(item.rating) * 10}
						showInfo={false}
					/>
					<Flex
						gap={8}
						style={{ width: "100%", fontSize: 12 }}
						justify={"space-between"}
					>
						<span>
							{t(
								categories?.data?.find(
									(el) => el.id === item?.review_category_id
								)?.name
							)}
						</span>
						<span>{formatNumber(item.rating).toFixed(1)}</span>
					</Flex>
				</Col>
			))}
		</Row>
	)

	return (
		<RatingContainer
			placement={"start"}
			text={
				hotelRating?.data?.average_rating
					? formatNumber(hotelRating?.data?.average_rating).toFixed(1)
					: ""
			}
		>
			<Card
				id={"reviews"}
				title={
					<Flex vertical={true} align={"start"} style={{ paddingLeft: 24 }}>
						<Title level={3} style={{ fontSize: "inherit" }}>
							Очень хорошо
						</Title>
						<Text type={"secondary"} style={{ fontSize: 12 }}>
							Основано на {formatNumber(hotelRating?.data?.reviews_count)}{" "}
							отзывах гостей
						</Text>
					</Flex>
				}
				styles={{
					extra: {
						width: "70%"
					},
					title: {
						height: "100%",
						marginBottom: "auto"
					},
					header: {
						paddingBlock: 12
					}
				}}
				cover={sm ? null : <Flex style={{ padding: 16 }}>{ratings}</Flex>}
				extra={sm ? ratings : null}
			>
				<List<HotelReview>
					itemLayout={"vertical"}
					loading={reviewsLoading}
					size={"large"}
					pagination={{
						current: params.page,
						onChange: (page, pageSize) => {
							setParams({ page, pageSize })
						},
						pageSize: params.pageSize
					}}
					dataSource={hotelReviews?.data}
					renderItem={(item) => (
						<List.Item
							key={item.id}
							extra={
								<Flex vertical={true} align={"end"}>
									<RatingTag>{Number(item?.rating).toFixed(1)}</RatingTag>
									{item?.review_category_ratings.map((value, index) => (
										<Flex key={index} vertical={true}>
											<Progress
												size={"small"}
												percent={(Number(value?.rating) || 0) * 10}
												showInfo={false}
											/>
											<Flex
												gap={8}
												style={{ width: "100%", fontSize: 12 }}
												justify={"space-between"}
											>
												<span>{t(value?.review_category?.name)}:</span>
												<span>
													{Number(Number(value?.rating) || 0).toFixed(1)}
												</span>
											</Flex>
										</Flex>
									))}
								</Flex>
							}
						>
							<List.Item.Meta
								avatar={<Avatar icon={<UserOutlined />} />}
								title={`${item?.user?.first_name || ""} ${item?.user?.last_name}`}
								description={formatCustomDate(item?.created_at, "D MMMM YYYY")}
							/>
							{item?.comment}
						</List.Item>
					)}
				/>
			</Card>
		</RatingContainer>
	)
}

export { HotelReviewsCard }
