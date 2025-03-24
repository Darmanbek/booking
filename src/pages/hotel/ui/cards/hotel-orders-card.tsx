import { CloseOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "@tanstack/react-router"
import { Button, Card, Flex, Form, List, Space } from "antd"
import { type FC, useEffect } from "react"
import {
	type SearchChange,
	useSearchStore
} from "src/shared/store/use-search-store"
import { Text, Title } from "src/shared/ui"
import { formatPriceWithCurrency } from "src/shared/utils/format.utils"
import { SearchDates } from "src/widgets/search/search-dates"
import { SearchGuests } from "src/widgets/search/search-guests"

const HotelOrdersCard: FC = () => {
	const { hotelSlug = "" } = useParams({ strict: false })
	const [form] = Form.useForm<SearchChange>()
	const navigate = useNavigate()

	const guests = Form.useWatch("guests", form)

	const { search } = useSearchStore()

	useEffect(() => {
		if (search) {
			form.setFieldsValue({
				...search
			})
		}
	}, [form, search])
	return (
		<Card
			style={{
				position: "sticky",
				top: 20,
				left: 0,
				right: 0
			}}
		>
			<Form
				autoComplete={"off"}
				layout={"vertical"}
				requiredMark={false}
				name={"orders-form"}
				form={form}
			>
				<Form.Item name={"dates"} label={"Даты"}>
					<SearchDates style={{ width: "100%" }} />
				</Form.Item>
				<Form.Item label={"Гости"}>
					<Form.List name={"guests"}>
						{(fields, { add, remove }) => (
							<SearchGuests
								style={{ width: "100%" }}
								guests={guests}
								fields={fields}
								add={add}
								remove={remove}
							/>
						)}
					</Form.List>
				</Form.Item>
			</Form>
			<List<number>
				footer={
					<Flex
						justify={"space-between"}
						align={"center"}
						gap={8}
						style={{ width: "100%" }}
					>
						<Title level={5}>Всего</Title>
						<Title level={5}>
							{formatPriceWithCurrency(
								Array.from({ length: 5 })
									.map((_, index) => 900000 * (index + 1))
									.reduce((total, price) => total + price, 0)
							)}
						</Title>
					</Flex>
				}
				dataSource={Array.from({ length: 5 }).map((_, index) => index + 1)}
				renderItem={(item, index) => (
					<List.Item key={index}>
						<Flex justify={"space-between"} gap={8} style={{ width: "100%" }}>
							<Space
								split={
									<Text type={"secondary"}>
										<CloseOutlined style={{ fontSize: 10 }} />
									</Text>
								}
								align={"center"}
							>
								<Text>Заказ</Text>
								<Text>{item}</Text>
							</Space>
							<Text>{formatPriceWithCurrency(900000 * item)}</Text>
						</Flex>
					</List.Item>
				)}
			/>
			<Button
				style={{ marginTop: 16 }}
				block={true}
				type={"primary"}
				size={"large"}
				onClick={() =>
					navigate({
						to: "/orders/reverse/$hotelSlug",
						params: {
							hotelSlug
						}
					})
				}
			>
				Забронировать
			</Button>
		</Card>
	)
}

export { HotelOrdersCard }
