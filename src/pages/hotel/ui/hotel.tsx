import { HomeOutlined } from "@ant-design/icons"
import { Link, useParams, useSearch } from "@tanstack/react-router"
import { Breadcrumb, Card, Flex, Space } from "antd"
import dayjs from "dayjs"
import { type FC } from "react"
import { cityData } from "src/shared/data/city.data"
import { hotelData } from "src/shared/data/hotel.data"
import { Container } from "src/shared/ui"
import {
	HotelComfortCard,
	HotelDescriptionCard,
	HotelMapCard,
	HotelPreviewCard,
	HotelRatingCard,
	HotelReviewsCard,
	HotelServicesCard,
	HotelTopCard
} from "./cards"

const Hotel: FC = () => {
	const search = useSearch({ strict: false })
	const { hotelSlug, citySlug } = useParams({
		strict: false
	})
	const city = cityData.find((el) => el.slug === citySlug)
	const hotel = hotelData.find((el) => el.slug === hotelSlug)

	return (
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
											params={{ citySlug: city?.slug || "" }}
											search={search}
										>
											{city?.title}
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
									title: hotel?.name
								}
							]}
						/>
					</Card>

					<HotelTopCard data={hotel} city={city} />
					<HotelPreviewCard data={hotel} />
					<HotelRatingCard />
					<HotelComfortCard />
					<HotelMapCard data={hotel} />
					<HotelDescriptionCard />
					<HotelServicesCard />
					<HotelReviewsCard />
				</Flex>
			</Container>
		</section>
	)
}

export { Hotel }
