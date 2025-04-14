import { useParams } from "@tanstack/react-router"
import { Alert, Card, DatePicker, Form, Input } from "antd"
import { type FC } from "react"
import { useReverse } from "src/pages/reverse/hooks"
import {
	BookingFinalChange,
	useGetBookingByIdQuery
} from "src/services/booking"
import { useGetHotelsBySlugRulesQuery } from "src/services/hotels"
import { formatCustomDate } from "src/shared/utils"

const ReverseQuestionForm: FC = () => {
	const { hotelSlug, orderId } = useParams({
		from: "/_layout/orders/$orderId/reverse/$hotelSlug"
	})
	const { data: hotelRules } = useGetHotelsBySlugRulesQuery(hotelSlug)
	const { data: order } = useGetBookingByIdQuery(orderId)
	const { form, onFinish } = useReverse()
	return (
		<Card title={"Ваши пожелания"}>
			<Form
				layout={"vertical"}
				autoComplete={"off"}
				labelCol={{
					style: {
						fontWeight: "bold"
					}
				}}
				form={form}
				onFinish={onFinish}
			>
				<Form.Item<BookingFinalChange>
					label={"Особые пожелания"}
					name={"special_requests"}
					initialValue={""}
				>
					<Input.TextArea
						rows={8}
						placeholder={
							"Пожалуйста, напишите свои запросы на русском, узбекском или английском. Также, Вы всегда можете оставить особое пожелание после завершения бронирования!"
						}
					/>
				</Form.Item>
				<Form.Item<BookingFinalChange>
					label={"Время прибытия"}
					tooltip={{
						icon: (
							<span style={{ marginLeft: 4 }}>
								:
								{`${formatCustomDate(order?.data?.check_in_date, "dddd, D MMMM YYYY")}`}
							</span>
						)
					}}
					name={"time"}
					help={"К этому времени отельер подготовит номер к вашему прибытию"}
				>
					<DatePicker
						mode={"time"}
						style={{ minWidth: 300 }}
						picker={"time"}
						format={{
							format: "HH:mm",
							type: "mask"
						}}
					/>
				</Form.Item>
				<br />
				<Alert
					type={"info"}
					showIcon={true}
					message={
						<>
							Ваш номер будет готов в{" "}
							<b>{hotelRules?.data?.check_in_from || ""}</b>
						</>
					}
					description={
						"Эта информация поможет отелю лучше подготовить для вас номер "
					}
				/>
			</Form>
		</Card>
	)
}

export { ReverseQuestionForm }
