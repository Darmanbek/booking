import { MessageOutlined } from "@ant-design/icons"
import { Button, Card, Collapse, Flex, Image, List, Space, Tag } from "antd"
import { useResponsive } from "antd-style"
import { type FC } from "react"
import { type Booking } from "src/services/booking"
import { useToken, useTranslation } from "src/shared/hooks"
import { useModalStore } from "src/shared/store"
import { Text, Title } from "src/shared/ui"
import {
	formatCustomDate,
	formatPriceWithCurrency
} from "src/shared/utils/format.utils"
import { RatingTag } from "src/widgets/rating-tag"
import { OrdersRoomList } from "./orders-room-list"

interface HotelListItemProps {
	data?: Booking
}

const OrdersListItem: FC<HotelListItemProps> = ({ data: booking }) => {
	const { t } = useTranslation()
	const { sm = true } = useResponsive()
	const { setParams } = useModalStore()

	const { token } = useToken()
	return (
		<Card
			style={{
				marginBottom: 20,
				overflow: "hidden"
			}}
			styles={{
				body: {
					padding: 0
				}
			}}
		>
			<List.Item style={{ padding: 0, alignItems: "stretch" }}>
				<Collapse
					ghost={true}
					expandIconPosition={"end"}
					expandIcon={sm ? undefined : () => null}
					style={{ width: "100%" }}
					items={[
						{
							key: "hotel",
							label: (
								<Flex vertical={!sm} align={"stretch"} flex={1}>
									<Flex style={{ position: "relative", padding: 12 }}>
										<Image.PreviewGroup>
											{booking?.hotel_info?.images?.length ? (
												booking?.hotel_info?.images?.map((image, index) => (
													<Image
														onClick={(e) => e.stopPropagation()}
														key={index}
														hidden={index !== 0}
														width={sm ? 164 : "100%"}
														height={sm ? 164 : "100%"}
														style={{
															aspectRatio: 1,
															borderRadius: token.borderRadiusLG,
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															objectFit: "cover"
														}}
														alt={t(booking?.hotel_info?.name)}
														src={image?.image}
													/>
												))
											) : (
												<Image
													onClick={(e) => e.stopPropagation()}
													width={164}
													height={164}
													style={{
														aspectRatio: 1,
														borderRadius: token.borderRadiusLG,
														display: "flex",
														justifyContent: "center",
														alignItems: "center"
													}}
													alt={t(booking?.hotel_info?.name)}
													src={""}
												/>
											)}
										</Image.PreviewGroup>
									</Flex>
									<Flex
										vertical={true}
										justify={"space-between"}
										gap={20}
										style={{ padding: 20, paddingLeft: 8, flexGrow: 1 }}
									>
										<Flex vertical={!sm} gap={16} justify={"space-between"}>
											<Flex vertical={true} align={"start"} gap={4}>
												<Title level={4}>{t(booking?.hotel_info?.name)}</Title>
												<a
													href={`https://www.google.com/maps?q=${booking?.hotel_info?.location?.latitude} ${booking?.hotel_info?.location?.longitude}`}
													target={"_blank"}
													onClick={(e) => e.stopPropagation()}
													rel={"nofollow"}
												>
													<Space split={<Text>•</Text>}>
														{t(booking?.hotel_info?.location?.city)}
														{"Показать на карте"}
													</Space>
												</a>
												<Text type={"secondary"}>
													{booking?.hotel_info?.location?.address}
												</Text>
												<Tag color={"blue"}>{t(booking?.status)}</Tag>
											</Flex>
											<Flex
												justify={"center"}
												style={{ width: sm ? "auto" : "100%" }}
											>
												<Space>
													{[
														{
															title: "Заезд",
															date: booking?.check_in_date
														},
														{
															title: "Выезд",
															date: booking?.check_out_date
														}
													].map((item, index) => (
														<Flex vertical={true} gap={4} key={index}>
															<Text
																type={"secondary"}
																style={{
																	textAlign: "center"
																}}
															>
																{item?.title}
															</Text>
															<RatingTag
																color={"blue"}
																style={{
																	fontSize: 14
																}}
															>
																<Title
																	level={4}
																	style={{
																		color: "inherit",
																		textAlign: "center"
																	}}
																>
																	{formatCustomDate(item?.date, "D")}
																</Title>
																<Text
																	style={{
																		color: "inherit",
																		textAlign: "center",
																		textTransform: "capitalize"
																	}}
																>
																	{formatCustomDate(item?.date, "MMMM YYYY")}
																</Text>
															</RatingTag>
															<Text
																style={{
																	textTransform: "capitalize",
																	textAlign: "center"
																}}
															>
																{formatCustomDate(item?.date, "dddd")}
															</Text>
														</Flex>
													))}
												</Space>
											</Flex>
										</Flex>
										<Flex
											vertical={!sm}
											gap={16}
											justify={"space-between"}
											align={sm ? "end" : "start"}
										>
											<Title level={sm ? 3 : 4} style={{ margin: 0 }}>
												Всего {formatPriceWithCurrency(booking?.total_price)}
											</Title>
											<Button
												type={"primary"}
												block={!sm}
												onClick={(e) => {
													e.stopPropagation()
													if (booking) {
														setParams(booking)
													}
												}}
												icon={<MessageOutlined />}
											>
												Оставить отзыв
											</Button>
										</Flex>
									</Flex>
								</Flex>
							),
							children: <OrdersRoomList data={booking?.booking_rooms} />
						}
					]}
				/>
			</List.Item>
		</Card>
	)
}

export { OrdersListItem }
