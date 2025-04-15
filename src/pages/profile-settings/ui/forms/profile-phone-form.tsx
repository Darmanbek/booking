import { Button, Col, Flex, Form, type FormProps, Input, Row } from "antd"
import { type FC, useEffect, useState } from "react"
import {
	useEditPhoneUsersMutation,
	useGetMeQuery,
	type UserPhoneChange
} from "src/services/users"
import { formatFormPhone, formatFormReversePhone } from "src/shared/utils"
import { ProfilePhoneVerifyForm } from "./profile-phone-verify-form"

const ProfilePhoneForm: FC = () => {
	const [form] = Form.useForm<UserPhoneChange>()
	const { data: profile } = useGetMeQuery()
	const phoneNumber = Form.useWatch("phone_number", form)
	const [isVerify, setIsVerify] = useState(false)

	const { mutate: editProfilePhone, isPending: editLoading } =
		useEditPhoneUsersMutation()

	const onFinish: FormProps<UserPhoneChange>["onFinish"] = (values) => {
		if (values.phone_number) {
			values.phone_number = formatFormPhone(values.phone_number)
		}
		editProfilePhone(values, {
			onSuccess: () => {
				setIsVerify(true)
			}
		})
	}

	useEffect(() => {
		if (profile) {
			form.setFieldsValue({
				...profile?.data,
				phone_number: formatFormReversePhone(profile?.data?.phone_number)
			})
		}
	}, [form, profile])
	return (
		<>
			<ProfilePhoneVerifyForm
				isVerify={isVerify}
				setIsVerify={setIsVerify}
				phoneNumber={phoneNumber}
			/>
			<Form
				form={form}
				onFinish={onFinish}
				autoComplete={"off"}
				layout={"vertical"}
				name={"profile-phone-form"}
			>
				<Row gutter={16} style={{ rowGap: 16 }}>
					<Col xs={24} md={12}>
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
						<Button
							loading={editLoading}
							disabled={
								editLoading ||
								formatFormReversePhone(profile?.data?.phone_number) ===
									phoneNumber
							}
							htmlType={"submit"}
							type={"primary"}
						>
							Сохранить
						</Button>
					</Form.Item>
				</Flex>
			</Form>
		</>
	)
}

export { ProfilePhoneForm }
