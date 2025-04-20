import { EnvironmentFilled } from "@ant-design/icons"
import { Link, useNavigate, useParams } from "@tanstack/react-router"
import { Button, Card, Divider, Flex, Space } from "antd"
import { useResponsive } from "antd-style"
import { type FC } from "react"
import {
	useGetHotelsBySlugLocationQuery,
	useGetHotelsBySlugQuery
} from "src/services/hotels"
import { useGetLocationBySlugQuery } from "src/services/locations"
import { useTranslation } from "src/shared/hooks"
import { Text, Title } from "src/shared/ui"
import { formatPriceWithCurrency } from "src/shared/utils/format.utils"
import { FavoriteButton } from "src/widgets/favorite-button"

const HotelTopCard: FC = () => {
	const { hotelSlug, citySlug = "" } = useParams({
		strict: false
	})
	const navigate = useNavigate({
		from: "/hotels/$citySlug/$hotelSlug"
	})
	const { sm = true } = useResponsive()

	const { t } = useTranslation()
	const { data: city, isLoading: cityLoading } =
		useGetLocationBySlugQuery(citySlug)
	const { data: hotel, isLoading: hotelLoading } =
		useGetHotelsBySlugQuery(hotelSlug)
	const { data: hotelLocation, isLoading: locationLoading } =
		useGetHotelsBySlugLocationQuery(hotelSlug)

	return (
		<Card loading={cityLoading || hotelLoading || locationLoading}>
			<Flex align={"center"} vertical={!sm}>
				<FavoriteButton data={hotel?.data?.slug} size={"large"} />
				<Divider
					type={sm ? "vertical" : "horizontal"}
					style={{
						maxHeight: "100%",
						height: "inherit",
						display: "block",
						marginBlock: 4
					}}
				/>
				<Flex justify={"space-between"} style={{ width: "100%" }} wrap={true}>
					<Flex vertical={true} gap={6}>
						<Title level={4}>{t(hotel?.data?.name)}</Title>
						<Text type={"secondary"}>
							<Space wrap={true} split={<Text>•</Text>}>
								<Space>
									<EnvironmentFilled />
									{`${locationLoading ? "Загрузка" : hotelLocation?.data?.address || "Неизвестный адрес"}, ${cityLoading ? "Загрузка" : city?.data?.name || "Неизвестный город"}`}
								</Space>
								<Link to={"."} search={(prev) => prev} hash={"location"}>
									Показать на карте
								</Link>
							</Space>
						</Text>
					</Flex>
					<Flex vertical={true} gap={6}>
						<Title level={4} style={{ textAlign: "end" }}>
							От {formatPriceWithCurrency(hotel?.data?.min_price)}
						</Title>
						<Button
							type={"primary"}
							onClick={() =>
								navigate({ to: ".", hash: "rooms", search: (prev) => prev })
							}
						>
							Посмотреть цены
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	)
}

export { HotelTopCard }
