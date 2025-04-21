import { UserOutlined } from "@ant-design/icons"
import { Avatar, Flex, Image, List, Space } from "antd"
import { useResponsive } from "antd-style"
import { type FC } from "react"
import type { HotelRoom } from "src/services/hotels"
import { useToken } from "src/shared/hooks"
import { Text, Title } from "src/shared/ui"
import { formatPriceWithCurrency } from "src/shared/utils"

interface OrdersRoomListItemProps {
	data: HotelRoom
}

const OrdersRoomListItem: FC<OrdersRoomListItemProps> = ({ data: room }) => {
	const { token } = useToken()
	const { sm = true } = useResponsive()
	return (
		<>
			<List.Item style={{ width: "100%" }}>
				<Flex vertical={!sm} gap={12} flex={1} style={{ width: "100%" }}>
					<Flex>
						<Image.PreviewGroup>
							{room?.images?.length ? (
								room?.images?.map((image, index) => (
									<Image
										hidden={index !== 0}
										key={index}
										height={100}
										width={sm ? 175 : "100%"}
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
									alt={"Нет фото"}
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
					<Flex vertical={true} flex={1} gap={2}>
						<Title level={4} style={{ fontSize: 16 }}>
							{room?.room_type}
						</Title>
						<Text type={"secondary"}>
							Гость:{" "}
							<Space>
								<Avatar icon={<UserOutlined />} />
								<Text>{room?.guest_name || "Не указан"}</Text>
							</Space>
						</Text>
						<Text
							type={"secondary"}
						>{`Количество гостей: ${room?.guest_quantity}`}</Text>
						<Flex justify={"end"} style={{ marginTop: "auto" }}>
							<Title level={sm ? 4 : 5} style={{ margin: 0 }}>
								{formatPriceWithCurrency(room?.price)}
							</Title>
						</Flex>
					</Flex>
				</Flex>
			</List.Item>
		</>
	)
}

export { OrdersRoomListItem }
