import {
	ArrowRightOutlined,
	HeartOutlined,
	StarFilled
} from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import { Button, Card, Flex, Image, Space, Tag } from "antd"
import { type FC } from "react"
import { type Hotel } from "src/shared/data/hotel.data"
import { useToken } from "src/shared/hooks"
import { Text, Title } from "src/shared/ui"
import { formatPriceWithCurrency } from "src/shared/utils/format.utils"

interface HotelCardProps {
	data: Hotel
}

const HotelCard: FC<HotelCardProps> = ({ data: hotel }) => {
	const { token } = useToken()
	return (
		<div style={{ position: "relative" }}>
			<Button
				icon={<HeartOutlined />}
				shape={"circle"}
				style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}
			/>
			<Link
				to={"/hotels/$citySlug/$hotelSlug"}
				target={"_blank"}
				params={{
					citySlug: hotel?.city?.slug,
					hotelSlug: hotel?.slug
				}}
			>
				<Card
					styles={{
						body: {
							padding: 12,
							paddingTop: 0
						}
					}}
					hoverable={true}
					style={{
						minWidth: 302,
						maxWidth: 628,
						width: "100%",
						overflow: "hidden",
						cursor: "pointer"
					}}
					cover={
						<Flex style={{ width: "100%", padding: 12 }}>
							<Image
								preview={false}
								loading={"lazy"}
								height={256}
								width={"100%"}
								style={{
									width: "100%",
									objectFit: "cover",
									borderRadius: token.borderRadiusLG
								}}
								role={"presentation"}
								src={hotel.image}
								alt={""}
							/>
						</Flex>
					}
				>
					<Flex vertical={true} gap={8}>
						<Flex align={"start"} justify={"space-between"} gap={12}>
							<Flex vertical={true} gap={2} style={{ width: "100%" }}>
								<Flex gap={2} justify={"space-between"} align={"center"}>
									<Title level={4}>{hotel.name}</Title>
									<Tag
										color={"blue-inverse"}
										style={{ fontSize: 16, paddingBlock: 6 }}
									>
										{hotel.rating}
									</Tag>
								</Flex>
								<Space split={"•"}>
									<Text type={"secondary"} style={{ fontSize: 12 }}>
										{hotel.city?.city}
									</Text>
									<Text style={{ fontSize: 12 }}>
										{hotel.distance} км от центра
									</Text>
								</Space>
							</Flex>
						</Flex>
						<Space>
							<StarFilled style={{ color: "orange" }} />
							<Text type={"secondary"} style={{ fontSize: 12 }}>
								8 089 отзывов
							</Text>
						</Space>
						<Flex align={"end"} justify={"space-between"} gap={12}>
							<Flex vertical={true} justify={"space-between"}>
								<Title level={5}>{formatPriceWithCurrency(hotel.price)}</Title>
								<Text type={"secondary"} style={{ fontSize: 12 }}>
									за ночь для 1 гостя
								</Text>
							</Flex>
							<Button
								type={"link"}
								icon={<ArrowRightOutlined />}
								iconPosition={"end"}
							>
								Подробнее
							</Button>
						</Flex>
					</Flex>
				</Card>
			</Link>
		</div>
	)
}

export { HotelCard }
