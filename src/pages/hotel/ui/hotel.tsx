import { HomeOutlined } from "@ant-design/icons"
import { Link, useParams, useSearch } from "@tanstack/react-router"
import { Breadcrumb, Card, Col, Flex, Row, Space } from "antd"
import dayjs from "dayjs"
import { type FC, useCallback, useState } from "react"
import { OrdersContext } from "src/pages/hotel/context"
import { HotelRoom, useGetHotelsBySlugQuery } from "src/services/hotels"
import { useGetLocationBySlugQuery } from "src/services/locations"
import { useTranslation } from "src/shared/hooks"
import { Container } from "src/shared/ui"
import {
	HotelComfortCard,
	HotelDescriptionCard,
	HotelMapCard,
	HotelOrdersCard,
	HotelPreviewCard,
	HotelRatingCard,
	HotelReviewsCard,
	HotelServicesCard,
	HotelTopCard,
	HotelVariantsCard
} from "./cards"

const Hotel: FC = () => {
	const [rooms, setRooms] = useState<
		{
			quantity: number
			room: HotelRoom
		}[]
	>([])
	const search = useSearch({ strict: false })
	const { hotelSlug, citySlug = "" } = useParams({
		strict: false
	})
	const { t } = useTranslation()
	const { data: city, isLoading: cityLoading } =
		useGetLocationBySlugQuery(citySlug)
	const { data: hotel, isLoading: hotelLoading } =
		useGetHotelsBySlugQuery(hotelSlug)

	const addRoom = useCallback((room: HotelRoom, quantity: number) => {
		setRooms((prev) => {
			const existing = prev.find((el) => el?.room?.id === room?.id)

			if (quantity === 0) {
				return prev.filter((el) => el?.room?.id !== room?.id)
			}

			if (existing) {
				return prev.map((el) =>
					el?.room?.id === room?.id ? { ...el, quantity } : el
				)
			}

			return [...prev, { room, quantity }]
		})
	}, [])

	return (
		<OrdersContext.Provider
			value={{
				rooms,
				addRoom
			}}
		>
			<section>
				<Container>
					<Flex vertical={true} gap={20}>
						<Card>
							<Breadcrumb
								items={[
									{
										title: (
											<Link to={"/"}>
												<Space>
													<HomeOutlined />
													Главная
												</Space>
											</Link>
										)
									},
									{
										title: (
											<Link
												to={"/hotels/$citySlug"}
												params={{ citySlug }}
												search={search}
											>
												{cityLoading
													? "Загрузка"
													: city
														? city?.data?.name
														: ""}
											</Link>
										)
									},
									search
										? {
												title:
													search.from_date &&
													search.to_date &&
													`${dayjs(search.from_date).format("dd, DD MMM")} — ${dayjs(search.to_date).format("dd, DD MMM")}`
											}
										: {},
									{
										title: hotelLoading ? "Загрузка" : t(hotel?.data?.name)
									}
								]}
							/>
						</Card>
						<HotelTopCard />
						<HotelPreviewCard />
						<Row gutter={20} style={{ rowGap: 20 }}>
							<Col xs={24} md={12}>
								<HotelRatingCard />
							</Col>
							<Col xs={24} md={12}>
								<HotelComfortCard />
							</Col>
						</Row>
						<Row gutter={20} style={{ rowGap: 20 }}>
							<Col xs={24} md={16}>
								<Flex vertical={true} gap={20}>
									<HotelMapCard />
									<HotelVariantsCard />
									<HotelDescriptionCard />
									<HotelServicesCard />
								</Flex>
							</Col>
							<Col xs={24} md={8}>
								<HotelOrdersCard />
							</Col>
						</Row>
						<HotelReviewsCard />
					</Flex>
				</Container>
			</section>
		</OrdersContext.Provider>
	)
}

export { Hotel }
