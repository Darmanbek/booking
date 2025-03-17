import { PhoneOutlined } from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import { Button, Card, Checkbox, Divider, Flex, Form, Input } from "antd"
import { type FC } from "react"
import { Container, Title } from "src/shared/ui"

const Login: FC = () => {
	return (
		<section style={{ minHeight: "50vh" }}>
			<Container>
				<Flex vertical={true} align={"center"}>
					<Card style={{ padding: 10, maxWidth: 380, width: "100%" }}>
						<Title level={4} style={{ marginBottom: 20, whiteSpace: "nowrap" }}>
							Войти
						</Title>
						<Form
							autoComplete={"off"}
							layout={"vertical"}
							requiredMark={false}
							size={"large"}
						>
							<Form.Item>
								<Input
									placeholder={"Телефон номер"}
									suffix={<PhoneOutlined />}
								/>
							</Form.Item>
							<Form.Item>
								<Input.Password placeholder={"Пароль"} />
							</Form.Item>
							<Form.Item noStyle={true}>
								<Checkbox style={{ marginBottom: 20 }}>Запомните меня</Checkbox>
							</Form.Item>
							<Form.Item noStyle={true}>
								<Button type={"primary"} htmlType={"submit"} block={true}>
									Войти
								</Button>
							</Form.Item>
							<Divider />
							<Flex justify={"center"} gap={4}>
								У вас нет аккаунта? <Link to={"/register"}>Регистрация</Link>
							</Flex>
						</Form>
					</Card>
				</Flex>
			</Container>
		</section>
	)
}

export { Login }
