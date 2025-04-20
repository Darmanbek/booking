import { CloseOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "@tanstack/react-router"
import { Button, Card, Flex, Form, List, Space, Tooltip } from "antd"
import { type FC, useEffect } from "react"
import type { OrdersContextValues } from "src/pages/hotel/context"
import { useOrders } from "src/pages/hotel/hooks"
import { useCreateBookingInitialMutation } from "src/services/booking"
import { useAuth } from "src/shared/hooks"
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
	const { isAuth } = useAuth()

	const guests = Form.useWatch("guests", form)

	const { search } = useSearchStore()
	// const dates = Form.useWatch("dates", form) || search.dates

	const { mutate: addBooking, isPending: bookingLoading } =
		useCreateBookingInitialMutation(hotelSlug)

	const onBooking = () => {
		const duplicatedRooms = rooms.flatMap(({ quantity, room }) =>
			Array.from({ length: quantity }, () => room)
		)
		addBooking(
			{
				check_in_date: formatDate(search?.dates?.[0]),
				check_out_date: formatDate(search?.dates?.[1]),
				rooms_info: duplicatedRooms.map((el) => ({
					room_id: el?.id,
					guest_quantity: el?.max_guests
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
						<Flex
							justify={"space-between"}
							align={"center"}
							gap={8}
							style={{ width: "100%" }}
						>
							<Space
								split={
									<Text type={"secondary"}>
										<CloseOutlined style={{ fontSize: 10 }} />
									</Text>
								}
								align={"center"}
							>
								<Text>{item?.room?.room_type}</Text>
								<Text style={{ whiteSpace: "nowrap" }}>{item?.quantity}</Text>
							</Space>
							<Text style={{ whiteSpace: "nowrap" }}>
								{formatPriceWithCurrency(
									item?.room?.base_price * item?.quantity
								)}
							</Text>
						</Flex>
					</List.Item>
				)}
			/>
			<Tooltip title={isAuth ? "" : "Вы должна сначала авторизоваться"}>
				<Button
					style={{ marginTop: 16 }}
					block={true}
					type={"primary"}
					size={"large"}
					disabled={rooms?.length === 0 || bookingLoading || !isAuth}
					onClick={onBooking}
					loading={bookingLoading}
				>
					Забронировать
				</Button>
			</Tooltip>
		</Card>
	)
}

export { HotelOrdersCard }
