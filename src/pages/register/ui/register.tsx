import { PhoneOutlined, UserOutlined } from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import { Button, Card, Checkbox, Divider, Flex, Form, Input } from "antd"
import { type FC } from "react"
import { Container, Title } from "src/shared/ui"

const Register: FC = () => {
	return (
		<section style={{ minHeight: "50vh" }}>
			<Container>
				<Flex vertical={true} align={"center"}>
					<Card style={{ padding: 10, maxWidth: 380, width: "100%" }}>
						<Title level={4} style={{ marginBottom: 20 }}>
							Регистрация
						</Title>
						<Form
							autoComplete={"off"}
							layout={"vertical"}
							requiredMark={false}
							size={"large"}
							labelCol={{
								style: {
									display: "none"
								}
							}}
						>
							<Form.Item
								label={"Имя"}
								name={"name"}
								rules={[{ required: true }]}
							>
								<Input placeholder={"Имя"} suffix={<UserOutlined />} />
							</Form.Item>
							<Form.Item
								label={"Телефон номер"}
								name={"phone"}
								rules={[{ required: true }]}
							>
								<Input
									placeholder={"Телефон номер"}
									suffix={<PhoneOutlined />}
								/>
							</Form.Item>
							<Form.Item
								label={"Пароль"}
								name={"password"}
								rules={[{ required: true }]}
							>
								<Input.Password placeholder={"Пароль"} />
							</Form.Item>
							<Form.Item
								label={"Подтвердите пароль"}
								name={"confirm_password"}
								dependencies={["password"]}
								rules={[
									{
										required: true
									},
									({ getFieldValue }) => ({
										validator(_, value) {
											if (!value || getFieldValue("password") === value) {
												return Promise.resolve()
											}
											return Promise.reject(
												new Error("Введенный вами новый пароль не совпадает!")
											)
										}
									})
								]}
							>
								<Input.Password placeholder={"Подтвердите пароль"} />
							</Form.Item>
							<Form.Item noStyle={true}>
								<Checkbox style={{ marginBottom: 16 }}>Запомните меня</Checkbox>
							</Form.Item>
							<Form.Item noStyle={true}>
								<Button type={"primary"} htmlType={"submit"} block={true}>
									Регистрация
								</Button>
							</Form.Item>
							<Divider />
							<Flex justify={"center"} gap={4}>
								У вас есть аккаунт? <Link to={"/login"}>Войти</Link>
							</Flex>
						</Form>
					</Card>
				</Flex>
			</Container>
		</section>
	)
}

export { Register }
