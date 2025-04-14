import { Card, Collapse, Flex, Image, List, Space } from "antd"
import { type FC } from "react"
import { type Booking } from "src/services/booking"
import { useToken, useTranslation } from "src/shared/hooks"
import { Text, Title } from "src/shared/ui"
import {
	formatCustomDate,
	formatPriceWithCurrency
} from "src/shared/utils/format.utils"
import { OrdersRoomList } from "./orders-room-list"

interface HotelListItemProps {
	data?: Booking
}

const OrdersListItem: FC<HotelListItemProps> = ({ data: booking }) => {
	const { t } = useTranslation()

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
					items={[
						{
							key: "hotel",
							label: (
								<Flex align={"stretch"}>
									<Flex style={{ position: "relative", padding: 12 }}>
										<Image.PreviewGroup>
											{booking?.hotel_info?.images?.length ? (
												booking?.hotel_info?.images?.map((image, index) => (
													<Image
														key={index}
														hidden={index !== 0}
														width={164}
														style={{
															aspectRatio: 1,
															borderRadius: token.borderRadiusLG,
															display: "flex",
															justifyContent: "center",
															alignItems: "center"
														}}
														alt={t(booking?.hotel_info?.name)}
														src={image?.image}
													/>
												))
											) : (
												<Image
													width={256}
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
										<Flex vertical={true} align={"start"}>
											<Title level={4}>{t(booking?.hotel_info?.name)}</Title>
											<a
												href={`https://www.google.com/maps?q=${booking?.hotel_info?.location?.latitude} ${booking?.hotel_info?.location?.longitude}`}
												target={"_blank"}
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
										</Flex>
										<Flex justify={"space-between"} align={"end"}>
											<Flex vertical={true}>
												<Text type={"secondary"}>
													Дата заезда:{" "}
													{formatCustomDate(
														booking?.check_in_date,
														"dddd, D MMMM"
													)}
												</Text>
												<Text type={"secondary"}>
													Дата отъезда:{" "}
													{formatCustomDate(
														booking?.check_out_date,
														"dddd, D MMMM"
													)}
												</Text>
											</Flex>
											<Title level={3} style={{ margin: 0 }}>
												{formatPriceWithCurrency(booking?.total_price)}
											</Title>
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
