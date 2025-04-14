import { CloseOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "@tanstack/react-router"
import { Button, Card, Flex, Form, List, Space } from "antd"
import { type FC, useEffect } from "react"
import { OrdersContextValues } from "src/pages/hotel/context"
import { useOrders } from "src/pages/hotel/hooks"
import { useCreateBookingInitialMutation } from "src/services/booking"
import {
	type SearchChange,
	useSearchStore
} from "src/shared/store/use-search-store"
import { Text, Title } from "src/shared/ui"
import {
	formatDate,
	formatPriceWithCurrency
} from "src/shared/utils/format.utils"
import { SearchDates } from "src/widgets/search/search-dates"
import { SearchGuests } from "src/widgets/search/search-guests"

const HotelOrdersCard: FC = () => {
	const { hotelSlug = "" } = useParams({ strict: false })
	const [form] = Form.useForm<SearchChange>()
	const navigate = useNavigate()
	const { rooms } = useOrders()

	const guests = Form.useWatch("guests", form)

	const { search } = useSearchStore()
	// const dates = Form.useWatch("dates", form) || search.dates

	const { mutate: addBooking, isPending: bookingLoading } =
		useCreateBookingInitialMutation(hotelSlug)

	const onBooking = () => {
		addBooking(
			{
				check_in_date: formatDate(search?.dates?.[0]),
				check_out_date: formatDate(search?.dates?.[0]),
				rooms_info: rooms.map((el) => ({
					room_id: el?.room?.id,
					guest_quantity: search?.guests.reduce(
						(total, guest) => total + guest,
						0
					)
				}))
			},
			{
				onSuccess: (booking) => {
					navigate({
						to: "/orders/$orderId/reverse/$hotelSlug",
						params: {
							hotelSlug,
							orderId: booking?.data?.initial_booking_uuid
						}
					})
				}
			}
		)
		// navigate({
		// 	to: "/orders/reverse/$hotelSlug",
		// 	params: {
		// 		hotelSlug
		// 	}
		// })
	}

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
					<SearchDates disabled={true} style={{ width: "100%" }} />
				</Form.Item>
				<Form.Item label={"Гости"}>
					<Form.List name={"guests"}>
						{(fields, { add, remove }) => (
							<SearchGuests
								disabled={true}
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
			<List<OrdersContextValues["rooms"][number]>
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
								rooms?.reduce(
									(total, item) =>
										total + item?.room?.base_price * item?.quantity,
									0
								)
							)}
						</Title>
					</Flex>
				}
				dataSource={rooms}
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
								<Text>{item?.room?.room_type}</Text>
								<Text>{item?.quantity}</Text>
							</Space>
							<Text>
								{formatPriceWithCurrency(
									item?.room?.base_price * item?.quantity
								)}
							</Text>
						</Flex>
					</List.Item>
				)}
			/>
			<Button
				style={{ marginTop: 16 }}
				block={true}
				type={"primary"}
				size={"large"}
				disabled={rooms?.length === 0 || bookingLoading}
				onClick={onBooking}
				loading={bookingLoading}
			>
				Забронировать
			</Button>
		</Card>
	)
}

export { HotelOrdersCard }
