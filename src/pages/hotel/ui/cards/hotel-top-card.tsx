import { EnvironmentFilled, HeartOutlined } from "@ant-design/icons"
import { Link, useParams } from "@tanstack/react-router"
import { Button, Card, Divider, Flex, Space } from "antd"
import { type FC } from "react"
import { useGetHotelsBySlugQuery } from "src/services/hotels"
import { useGetLocationBySlugQuery } from "src/services/locations"
import { useTranslation } from "src/shared/hooks"
import { Text, Title } from "src/shared/ui"
import { formatPriceWithCurrency } from "src/shared/utils/format.utils"

const HotelTopCard: FC = () => {
	const { hotelSlug, citySlug = "" } = useParams({
		strict: false
	})
	const { t } = useTranslation()
	const { data: city } = useGetLocationBySlugQuery(citySlug)
	const { data: hotel } = useGetHotelsBySlugQuery(hotelSlug)

	return (
		<Card>
			<Flex align={"center"}>
				<Button icon={<HeartOutlined />} size={"large"} shape={"circle"} />
				<Divider
					type={"vertical"}
					style={{ maxHeight: "100%", height: 50, display: "block" }}
				/>
				<Flex justify={"space-between"} style={{ width: "100%" }}>
					<Flex vertical={true} gap={6}>
						<Title level={4}>{t(hotel?.data?.name)}</Title>
						<Text type={"secondary"}>
							<Space split={<Text>•</Text>}>
								<Space>
									<EnvironmentFilled />
									<Link
										to={"."}
										search={(prev) => prev}
										hash={"location"}
									>{`${hotel?.data?.location?.address || ""}, ${city?.data?.name || ""}`}</Link>
								</Space>
								<Link to={"."}>Показать на карте</Link>
							</Space>
						</Text>
					</Flex>
					<Flex vertical={true} gap={6}>
						<Title level={4} style={{ textAlign: "end" }}>
							{formatPriceWithCurrency(hotel?.data?.price)}
						</Title>
						<Button type={"primary"}>Посмотреть цены</Button>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	)
}

export { HotelTopCard }
