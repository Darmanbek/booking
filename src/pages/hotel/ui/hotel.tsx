import { HomeOutlined } from "@ant-design/icons"
import { Link, useParams, useSearch } from "@tanstack/react-router"
import { Breadcrumb, Flex, Space } from "antd"
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
	HotelTopCard
} from "./cards"

const Hotel: FC = () => {
	const search = useSearch({ strict: false })
	const { hotelSlug, citySlug } = useParams({
		from: "/_layout/hotels/$citySlug/$hotelSlug"
	})
	const city = cityData.find((el) => el.slug === citySlug)
	const hotel = hotelData.find((el) => el.slug === hotelSlug)

	return (
		<section>
			<Container>
				<Flex vertical={true} gap={20}>
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

					<HotelTopCard data={hotel} city={city} />
					<HotelPreviewCard data={hotel} />
					<HotelComfortCard />
					<HotelMapCard />
					<HotelDescriptionCard />
				</Flex>
			</Container>
		</section>
	)
}

export { Hotel }
