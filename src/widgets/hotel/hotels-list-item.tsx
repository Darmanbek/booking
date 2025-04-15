import { ArrowRightOutlined } from "@ant-design/icons"
import { Link, useParams } from "@tanstack/react-router"
import { Badge, Button, Card, Flex, Image, List, Space } from "antd"
import { type FC } from "react"
import { type Hotel } from "src/services/hotels"
import { useToken, useTranslation } from "src/shared/hooks"
import { Text, Title } from "src/shared/ui"
import {
	formatNumber,
	formatPriceWithCurrency
} from "src/shared/utils/format.utils"
import { FavoriteButton } from "src/widgets/favorite-button"

interface HotelListItemProps {
	data?: Hotel
}

const HotelsListItem: FC<HotelListItemProps> = ({ data: hotel }) => {
	const { t } = useTranslation()
	const { citySlug = "" } = useParams({ strict: false })

	const { token } = useToken()
	return (
		<Badge.Ribbon
			text={hotel?.rating ? Number(hotel?.rating).toFixed(1) : ""}
			style={{ fontSize: 16, paddingBlock: 8 }}
		>
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
					<Flex style={{ position: "relative", padding: 12 }}>
						<Image.PreviewGroup>
							{hotel?.images?.map((image, index) => (
								<Image
									key={index}
									hidden={index !== 0}
									width={256}
									style={{
										aspectRatio: 1,
										borderRadius: token.borderRadiusLG,
										display: "flex",
										justifyContent: "center",
										alignItems: "center"
									}}
									alt={t(hotel?.name)}
									src={image?.image}
								/>
							))}
						</Image.PreviewGroup>
						<FavoriteButton
							data={hotel?.slug}
							style={{ position: "absolute", top: 20, left: 20 }}
						/>
					</Flex>
					<Flex
						vertical={true}
						justify={"space-between"}
						gap={20}
						style={{ padding: 20, paddingLeft: 8, flexGrow: 1 }}
					>
						<Flex vertical={true} align={"start"}>
							<Title level={4}>{t(hotel?.name)}</Title>
							<Link
								to={"."}
								search={(prev) => ({
									...prev,
									coordinates: `${hotel?.location?.coordinates?.latitude}-${hotel?.location?.coordinates?.longitude}`
								})}
							>
								<Space split={<Text>•</Text>}>
									{hotel?.location?.city}
									{"Показать на карте"}
									<Text>
										{formatNumber(hotel?.location?.distance_to_center).toFixed(
											1
										)}
										км от центра
									</Text>
								</Space>
							</Link>
						</Flex>
						<Flex justify={"space-between"} align={"end"}>
							<Flex vertical={true}>
								<Title level={3} style={{ margin: 0 }}>
									{formatPriceWithCurrency(hotel?.min_price)}
								</Title>
								<Text type={"secondary"}>
									за ночь для {formatNumber(hotel?.guests)} гостя
								</Text>
							</Flex>
							<Link
								to={"/hotels/$citySlug/$hotelSlug"}
								params={{
									citySlug,
									hotelSlug: hotel?.slug || ""
								}}
								target={"_blank"}
								search={(prev) => ({
									from_date: prev?.from_date,
									to_date: prev?.to_date,
									guests: prev?.guests
								})}
							>
								<Button
									iconPosition={"end"}
									type={"primary"}
									icon={<ArrowRightOutlined />}
									key={"link"}
									// onClick={onNavigateToHotel}
								>
									Показать номера
								</Button>
							</Link>
						</Flex>
					</Flex>
				</List.Item>
			</Card>
		</Badge.Ribbon>
	)
}

export { HotelsListItem }
