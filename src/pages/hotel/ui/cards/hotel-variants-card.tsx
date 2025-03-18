import { UserOutlined } from "@ant-design/icons"
import { Avatar, Card, Collapse, Flex, Image, List, Space } from "antd"
import { type FC } from "react"
import { useToken } from "src/shared/hooks"
import { Counter, Title } from "src/shared/ui"
import { formatPriceWithCurrency } from "src/shared/utils/format.utils"

const HotelVariantsCard: FC = () => {
	const { token } = useToken()
	return (
		<Card title={"Доступные варианты"}>
			<List
				dataSource={Array.from({ length: 5 }).fill({})}
				renderItem={() => (
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
											vertical={true}
											style={{
												width: "100%",
												backgroundColor: token.colorBgLayout,
												padding: 12,
												borderRadius: token.borderRadius
											}}
										>
											<List
												dataSource={Array.from({ length: 5 }).fill({})}
												renderItem={() => (
													<Card style={{ width: "100%", marginBottom: 12 }}>
														<List.Item
															extra={<Counter min={0} />}
															style={{
																width: "100%",
																gap: 12
															}}
														>
															<Space>
																<Avatar.Group>
																	<Avatar icon={<UserOutlined />} />
																	<Avatar icon={<UserOutlined />} />
																</Avatar.Group>
																<Title level={5} style={{ fontSize: 14 }}>
																	Количество гостей: 2
																</Title>
															</Space>
															<Space>
																<Title level={5} style={{ fontSize: 14 }}>
																	Цена за 1 ночь:
																</Title>
																<Title level={5} style={{ fontSize: 14 }}>
																	{formatPriceWithCurrency(800_000)}
																</Title>
															</Space>
														</List.Item>
													</Card>
												)}
											/>
										</Flex>
									)
								}
							]}
						/>
					</List.Item>
				)}
			/>
		</Card>
	)
}

export { HotelVariantsCard }
