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
				<FavoriteButton
					data={hotel?.data?.slug}
					shape={sm ? "circle" : "round"}
					size={"large"}
				>
					{sm ? "" : "В избранное"}
				</FavoriteButton>
				<Divider
					type={sm ? "vertical" : "horizontal"}
					style={{
						minHeight: sm ? 50 : "100%",
						height: "inherit",
						marginBlock: sm ? 0 : 8
					}}
				/>
				<Flex justify={"space-between"} style={{ width: "100%" }} wrap={true}>
					<Flex vertical={true} gap={6}>
						<Title level={4}>{t(hotel?.data?.name)}</Title>
						<Text type={"secondary"}>
							<Space wrap={true} split={<Text>•</Text>}>
								<Space>
									<EnvironmentFilled />
									{`${locationLoading ? t("Загрузка") : hotelLocation?.data?.address || "Адрес не указан"}, ${cityLoading ? "Загрузка" : t(city?.data?.name) || t("Город не указан")}`}
								</Space>
								<Link to={"."} search={(prev) => prev} hash={"location"}>
									{t("Показать на карте")}
								</Link>
							</Space>
						</Text>
					</Flex>
					<Flex vertical={true} gap={6} style={{ width: sm ? "auto" : "100%" }}>
						<Title level={4} style={{ textAlign: "end" }}>
							{t("От")} {formatPriceWithCurrency(hotel?.data?.min_price)}
						</Title>
						<Button
							type={"primary"}
							block={!sm}
							onClick={() =>
								navigate({ to: ".", hash: "rooms", search: (prev) => prev })
							}
						>
							{t("Посмотреть цены")}
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	)
}

export { HotelTopCard }
