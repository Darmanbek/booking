import { RightOutlined } from "@ant-design/icons"
import { Button, Collapse, Flex, Image, List, Space } from "antd"
import { type FC } from "react"
import { type HotelRoom } from "src/services/hotels"
import { useToken, useTranslation } from "src/shared/hooks"
import { Title } from "src/shared/ui"
import { HotelVariantList } from "./hotel-variant-list"

interface HotelVariantsCardItemProps {
	data: HotelRoom
}

const HotelVariantsCardItem: FC<HotelVariantsCardItemProps> = ({
	data: room
}) => {
	const { t } = useTranslation()
	const { token } = useToken()

	return (
		<List.Item>
			<Collapse
				expandIconPosition={"end"}
				ghost={true}
				style={{
					width: "100%"
				}}
				collapsible={"icon"}
				expandIcon={({ isActive, style }) => (
					<Button
						type={"text"}
						iconPosition={"end"}
						icon={<RightOutlined style={style} rotate={isActive ? 90 : 0} />}
					>
						Подробнее
					</Button>
				)}
				defaultActiveKey={["room"]}
				items={[
					{
						key: "room",
						label: (
							<Flex align={"stretch"} gap={12}>
								<Flex>
									<Image.PreviewGroup>
										{room?.images?.map((image, index) => (
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
										))}
									</Image.PreviewGroup>
								</Flex>
								<Flex vertical={true} flex={1} style={{ height: "100%" }}>
									<Title level={4} style={{ fontSize: 16 }}>
										{room?.room_type}
									</Title>
									<Space>
										{room?.amenities?.[0]?.hotel_amenities?.map((el) =>
											t(el.name)
										)}
									</Space>
								</Flex>
							</Flex>
						),
						children: <HotelVariantList data={room} />
					}
				]}
			/>
		</List.Item>
	)
}

export { HotelVariantsCardItem }
