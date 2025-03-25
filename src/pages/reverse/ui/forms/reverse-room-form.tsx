import { DeleteOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Card, Col, Form, Image, Input, Row, Space } from "antd"
import { type FC } from "react"
import { Counter } from "src/shared/ui"

const ReverseRoomForm: FC = () => {
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
				<Button type={"link"} icon={<DeleteOutlined />} danger={true}>
					Удалить
				</Button>
			}
		>
			<Form layout={"vertical"} autoComplete={"off"} name={"room-form"}>
				<Row gutter={16} style={{ rowGap: 16 }}>
					<Col span={12}>
						<Form.Item
							label={"Имя гостя"}
							help={"Комната будет забронирована на это имя"}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label={"Кол-во гостей"}>
							<Counter
								max={2}
								formatter={(value) => `Гостей: ${value}`}
								style={{ width: "100%", maxWidth: "100%" }}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	)
}

export { ReverseRoomForm }
