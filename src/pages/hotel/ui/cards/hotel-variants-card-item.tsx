import { UserOutlined } from "@ant-design/icons"
import { Avatar, Card, Collapse, Descriptions, Flex, Image, List } from "antd"
import { type FC } from "react"
import { useToken } from "src/shared/hooks"
import { Counter, Title } from "src/shared/ui"
import { formatPriceWithCurrency } from "src/shared/utils/format.utils"

const HotelVariantsCardItem: FC = () => {
	const { token } = useToken()
	return (
		<List.Item>
			<Collapse
				expandIconPosition={"end"}
				ghost={true}
				style={{
					width: "100%"
				}}
				defaultActiveKey={["room"]}
				items={[
					{
						key: "room",
						label: (
							<Flex align={"stretch"} gap={12}>
								<Flex>
									<Image
										height={100}
										width={175}
										src={"/hotel/hotel-room.jpg"}
										fallback={"/public/hotel/hotel-room.jpg"}
										style={{
											borderRadius: token.borderRadius,
											objectFit: "cover"
										}}
									/>
								</Flex>
								<Flex vertical={true} flex={1} style={{ height: "100%" }}>
									<Title level={4} style={{ fontSize: 16 }}>
										Апартаменты с душем
									</Title>
								</Flex>
							</Flex>
						),
						children: (
							<Flex
								style={{
									width: "100%",
									backgroundColor: token.colorBgLayout,
									padding: 12,
									borderRadius: token.borderRadius
								}}
							>
								<List
									grid={{
										gutter: 16,
										xs: 1,
										sm: 2,
										md: 3,
										lg: 4,
										xl: 5,
										xxl: 5
									}}
									style={{ width: "100%" }}
									dataSource={Array.from({ length: 5 }).fill({})}
									renderItem={(_, index) => (
										<List.Item>
											<Card
												actions={[
													<Counter
														style={{ width: "100%" }}
														key={"Counter"}
														min={0}
													/>
												]}
											>
												<Descriptions
													layout={"vertical"}
													column={1}
													items={[
														{
															key: "guests",
															label: "Количество гостей",
															children: (
																<Avatar.Group>
																	{Array.from({ length: index + 1 }).map(
																		(_, i) => (
																			<Avatar icon={<UserOutlined />} key={i} />
																		)
																	)}
																</Avatar.Group>
															)
														},
														{
															key: "price",
															label: "Цена за 1 ночь",
															children: (
																<Title level={5} style={{ fontSize: 14 }}>
																	{formatPriceWithCurrency(
																		300_000 * (index + 1)
																	)}
																</Title>
															)
														}
													]}
												/>
											</Card>
										</List.Item>
									)}
								/>
							</Flex>
						)
					}
				]}
			/>
		</List.Item>
	)
}

export { HotelVariantsCardItem }
