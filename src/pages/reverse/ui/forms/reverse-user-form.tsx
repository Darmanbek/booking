import { Card, Col, Form, Input, Row } from "antd"
import { type FC } from "react"

const ReverseUserForm: FC = () => {
	return (
		<Card title={"Ваши данные"}>
			<Form layout={"vertical"} autoComplete={"off"}>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item label={"Имя"}>
							<Input />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label={"Фамилия"}>
							<Input />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	)
}

export { ReverseUserForm }
