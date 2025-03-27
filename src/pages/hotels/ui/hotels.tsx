import { HomeOutlined } from "@ant-design/icons"
import { Link, useNavigate, useParams } from "@tanstack/react-router"
import { Breadcrumb, Card, Col, Flex, Row, Space } from "antd"
import dayjs from "dayjs"
import { type FC, useEffect } from "react"
import { cityData } from "src/shared/data/city.data"
import { hotelData } from "src/shared/data/hotel.data"
import { useSearchStore } from "src/shared/store/use-search-store"
import { Container, Title } from "src/shared/ui"
import { HotelsMapCard } from "./cards/hotels-map-card"
import { HotelsForm } from "./forms/hotels-form"
import { HotelsList } from "./lists/hotels-list"

const Hotels: FC = () => {
	const { citySlug } = useParams({
		strict: false
	})
	const { search, setSearch } = useSearchStore()
	const navigate = useNavigate()
	const city = cityData.find((el) => el.slug === citySlug)

	useEffect(() => {
		if (search) {
			navigate({
				to: ".",
				search: (prevSearch) => ({
					...prevSearch,
					from_date:
						prevSearch.from_date || dayjs(search.dates[0]).format("YYYY-MM-DD"),
					to_date:
						prevSearch.to_date || dayjs(search.dates[1]).format("YYYY-MM-DD"),
					guests: prevSearch.guests || search?.guests.join("-")
				})
			})
		}
	}, [])

	useEffect(() => {
		if (city) {
			setSearch({
				...search,
				search: city?.slug
			})
		}
	}, [city])
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
									title: city?.city
								}
							]}
						/>
					</Card>
					<Row gutter={20}>
						<Col span={8}>
							<Flex vertical={true} gap={20} style={{ height: "100%" }}>
								<HotelsMapCard data={hotelData} />
								<HotelsForm />
							</Flex>
						</Col>
						<Col span={16}>
							<Flex vertical={true} gap={20}>
								<Card>
									<Title level={4}>{city?.city}: доступно 368 вариантов</Title>
								</Card>
								<HotelsList />
							</Flex>
						</Col>
					</Row>
				</Flex>
			</Container>
		</section>
	)
}

export { Hotels }
