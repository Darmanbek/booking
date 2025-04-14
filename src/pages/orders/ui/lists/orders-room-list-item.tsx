import { Flex, Image, List, Space } from "antd"
import { type FC } from "react"
import type { BookingRoom } from "src/services/booking"
import { useToken } from "src/shared/hooks"
import { Text, Title } from "src/shared/ui"
import { formatPriceWithCurrency } from "src/shared/utils"

interface OrdersRoomListItemProps {
	data: BookingRoom["room"]
}

const OrdersRoomListItem: FC<OrdersRoomListItemProps> = ({ data: room }) => {
	const { token } = useToken()
	return (
		<>
			<List.Item>
				<Flex gap={12} flex={1}>
					<Flex>
						<Image.PreviewGroup>
							{room?.images?.length ? (
								room?.images?.map((image, index) => (
									<Image
										hidden={index !== 0}
										key={index}
										height={100}
										width={175}
										src={image?.image}
										onClick={(e) => e.stopPropagation()}
										style={{
											borderRadius: token.borderRadius,
											objectFit: "cover"
										}}
									/>
								))
							) : (
								<Image
									height={100}
									width={175}
									src={""}
									onClick={(e) => e.stopPropagation()}
									style={{
										borderRadius: token.borderRadius,
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										objectFit: "cover"
									}}
								/>
							)}
						</Image.PreviewGroup>
					</Flex>
					<Flex vertical={true} flex={1}>
						<Space>
							<Title level={4} style={{ fontSize: 16 }}>
								{room?.room_type}
							</Title>
							<Text type={"secondary"}>{`(${room.room_area} м²)`}</Text>
						</Space>
						<Text
							type={"secondary"}
						>{`Количество гостей: ${room?.max_guests}`}</Text>
						<Flex justify={"end"} style={{ marginTop: "auto" }}>
							<Title level={4} style={{ margin: 0 }}>
								{formatPriceWithCurrency(room?.base_price)}
							</Title>
						</Flex>
					</Flex>
				</Flex>
			</List.Item>
		</>
	)
}

export { OrdersRoomListItem }
