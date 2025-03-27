import {
	ArrowRightOutlined,
	HomeOutlined,
	SearchOutlined
} from "@ant-design/icons"
import { useLocation, useNavigate, useSearch } from "@tanstack/react-router"
import { Button, Card, Flex, Form, type FormProps, Select, Tabs } from "antd"
import dayjs from "dayjs"
import { type FC, useEffect } from "react"
import { cityData } from "src/shared/data/city.data"
import {
	type SearchChange,
	useSearchStore
} from "src/shared/store/use-search-store"
import { SearchDates } from "src/widgets/search/search-dates"
import { SearchGuests } from "src/widgets/search/search-guests"
import { useNavbarStyles } from "./navbar.style"

const NavbarSearch: FC = () => {
	const { pathname } = useLocation()
	const isHome = pathname === "/"
	const navigate = useNavigate()
	const { search, setSearch } = useSearchStore()
	const searchParams = useSearch({
		strict: false
	})

	const [form] = Form.useForm<SearchChange>()
	const guests = Form.useWatch("guests", form) || []
	const { styles } = useNavbarStyles()
	const today = dayjs().startOf("week")

	const onFinish: FormProps<SearchChange>["onFinish"] = (values) => {
		setSearch(values)
		if (values.dates) {
			values.dates = [
				dayjs(values.dates[0]).format("YYYY-MM-DD"),
				dayjs(values.dates[1]).format("YYYY-MM-DD")
			]
		}
		navigate({
			to: "/hotels/$citySlug",
			params: {
				citySlug: values.search
			},
			search: {
				from_date: values.dates[0] as string,
				to_date: values.dates[1] as string,
				guests: values.guests.join("-")
			}
		})
	}

	useEffect(() => {
		setSearch({
			...search,
			guests: searchParams?.guests
				? searchParams.guests?.split("-").map((guest) => Number(guest) || 1)
				: search.guests,
			dates: [
				searchParams?.from_date || search.dates[0],
				searchParams?.to_date || search.dates[1]
			]
		})
		if (search) {
			form.setFieldsValue({
				...search,
				dates: [
					dayjs(searchParams?.from_date || search.dates[0]),
					dayjs(searchParams?.to_date || search.dates[1])
				],
				guests: searchParams?.guests
					? searchParams.guests?.split("-").map((guest) => Number(guest) || 1)
					: search.guests
			})
		}
	}, [])

	return (
		<>
			{isHome && (
				<Tabs
					className={styles.tabBar}
					type={"card"}
					activeKey={"hotels"}
					style={{ width: "auto", margin: 0 }}
					tabBarStyle={{
						margin: 0,
						border: 0
					}}
					tabBarExtraContent={
						<Button
							size={"large"}
							style={{
								marginLeft: 8,
								marginBottom: 8
							}}
							icon={<ArrowRightOutlined rotate={-45} />}
							iconPosition={"end"}
						>
							Для командировок
						</Button>
					}
					items={[
						{
							key: "hotels",
							label: "Отели и квартиры"
						}
					]}
				/>
			)}
			<Card
				style={
					isHome
						? {
								borderTopLeftRadius: 0
							}
						: {}
				}
			>
				<Form
					onFinish={onFinish}
					name={"search-form"}
					autoComplete={"off"}
					requiredMark={false}
					form={form}
				>
					<Flex
						gap={8}
						style={{
							width: "100%"
						}}
					>
						<Form.Item<SearchChange>
							name={"search"}
							noStyle={true}
							initialValue={cityData[0].slug}
						>
							<Select
								options={cityData.map((item) => ({
									value: item.slug,
									label: item.city
								}))}
								showSearch={true}
								optionFilterProp={"label"}
								prefix={<HomeOutlined />}
								placeholder={"Куда вы хотите поехать?"}
								size={"large"}
								style={{
									minHeight: 50,
									width: "100%"
								}}
							/>
						</Form.Item>
						<Form.Item<SearchChange>
							name={"dates"}
							noStyle={true}
							initialValue={[today.day(6), today.day(7)]}
						>
							<SearchDates />
						</Form.Item>
						<Form.List name={"guests"} initialValue={[1]}>
							{(fields, { add, remove }) => (
								<SearchGuests
									guests={guests}
									fields={fields}
									add={add}
									remove={remove}
								/>
							)}
						</Form.List>
						<Button
							icon={<SearchOutlined />}
							iconPosition={"end"}
							style={{ minHeight: 50 }}
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
