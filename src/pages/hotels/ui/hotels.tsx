import { HomeOutlined } from "@ant-design/icons"
import { Link, useNavigate, useParams, useSearch } from "@tanstack/react-router"
import { Breadcrumb, Card, Col, Flex, Row, Space } from "antd"
import dayjs from "dayjs"
import { type FC, useEffect } from "react"
import { useGetHotelsSearchQuery } from "src/services/hotels"
import { useGetLocationBySlugQuery } from "src/services/locations"
import { useSearchStore } from "src/shared/store/use-search-store"
import { Container, Title } from "src/shared/ui"
import { formatDate, formatGuests } from "src/shared/utils"
import { HotelsMapCard } from "./cards/hotels-map-card"
import { HotelsForm } from "./forms/hotels-form"
import { HotelsList } from "./lists/hotels-list"

const Hotels: FC = () => {
	const { citySlug } = useParams({
		strict: false
	})
	const { search, setSearch } = useSearchStore()
	const navigate = useNavigate()
	const { data: city } = useGetLocationBySlugQuery(citySlug)

	const { dates, guests } = useSearchStore((state) => state.search)
	const searchParams = useSearch({
		strict: false
	})
	const {
		data: hotels,
		isLoading,
		isFetching
	} = useGetHotelsSearchQuery({
		city: citySlug,
		check_in: searchParams?.from_date || formatDate(dates[0]),
		check_out: searchParams?.to_date || formatDate(dates[1]),
		guests: formatGuests(searchParams?.guests) || guests
	})

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
		if (citySlug) {
			setSearch({
				...search,
				search: citySlug
			})
		}
	}, [citySlug])
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
									title: city ? city?.data?.name : "Загрузка"
								}
							]}
						/>
					</Card>
					<Row gutter={20}>
						<Col span={8}>
							<Flex vertical={true} gap={20} style={{ height: "100%" }}>
								<HotelsMapCard data={hotels?.data || []} />
								<HotelsForm />
							</Flex>
						</Col>
						<Col span={16}>
							<Flex vertical={true} gap={20}>
								<Card>
									<Title level={4}>
										{city ? city?.data?.name : "Загрузка"}: доступно{" "}
										{hotels?.pagination?.total || 0} вариантов
									</Title>
								</Card>
								<HotelsList
									data={hotels?.data || []}
									loading={isLoading || isFetching}
								/>
							</Flex>
						</Col>
					</Row>
				</Flex>
			</Container>
		</section>
	)
}

export { Hotels }
