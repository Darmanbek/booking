import { Button, Col, Flex, Form, type FormProps, Input, Row } from "antd"
import { type FC, useEffect } from "react"
import { useGetMeQuery, type UserPhoneChange } from "src/services/users"

const ProfilePhoneForm: FC = () => {
	const [form] = Form.useForm<UserPhoneChange>()
	const { data: profile } = useGetMeQuery()

	const onFinish: FormProps<UserPhoneChange>["onFinish"] = (values) => {
		console.log(values)
	}

	useEffect(() => {
		if (profile) {
			form.setFieldsValue({
				...profile?.data
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
				name={"profile-phone-form"}
			>
				<Row gutter={16} style={{ rowGap: 16 }}>
					<Col span={12}>
						<Form.Item<UserPhoneChange>
							label={"Телефон номер"}
							name={"phone_number"}
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
		</>
	)
}

export { ProfilePhoneForm }
