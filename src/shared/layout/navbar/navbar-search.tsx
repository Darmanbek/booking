import {
	ArrowRightOutlined,
	HomeOutlined,
	SearchOutlined,
	UserOutlined
} from "@ant-design/icons"
import {
	Button,
	Card,
	DatePicker,
	Flex,
	Form,
	type FormProps,
	Input,
	Select,
	Space,
	Tabs
} from "antd"
import dayjs, { type Dayjs } from "dayjs"
import { type FC } from "react"
import { Text } from "src/shared/ui"
import { GuestCountList } from "./guest-count/guest-count-list"
import { useNavbarStyles } from "./navbar.style"

type SearchChange = {
	search: string
	date: [string | Dayjs, string | Dayjs]
	guests: number[]
}

const NavbarSearch: FC = () => {
	const [form] = Form.useForm<SearchChange>()
	const guests = Form.useWatch("guests", form) || []
	const { styles } = useNavbarStyles()
	const today = dayjs().startOf("week")

	const onFinish: FormProps["onFinish"] = (values) => {
		console.log(values)
	}

	return (
		<>
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
						Для коммандировок
					</Button>
				}
				items={[
					{
						key: "hotels",
						label: "Отели и квартиры"
					}
				]}
			/>
			<Card
				style={{
					borderTopLeftRadius: 0
				}}
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
						<Form.Item<SearchChange> name={"search"} noStyle={true}>
							<Input
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
							name={"date"}
							noStyle={true}
							initialValue={[today.day(6), today.day(7)]}
						>
							<DatePicker.RangePicker
								format={"dd, DD MMM"}
								style={{
									minWidth: 300,
									minHeight: 50
								}}
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
