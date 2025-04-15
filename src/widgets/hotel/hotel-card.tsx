import {
	ArrowRightOutlined,
	HeartOutlined,
	StarFilled
} from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import { Button, Card, Flex, Image, Space } from "antd"
import { type FC } from "react"
import { type Hotel } from "src/services/hotels"
import { useToken, useTranslation } from "src/shared/hooks"
import { Text, Title } from "src/shared/ui"
import {
	formatNumber,
	formatPrice,
	formatPriceWithCurrency
} from "src/shared/utils"
import { RatingTag } from "src/widgets/rating-tag"

interface HotelCardProps {
	data: Hotel
}

const HotelCard: FC<HotelCardProps> = ({ data: hotel }) => {
	const { token } = useToken()
	const { t } = useTranslation()
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
					citySlug: hotel?.location?.city_slug,
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
								src={hotel?.images?.[0]?.image}
								alt={""}
							/>
						</Flex>
					}
				>
					<Flex vertical={true} gap={8}>
						<Flex align={"start"} justify={"space-between"} gap={12}>
							<Flex vertical={true} gap={2} style={{ width: "100%" }}>
								<Flex gap={2} justify={"space-between"} align={"center"}>
									<Title level={4}>{t(hotel.name)}</Title>
									<RatingTag>{hotel.rating}</RatingTag>
								</Flex>
								<Space split={"•"}>
									<Text type={"secondary"} style={{ fontSize: 12 }}>
										{hotel.location?.city}
									</Text>
									<Text style={{ fontSize: 12 }}>
										{formatNumber(hotel?.location?.to_city_center)} км от центра
									</Text>
								</Space>
							</Flex>
						</Flex>
						<Space>
							<StarFilled style={{ color: "orange" }} />
							<Text type={"secondary"} style={{ fontSize: 12 }}>
								{formatPrice(hotel?.reviews_count)} отзывов
							</Text>
						</Space>
						<Flex align={"end"} justify={"space-between"} gap={12}>
							<Flex vertical={true} justify={"space-between"}>
								<Title level={5}>
									{formatPriceWithCurrency(hotel?.min_price)}
								</Title>
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
