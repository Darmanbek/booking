import { useParams } from "@tanstack/react-router"
import { Card, Descriptions, Form } from "antd"
import { type FC } from "react"
import { useReverse } from "src/pages/reverse/hooks"
import { useGetBookingByIdQuery } from "src/services/booking"
import { formatCustomDate, formatNumber } from "src/shared/utils"

const ReverseInfoCard: FC = () => {
	const { orderId } = useParams({
		from: "/_layout/orders/$orderId/reverse/$hotelSlug"
	})
	const { form } = useReverse()
	const roomsInfo = Form.useWatch("rooms_info", form) || []

	const { data: order } = useGetBookingByIdQuery(orderId)

	return (
		<Card title={"Данные бронирования"}>
			<Descriptions
				layout={"vertical"}
				column={1}
				items={[
					{
						label: "Дата заезда",
						children: formatCustomDate(
							order?.data?.check_in_date,
							"dddd, D MMMM YYYY"
						)
					},
					{
						label: "Дата отъезда",
						children: formatCustomDate(
							order?.data?.check_out_date,
							"dddd, D MMMM YYYY"
						)
					},
					{
						label: "Число гостей",
						children:
							Number(
								roomsInfo.reduce(
									(total, room) => total + (Number(room?.guest_quantity) || 0),
									0
								)
							) || 0
					},
					{
						label: "Кол-во номеров",
						children: formatNumber(roomsInfo?.length)
					}
				]}
			/>
		</Card>
	)
}

export { ReverseInfoCard }
