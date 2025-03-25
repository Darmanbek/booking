import { DeleteOutlined, UserOutlined } from "@ant-design/icons"
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
	Space
} from "antd"
import { type FC } from "react"
import { Counter } from "src/shared/ui"

interface ReverseRoomFormItemProps {
	field: FormListFieldData
	remove: (index: number) => void
}

const ReverseRoomsFormItem: FC<ReverseRoomFormItemProps> = ({
	field,
	remove
}) => {
	return (
		<Card
			cover={
				<Image
					height={150}
					style={{ objectFit: "cover" }}
					src={"/hotel/hotel-room.jpg"}
				/>
			}
			title={
				<Space style={{ paddingBlock: 16 }}>
					<>{"Трехместный номер с ванной комнатой:"}</>
					<Avatar.Group>
						<Avatar icon={<UserOutlined />} />
						<Avatar icon={<UserOutlined />} />
					</Avatar.Group>
				</Space>
			}
			extra={
				field.name === 0 ? null : (
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
					<Form.Item label={"Кол-во гостей"} name={[field.name, "guest_count"]}>
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
