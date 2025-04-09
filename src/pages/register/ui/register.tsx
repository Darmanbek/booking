import { PhoneOutlined, UserOutlined } from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
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
import { type FC, useState } from "react"
import { type RegisterChange, useRegisterMutation } from "src/services/users"
import { Container, Title } from "src/shared/ui"
import { formatFormPhone } from "src/shared/utils"
import { Verify } from "./verify"

const Register: FC = () => {
	const [form] = Form.useForm<RegisterChange>()
	const remember = Form.useWatch("remember", form)
	const phoneNumber = Form.useWatch("phone_number", form)
	const [isVerify, setIsVerify] = useState(false)

	const { mutate: register, isPending: registerLoading } = useRegisterMutation()

	const onFinish: FormProps<RegisterChange>["onFinish"] = (values) => {
		if (values.phone_number) {
			values.phone_number = formatFormPhone(values.phone_number)
		}
		register(values, {
			onSuccess: () => {
				setIsVerify(true)
			}
		})
	}

	return (
		<section style={{ minHeight: "50vh" }}>
			<Container>
				<Flex vertical={true} align={"center"}>
					<Verify
						isVerify={isVerify}
						setIsVerify={setIsVerify}
						phoneNumber={phoneNumber}
						remember={remember}
					/>
					<Card style={{ padding: 10, maxWidth: 380, width: "100%" }}>
						<Title level={4} style={{ marginBottom: 20 }}>
							Регистрация
						</Title>
						<Form
							autoComplete={"off"}
							layout={"vertical"}
							requiredMark={false}
							size={"large"}
							form={form}
							onFinish={onFinish}
							labelCol={{
								style: {
									display: "none"
								}
							}}
						>
							<Form.Item<RegisterChange>
								label={"Имя"}
								name={"first_name"}
								rules={[{ required: true }]}
							>
								<Input placeholder={"Имя"} suffix={<UserOutlined />} />
							</Form.Item>
							<Form.Item<RegisterChange>
								label={"Фамилия"}
								name={"last_name"}
								rules={[{ required: true }]}
							>
								<Input placeholder={"Фамилия"} suffix={<UserOutlined />} />
							</Form.Item>
							<Form.Item<RegisterChange>
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
							<Form.Item<RegisterChange>
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
								<Button
									loading={registerLoading}
									type={"primary"}
									htmlType={"submit"}
									block={true}
								>
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
