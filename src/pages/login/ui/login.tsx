import { PhoneOutlined } from "@ant-design/icons"
import { Link, useNavigate } from "@tanstack/react-router"
import {
	Button,
	Card,
	Checkbox,
	Divider,
	Flex,
	Form,
	type FormProps,
	Input
} from "antd"
import { type FC } from "react"
import { useAuth } from "src/shared/hooks"
import { Container, Title } from "src/shared/ui"

type LoginChange = {
	phone: string
	password: string
	remember?: boolean
}

const Login: FC = () => {
	const [form] = Form.useForm<LoginChange>()
	const navigate = useNavigate()
	const auth = useAuth()
	const remember = Form.useWatch("remember", form)

	const onFinish: FormProps<LoginChange>["onFinish"] = (values) => {
		console.log(values)
		auth.login("token", remember)
		navigate({
			to: "/",
			replace: true
		})
	}

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
							form={form}
							onFinish={onFinish}
							name={"login-form"}
							labelCol={{
								style: {
									display: "none"
								}
							}}
						>
							<Form.Item
								label={"Телефон номер"}
								name={"phone"}
								rules={[{ required: true }]}
							>
								<Input
									addonBefore={"+998"}
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
								noStyle={true}
								valuePropName={"checked"}
								name={"remember"}
								initialValue={false}
							>
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
