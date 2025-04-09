import {
	Button,
	Col,
	DatePicker,
	Flex,
	Form,
	type FormProps,
	Input,
	Radio,
	Row
} from "antd"
import dayjs from "dayjs"
import { type FC, useEffect } from "react"
import { useGetMeQuery, type UserChange } from "src/services/users"

const ProfileForm: FC = () => {
	const [form] = Form.useForm<UserChange>()
	const { data: profile } = useGetMeQuery()

	const onFinish: FormProps<UserChange>["onFinish"] = (values) => {
		console.log(values)
	}

	useEffect(() => {
		if (profile) {
			form.setFieldsValue({
				...profile?.data,
				birthday: profile?.data?.birthday
					? dayjs(profile?.data?.birthday)
					: undefined
			})
		}
	}, [form, profile])
	return (
		<>
			<Form
				form={form}
				onFinish={onFinish}
				autoComplete={"off"}
				layout={"vertical"}
				name={"profile-form"}
			>
				<Row gutter={16} style={{ rowGap: 16 }}>
					<Col xs={24} md={12}>
						<Form.Item<UserChange>
							label={"Имя"}
							name={"first_name"}
							rules={[{ required: true }]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item<UserChange>
							label={"Фамилия"}
							name={"last_name"}
							rules={[{ required: true }]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item<UserChange>
							label={"День рождения"}
							name={"birthday"}
							rules={[{ required: true }]}
						>
							<DatePicker />
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item<UserChange>
							label={"Пол"}
							name={"gender"}
							rules={[{ required: true }]}
						>
							<Radio.Group
								options={[
									{
										value: "male",
										label: "Мужчина"
									},
									{
										value: "female",
										label: "Женщина"
									}
								]}
							/>
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
		</>
	)
}

export { ProfileForm }
