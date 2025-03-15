import {
	Avatar,
	Card,
	Col,
	Divider,
	Flex,
	List,
	Progress,
	Row,
	Space
} from "antd"
import { type FC } from "react"
import { Text, Title } from "src/shared/ui"
import { RatingContainer } from "src/widgets/rating-container"
import { RatingTag } from "src/widgets/rating-tag"

const data = Array.from({ length: 23 }).map((_, i) => ({
	title: `User ${i + 1}`,
	avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
	description: (
		<Space
			direction={"vertical"}
			split={<Divider style={{ marginBlock: 0 }} />}
		>
			<Space split={<Divider type={"vertical"} />}>
				<>отдых, в одиночку</>
				<>февраль 2024 г.</>
			</Space>
			<>
				Двухместный номер Standard с видом на город (двуспальная кровать)
				(кровать king size), 4 ночи
			</>
		</Space>
	),
	content:
		"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam aspernatur autem blanditiis corporis debitis delectus, deserunt dicta dolor dolore dolorem dolores ducimus enim error eveniet ex laboriosam nihil odit possimus repellat? Accusantium consequuntur dolorem eius minus odit perspiciatis quam."
}))

// const IconText = ({ icon, text }: { icon: FC; text: string }) => (
// 	<Space>
// 		{createElement(icon)}
// 		{text}
// 	</Space>
// )

const HotelReviewsCard: FC = () => {
	return (
		<RatingContainer placement={"start"} text={"7,1"}>
			<Card
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
				<List
					itemLayout={"vertical"}
					size={"large"}
					pagination={{
						onChange: (page) => {
							console.log(page)
						},
						pageSize: 3
					}}
					dataSource={data}
					renderItem={(item) => (
						<List.Item
							key={item.title}
							extra={
								<Flex vertical={true}>
									<Space size={2}>
										<RatingTag>7.5</RatingTag>
										<Text style={{ fontWeight: 600 }}>Очень хорошо</Text>
									</Space>
									{[85, 64, 84, 38].map((value, index) => (
										<Flex key={index} vertical={true}>
											<Progress
												size={"small"}
												percent={value}
												showInfo={false}
											/>
											<Flex
												gap={8}
												style={{ width: "100%", fontSize: 12 }}
												justify={"space-between"}
											>
												<span>Название</span>
												<span>{(value || 0) / 10}</span>
											</Flex>
										</Flex>
									))}
								</Flex>
							}
							// actions={[
							// 	<IconText
							// 		icon={StarOutlined}
							// 		text={"156"}
							// 		key={"list-vertical-star-o"}
							// 	/>,
							// 	<IconText
							// 		icon={LikeOutlined}
							// 		text={"156"}
							// 		key={"list-vertical-like-o"}
							// 	/>,
							// 	<IconText
							// 		icon={MessageOutlined}
							// 		text={"2"}
							// 		key={"list-vertical-message"}
							// 	/>
							// ]}
						>
							<List.Item.Meta
								avatar={<Avatar src={item.avatar} />}
								title={item.title}
								description={item.description}
							/>
							{item.content}
						</List.Item>
					)}
				/>
			</Card>
		</RatingContainer>
	)
}

export { HotelReviewsCard }
