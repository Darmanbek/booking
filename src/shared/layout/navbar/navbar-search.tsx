import {
	HomeOutlined,
	LoadingOutlined,
	SearchOutlined
} from "@ant-design/icons"
import {
	useLocation,
	useMatchRoute,
	useNavigate,
	useParams,
	useSearch
} from "@tanstack/react-router"
import { Button, Card, Flex, Form, type FormProps, Select, Tabs } from "antd"
import { useResponsive } from "antd-style"
import dayjs from "dayjs"
import { type FC, useEffect, useMemo } from "react"
import { cityData } from "src/shared/data"
import { type SearchChange, useSearchStore } from "src/shared/store"
import { formatDate } from "src/shared/utils"
import { SearchDates, SearchGuests } from "src/widgets/search"
import { useNavbarStyles } from "./navbar.style"
import "dayjs/locale/ru"

dayjs.locale("ru")

const NavbarSearch: FC = () => {
	const [form] = Form.useForm<SearchChange>()
	const { md = true } = useResponsive()
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const { citySlug } = useParams({ strict: false })
	const { search, setSearch } = useSearchStore()
	const { styles } = useNavbarStyles()
	const searchParams = useSearch({ strict: false })
	const match = useMatchRoute()

	const isHome = pathname === "/"
	const today = useMemo(() => dayjs().startOf("week"), [])

	const guests = Form.useWatch("guests", form) || []

	const params = match({
		to: "/hotels/$citySlug",
		pending: true
	})

	// Объединённая memo-логика
	const { currentCity, currentDates, currentGuests } = useMemo(() => {
		const from = searchParams.from_date || search.dates[0]
		const to = searchParams.to_date || search.dates[1]

		return {
			currentCity: citySlug || search.search,
			currentDates: {
				from_date: from,
				to_date: to
			},
			currentGuests: searchParams?.guests
				? searchParams.guests.split("-").map(Number)
				: search.guests
		}
	}, [citySlug, search, searchParams])

	const formattedFrom = formatDate(currentDates.from_date)
	const formattedTo = formatDate(currentDates.to_date)

	const onFinish: FormProps<SearchChange>["onFinish"] = (values) => {
		const [from, to] = values.dates.map(formatDate)

		navigate({
			to: "/hotels/$citySlug",
			params: { citySlug: values.search },
			search: {
				from_date: from,
				to_date: to,
				guests: values.guests.join("-")
			}
		})
	}

	// Обновление store при расхождении с текущими значениями
	useEffect(() => {
		const storeFrom = formatDate(search.dates[0])
		const storeTo = formatDate(search.dates[1])

		if (
			currentCity !== search.search ||
			formattedFrom !== storeFrom ||
			formattedTo !== storeTo ||
			JSON.stringify(currentGuests) !== JSON.stringify(search.guests)
		) {
			setSearch({
				search: currentCity,
				dates: [dayjs(currentDates.from_date), dayjs(currentDates.to_date)],
				guests: currentGuests
			})
		}
	}, [
		currentCity,
		formattedFrom,
		formattedTo,
		currentGuests,
		search,
		setSearch
	])

	// Установка значений формы
	useEffect(() => {
		form.setFieldsValue({
			search: currentCity,
			dates: [dayjs(currentDates.from_date), dayjs(currentDates.to_date)],
			guests: currentGuests
		})
	}, [currentCity, currentDates, currentGuests, form])

	return (
		<>
			{isHome && (
				<Tabs
					className={styles.tabBar}
					type={"card"}
					activeKey={"hotels"}
					style={{ width: "auto", margin: 0 }}
					tabBarStyle={{ margin: 0, border: 0 }}
					items={[
						{
							key: "hotels",
							label: "Отели и квартиры"
						}
					]}
				/>
			)}
			<Card style={isHome ? { borderTopLeftRadius: 0 } : {}}>
				<Form
					form={form}
					name={"search-form"}
					autoComplete={"off"}
					requiredMark={false}
					onFinish={onFinish}
				>
					<Flex gap={8} style={{ width: "100%" }} wrap={true}>
						<Form.Item name={"search"} noStyle={true}>
							<Select
								options={cityData.map(({ slug, city }) => ({
									value: slug,
									label: city
								}))}
								showSearch={true}
								optionFilterProp={"label"}
								prefix={<HomeOutlined />}
								placeholder={"Куда вы хотите поехать?"}
								size={"large"}
								style={{
									minHeight: 50,
									flexBasis: "auto",
									flexGrow: 1
								}}
							/>
						</Form.Item>

						<Form.Item
							name={"dates"}
							noStyle={true}
							initialValue={[today.day(6), today.day(7)]}
						>
							<SearchDates style={md ? {} : { width: "100%", minWidth: 0 }} />
						</Form.Item>

						<Form.List name={"guests"} initialValue={[1]}>
							{(fields, { add, remove }) => (
								<SearchGuests
									style={md ? {} : { width: "100%", minWidth: 0 }}
									guests={guests}
									fields={fields}
									add={add}
									remove={remove}
								/>
							)}
						</Form.List>

						<Button
							icon={params ? <LoadingOutlined /> : <SearchOutlined />}
							iconPosition={"end"}
							style={{
								minHeight: 50,
								width: md ? undefined : "100%"
							}}
							type={"primary"}
							size={"large"}
							htmlType={"submit"}
						>
							Найти
						</Button>
					</Flex>
				</Form>
			</Card>
		</>
	)
}

export { NavbarSearch }
