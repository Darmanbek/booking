import { UserOutlined } from "@ant-design/icons"
import { useParams } from "@tanstack/react-router"
import { Avatar, Card, Col, Flex, List, Progress, Row } from "antd"
import { type FC, useState } from "react"
import {
	HotelReview,
	useGetHotelsBySlugReviewsQuery
} from "src/services/hotels"
import { useTranslation } from "src/shared/hooks"
import { Text, Title } from "src/shared/ui"
import { formatCustomDate } from "src/shared/utils"
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
	const { data: hotelReviews, isLoading: reviewsLoading } =
		useGetHotelsBySlugReviewsQuery(hotelSlug, {
			page: params.page,
			page_size: params.pageSize
		})

	return (
		<RatingContainer placement={"start"} text={"7,1"}>
			<Card
				id={"reviews"}
				title={
					<Flex vertical={true} align={"start"} style={{ paddingLeft: 24 }}>
						<Title level={3} style={{ fontSize: "inherit" }}>
							Очень хорошо
						</Title>
						<Text type={"secondary"} style={{ fontSize: 12 }}>
							Основано на 11 отзывах гостей
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
				extra={
					<Row style={{ width: "100%" }} gutter={24}>
						{[85, 64, 84, 38, 68, 80, 75, 76].map((value, index) => (
							<Col span={8} key={index}>
								<Progress size={"small"} percent={value} showInfo={false} />
								<Flex
									gap={8}
									style={{ width: "100%", fontSize: 12 }}
									justify={"space-between"}
								>
									<span>Название</span>
									<span>{(value || 0) / 10}</span>
								</Flex>
							</Col>
						))}
					</Row>
				}
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
