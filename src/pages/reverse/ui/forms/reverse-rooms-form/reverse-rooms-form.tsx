import { useParams } from "@tanstack/react-router"
import { Flex, Form } from "antd"
import { type FC, useEffect } from "react"
import { useReverse } from "src/pages/reverse/hooks"
import { useGetBookingByIdQuery } from "src/services/booking"
import { ReverseRoomsFormItem } from "./reverse-rooms-form-item"

const ReverseRoomsForm: FC = () => {
	const { form, onFinish } = useReverse()

	const { orderId } = useParams({
		from: "/_layout/orders/$orderId/reverse/$hotelSlug"
	})

	const { data: order } = useGetBookingByIdQuery(orderId)

	useEffect(() => {
		if (order?.data) {
			form.setFieldValue(
				"rooms_info",
				order?.data?.rooms_info?.map((room) => ({
					uuid: room?.uuid,
					room_id: room?.room_id,
					guest_quantity: room?.guest_quantity,
					guest_name: room?.guest_name || ""
				}))
			)
		}
	}, [form, order?.data])
	return (
		<Form
			layout={"vertical"}
			autoComplete={"off"}
			name={"rooms-form"}
			form={form}
			onFinish={onFinish}
		>
			<Flex vertical={true} gap={20}>
				<Form.List name={"rooms_info"} initialValue={[]}>
					{(fields, { remove }) => (
						<>
							{fields.map((field, index) => (
								<ReverseRoomsFormItem
									field={field}
									remove={remove}
									key={index}
									length={fields.length}
								/>
							))}
						</>
					)}
				</Form.List>
			</Flex>
		</Form>
	)
}

export { ReverseRoomsForm }
