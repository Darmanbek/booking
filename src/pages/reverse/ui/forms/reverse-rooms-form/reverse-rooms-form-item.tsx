import { DeleteOutlined, UserOutlined } from "@ant-design/icons"
import { useParams } from "@tanstack/react-router"
import {
	Avatar,
	Button,
	Card,
	Col,
	Form,
	type FormListFieldData,
	Image,
	Input,
	Row,
	Skeleton,
	Space
} from "antd"
import { type FC } from "react"
import { useReverse } from "src/pages/reverse/hooks"
import { useGetHotelsBySlugRoomsByIdQuery } from "src/services/hotels"
import { useTranslation } from "src/shared/hooks"
import { Counter } from "src/shared/ui"
import { formatNumber } from "src/shared/utils"

interface ReverseRoomFormItemProps {
	field: FormListFieldData
	remove: (index: number) => void
	length: number
}

const ReverseRoomsFormItem: FC<ReverseRoomFormItemProps> = ({
	field,
	remove,
	length
}) => {
	const { hotelSlug } = useParams({
		from: "/_layout/orders/$orderId/reverse/$hotelSlug"
	})
	const { form } = useReverse()
	const { t } = useTranslation()
	const roomId = form.getFieldValue(["rooms_info", field.name, "room_id"])
	const { data: room, isLoading } = useGetHotelsBySlugRoomsByIdQuery(
		hotelSlug,
		roomId
	)

	return (
		<Card
			loading={isLoading}
			cover={
				<Image
					height={150}
					style={{ objectFit: "cover" }}
					src={room?.data?.images?.[0]?.image}
				/>
			}
			title={
				isLoading ? (
					<Skeleton.Input active={true} />
				) : (
					<Space style={{ paddingBlock: 16 }}>
						<>{`${t(room?.data?.room_type)}:`}</>
						<Avatar.Group>
							{Array.from({ length: formatNumber(room?.data?.max_guests) }).map(
								(_, index) => (
									<Avatar key={index} icon={<UserOutlined />} />
								)
							)}
						</Avatar.Group>
					</Space>
				)
			}
			extra={
				length < 2 ? null : (
					<Button
						onClick={() => remove(field.name)}
						type={"link"}
						icon={<DeleteOutlined />}
						danger={true}
					>
						Удалить
					</Button>
				)
			}
		>
			<Form.Item name={[field.name, "uuid"]} hidden={true}>
				<Input hidden={true} />
			</Form.Item>
			<Row gutter={16} style={{ rowGap: 16 }}>
				<Col span={12}>
					<Form.Item
						label={"Имя гостя"}
						name={[field.name, "guest_name"]}
						help={"Комната будет забронирована на это имя"}
					>
						<Input />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						label={"Кол-во гостей"}
						name={[field.name, "guest_quantity"]}
					>
						<Counter
							max={2}
							formatter={(value) => `Гостей: ${value}`}
							style={{ width: "100%", maxWidth: "100%" }}
						/>
					</Form.Item>
				</Col>
			</Row>
		</Card>
	)
}

export { ReverseRoomsFormItem }
