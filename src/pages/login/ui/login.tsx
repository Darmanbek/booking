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
import { type FC, useEffect } from "react"
import { type LoginChange, useLoginMutation } from "src/services/users"
import { useAuth } from "src/shared/hooks"
import { Container, Title } from "src/shared/ui"
import { formatFormPhone } from "src/shared/utils"

const Login: FC = () => {
	const [form] = Form.useForm<LoginChange>()
	const navigate = useNavigate()
	const auth = useAuth()
	const remember = Form.useWatch("remember", form)

	const {
		data: loginData,
		mutate: login,
		isPending: loginLoading,
		isSuccess
	} = useLoginMutation()

	const onFinish: FormProps<LoginChange>["onFinish"] = (values) => {
		if (values.phone_number) {
			values.phone_number = formatFormPhone(values.phone_number)
		}
		login(values)
	}

	useEffect(() => {
		if (isSuccess && loginData) {
			auth.login(loginData?.data, remember)
			navigate({
				to: "/",
				replace: true
			})
		}
	}, [auth, isSuccess, loginData, navigate, remember])
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
							<Form.Item<LoginChange>
								label={"Телефон номер"}
								name={"phone_number"}
								rules={[{ required: true }]}
							>
								<Input
									addonBefore={"+998"}
									placeholder={"Телефон номер"}
									suffix={<PhoneOutlined />}
								/>
							</Form.Item>
							<Form.Item<LoginChange>
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
								<Button
									loading={loginLoading}
									type={"primary"}
									htmlType={"submit"}
									block={true}
								>
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
