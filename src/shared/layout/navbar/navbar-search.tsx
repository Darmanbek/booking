import {
	ArrowRightOutlined,
	HomeOutlined,
	SearchOutlined,
	UserOutlined
} from "@ant-design/icons"
import { Button, Card, DatePicker, Flex, Input, Select, Tabs } from "antd"
import dayjs from "dayjs"
import { type FC } from "react"
import { GuestCountList } from "./guest-count/guest-count-list"
import { useNavbarStyles } from "./navbar.style"

const NavbarSearch: FC = () => {
	const { styles } = useNavbarStyles()
	const today = dayjs().startOf("week")

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
				<Flex
					gap={8}
					style={{
						width: "100%"
					}}
				>
					<Input
						prefix={<HomeOutlined />}
						placeholder={"Куда вы хотите поехать?"}
						size={"large"}
						style={{
							minHeight: 50,
							width: "100%"
						}}
					/>
					<DatePicker.RangePicker
						format={"dd, DD MMM"}
						defaultValue={[today.day(6), today.day(7)]}
						style={{
							minWidth: 300,
							minHeight: 50
						}}
						size={"large"}
					/>
					<Select
						style={{
							minWidth: 300,
							minHeight: 50
						}}
						placement={"bottomLeft"}
						popupMatchSelectWidth={false}
						prefix={<UserOutlined />}
						size={"large"}
						dropdownRender={() => <GuestCountList />}
					/>
					<Button
						icon={<SearchOutlined />}
						iconPosition={"end"}
						style={{ minHeight: 50 }}
						type={"primary"}
						size={"large"}
					>
						Найти
					</Button>
				</Flex>
			</Card>
		</>
	)
}

export { NavbarSearch }
