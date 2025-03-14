import { ArrowRightOutlined, HeartOutlined } from "@ant-design/icons"
import { Link, useNavigate, useParams, useSearch } from "@tanstack/react-router"
import { Badge, Button, Card, Flex, Image, List, Space } from "antd"
import { type FC } from "react"
import type { Hotel } from "src/shared/data/hotel.data"
import { useToken } from "src/shared/hooks"
import { Text, Title } from "src/shared/ui"
import { formatPriceWithCurrency } from "src/shared/utils/format.utils"

interface HotelListItemProps {
	data: Hotel
}

const HotelListItem: FC<HotelListItemProps> = ({ data: hotel }) => {
	const { citySlug = "" } = useParams({ strict: false })
	const search = useSearch({
		strict: false
	})
	const navigate = useNavigate()

	const onNavigateToHotel = () => {
		navigate({
			to: "/hotels/$citySlug/$hotelSlug",
			params: {
				citySlug,
				hotelSlug: hotel.slug
			},
			search
		})
	}

	const { token } = useToken()
	return (
		<Badge.Ribbon text={hotel.rating} style={{ fontSize: 16, paddingBlock: 8 }}>
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
						<Image
							width={256}
							style={{ aspectRatio: 1, borderRadius: token.borderRadiusLG }}
							alt={hotel.name}
							src={hotel.image}
						/>
						<Button
							shape={"circle"}
							icon={<HeartOutlined />}
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
							<Title level={4}>{hotel.name}</Title>
							<Link to={"/"}>
								<Space split={<Text>•</Text>}>
									{hotel.city}
									{"Показать на карте"}
									<Text>4.1км от центра</Text>
								</Space>
							</Link>
						</Flex>
						<Flex justify={"space-between"} align={"end"}>
							<Flex vertical={true}>
								<Title level={3} style={{ margin: 0 }}>
									{formatPriceWithCurrency(hotel.price)}
								</Title>
								<Text type={"secondary"}>за ночь для 1 гостя</Text>
							</Flex>
							<Button
								iconPosition={"end"}
								type={"primary"}
								icon={<ArrowRightOutlined />}
								key={"link"}
								onClick={onNavigateToHotel}
							>
								Показать номера
							</Button>
						</Flex>
					</Flex>
				</List.Item>
			</Card>
		</Badge.Ribbon>
	)
}

export { HotelListItem }
