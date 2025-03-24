import { RightOutlined } from "@ant-design/icons"
import { Button, Collapse, Flex, Image, List } from "antd"
import { type FC } from "react"
import { useToken } from "src/shared/hooks"
import { Title } from "src/shared/ui"
import { HotelVariantList } from "./hotel-variant-list"

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
									<Image
										height={100}
										width={175}
										src={"/hotel/hotel-room.jpg"}
										fallback={"/public/hotel/hotel-room.jpg"}
										onClick={(e) => e.stopPropagation()}
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
						children: <HotelVariantList />
					}
				]}
			/>
		</List.Item>
	)
}

export { HotelVariantsCardItem }
