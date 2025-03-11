import { HeartOutlined } from "@ant-design/icons"
import { Button, Card, Flex, Image, Space, Tag } from "antd"
import { type FC } from "react"
import { useToken } from "src/shared/hooks"
import { Text, Title } from "src/shared/ui"

const HotelCard: FC = () => {
	const { token } = useToken()
	return (
		<Card
			styles={{
				body: {
					padding: 8
				}
			}}
			style={{ maxWidth: 263, overflow: "hidden", cursor: "pointer" }}
			cover={
				<Image
					preview={false}
					loading={"lazy"}
					width={263}
					height={212}
					style={{
						objectFit: "cover"
					}}
					role={"presentation"}
					src={"/hotel/delta-hotel.jpg"}
					alt={""}
				/>
			}
		>
			<Button
				icon={<HeartOutlined />}
				shape={"circle"}
				style={{ position: "absolute", top: 8, right: 8 }}
			/>
			<Flex vertical={true} gap={8}>
				<Flex vertical={true} gap={2}>
					<Title level={5} style={{ fontSize: 14 }}>
						Al Khoory Executive Hotel, Al Wasl
					</Title>
					<Text type={"secondary"} style={{ fontSize: 12 }}>
						Дубай, ОАЭ
					</Text>
				</Flex>
				<Space
					size={3}
					split={
						<Text type={"secondary"} style={{ fontSize: 12 }}>
							•
						</Text>
					}
				>
					<Space size={2}>
						<Tag color={"blue-inverse"}>8.7</Tag>
						<Text style={{ fontSize: 12 }}>Потрясающие</Text>
					</Space>
					<Text type={"secondary"} style={{ fontSize: 12 }}>
						8 089 отзывов
					</Text>
				</Space>
				<Flex gap={8} align={"center"} justify={"space-between"}>
					<Text type={"secondary"} style={{ fontSize: 12 }}>
						2 ночи
					</Text>
					<Space>
						<Title
							level={5}
							style={{
								fontSize: 14,
								fontWeight: 400,
								color: token.red,
								textDecoration: "line-through"
							}}
						>
							UZS 1 800 636
						</Title>
						<Title level={5} style={{ fontSize: 14 }}>
							UZS 1 800 636
						</Title>
					</Space>
				</Flex>
			</Flex>
		</Card>
	)
}

export { HotelCard }
