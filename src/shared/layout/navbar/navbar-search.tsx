import {
	ArrowRightOutlined,
	HomeOutlined,
	SearchOutlined,
	UserOutlined
} from "@ant-design/icons"
import { useLocation, useNavigate } from "@tanstack/react-router"
import {
	Button,
	Card,
	DatePicker,
	Flex,
	Form,
	type FormProps,
	Select,
	Space,
	Tabs
} from "antd"
import dayjs from "dayjs"
import { type FC, useEffect } from "react"
import { cityData } from "src/shared/data/city.data"
import {
	type SearchChange,
	useSearchStore
} from "src/shared/store/use-search-store"
import { Text } from "src/shared/ui"
import { GuestCountList } from "./guest-count/guest-count-list"
import { useNavbarStyles } from "./navbar.style"

const NavbarSearch: FC = () => {
	const { pathname } = useLocation()
	const isHome = pathname === "/"
	const navigate = useNavigate()
	const { search, setSearch } = useSearchStore()

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
		if (search) {
			form.setFieldsValue({
				...search,
				dates: [dayjs(search.dates[0]), dayjs(search.dates[1])]
			})
		}
	}, [form, search])
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
							<DatePicker.RangePicker
								inputReadOnly={true}
								format={(value) => dayjs(value).format("dd, DD MMM")}
								style={{
									minWidth: 300,
									minHeight: 50
								}}
								allowClear={false}
								size={"large"}
							/>
						</Form.Item>
						<Form.List name={"guests"} initialValue={[1]}>
							{(fields, { add, remove }) => (
								<Select
									style={{
										minWidth: 300,
										minHeight: 50
									}}
									value={"guests"}
									options={[
										{
											value: "guests",
											label: (
												<Space split={"/"}>
													<Text>
														Гостей:{" "}
														{guests?.reduce(
															(total, guest) => total + (Number(guest) || 0),
															0
														)}
													</Text>
													<Text>Номеров: {guests?.length}</Text>
												</Space>
											)
										}
									]}
									placement={"bottomLeft"}
									popupMatchSelectWidth={false}
									prefix={<UserOutlined />}
									size={"large"}
									dropdownRender={() => (
										<GuestCountList fields={fields} add={add} remove={remove} />
									)}
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
