import { RightOutlined } from "@ant-design/icons"
import { Button, Collapse, Flex, Image, List, Tag, Typography } from "antd"
import { useResponsive } from "antd-style"
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
	const { sm = true } = useResponsive()

	return (
		<List.Item>
			<Collapse
				expandIconPosition={"right"}
				ghost={true}
				style={{
					width: "100%"
				}}
				collapsible={"icon"}
				expandIcon={({ isActive, style }) =>
					sm ? (
						<Button
							type={"text"}
							iconPosition={"end"}
							icon={<RightOutlined style={style} rotate={isActive ? 90 : 0} />}
						>
							Подробнее
						</Button>
					) : null
				}
				defaultActiveKey={["room"]}
				items={[
					{
						key: "room",
						label: (
							<Flex vertical={true} gap={16}>
								<Flex vertical={!sm} align={"stretch"} gap={12}>
									<Flex>
										<Image.PreviewGroup>
											{room?.images?.map((image, index) => (
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
											))}
										</Image.PreviewGroup>
									</Flex>
									<Flex vertical={true} flex={1} style={{ height: "100%" }}>
										<Title level={4} style={{ fontSize: 16 }}>
											{room?.room_type}
										</Title>
									</Flex>
								</Flex>
								<Typography.Paragraph
									ellipsis={{
										rows: 2,
										expandable: "collapsible"
									}}
								>
									{room?.amenities?.flatMap((item) =>
										item?.room_amenities
											?.map((el) => el)
											.map((el, index) => (
												<Tag
													color={"blue-inverse"}
													key={index}
													bordered={false}
													style={{
														marginRight: 8,
														marginBottom: 8,
														border: 0,
														backgroundColor: "rgb(218, 231, 242)",
														color: "rgb(36,47,77)"
													}}
												>
													{t(el?.name)}
												</Tag>
											))
									)}
								</Typography.Paragraph>
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
