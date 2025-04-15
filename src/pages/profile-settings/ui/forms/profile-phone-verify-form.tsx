import { Form, type FormProps, Input, Modal } from "antd"
import { type FC, useCallback, useEffect } from "react"
import {
	useVerifyPhoneUsersMutation,
	type VerifyChange
} from "src/services/users"
import { formatFormPhone } from "src/shared/utils"

interface ProfilePhoneVerifyFormProps {
	isVerify: boolean
	setIsVerify: (isVerify: boolean) => void
	phoneNumber: string
	remember?: boolean
}

const ProfilePhoneVerifyForm: FC<ProfilePhoneVerifyFormProps> = ({
	phoneNumber,
	setIsVerify,
	isVerify
}) => {
	const [form] = Form.useForm<VerifyChange>()

	const {
		data: verifyData,
		mutate: verify,
		isPending: verifyLoading,
		isSuccess
	} = useVerifyPhoneUsersMutation()

	const onFinish: FormProps<VerifyChange>["onFinish"] = (values) => {
		verify({
			...values,
			phone_number: formatFormPhone(phoneNumber)
		})
	}

	const onCloseVerify = useCallback(() => {
		form.resetFields()
		setIsVerify(false)
	}, [form, setIsVerify])

	useEffect(() => {
		if (isSuccess && verifyData) {
			onCloseVerify()
		}
	}, [isSuccess, verifyData])
	return (
		<>
			<Modal
				open={isVerify}
				width={400}
				onCancel={onCloseVerify}
				title={"Введите код верификаций"}
				forceRender={true}
				onOk={form.submit}
				okButtonProps={{
					loading: verifyLoading
				}}
			>
				<Form
					name={"verify-form"}
					form={form}
					size={"large"}
					onFinish={onFinish}
					style={{
						minHeight: "20vh",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center"
					}}
					requiredMark={false}
					autoComplete={"off"}
					layout={"vertical"}
					labelCol={{
						style: {
							display: "none"
						}
					}}
				>
					<Form.Item<VerifyChange>
						name={"code"}
						label={"Код"}
						rules={[
							{
								required: true
							}
						]}
						style={{ display: "flex", justifyContent: "center" }}
					>
						<Input.OTP length={5} />
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}

export { ProfilePhoneVerifyForm }
