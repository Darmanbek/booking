import { Button, Card, Col, Flex, Form, Input, Row } from "antd"
import { type FC } from "react"

const ProfileSettings: FC = () => {
	return (
		<>
			<Card title={"Настройки профиля"}>
				<Form autoComplete={"off"} layout={"vertical"} name={"profile-form"}>
					<Row gutter={16} style={{ rowGap: 16 }}>
						<Col span={12}>
							<Form.Item
								label={"Имя"}
								name={"first_name"}
								rules={[{ required: true }]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label={"Фамилия"}
								name={"last_name"}
								rules={[{ required: true }]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label={"Телефон номер"}
								name={"phone"}
								rules={[{ required: true }]}
							>
								<Input addonBefore={"+998"} />
							</Form.Item>
						</Col>
					</Row>
					<Flex justify={"end"}>
						<Form.Item noStyle={true}>
							<Button htmlType={"submit"} type={"primary"}>
								Сохранить
							</Button>
						</Form.Item>
					</Flex>
				</Form>
			</Card>
		</>
	)
}

export { ProfileSettings }
