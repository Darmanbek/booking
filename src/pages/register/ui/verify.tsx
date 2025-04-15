import { useNavigate } from "@tanstack/react-router"
import { Form, type FormProps, Input, Modal } from "antd"
import { type FC, useCallback, useEffect } from "react"
import { useVerifyMutation, type VerifyChange } from "src/services/users"
import { useAuth } from "src/shared/hooks"
import { formatFormPhone } from "src/shared/utils"

interface VerifyProps {
	isVerify: boolean
	setIsVerify: (isVerify: boolean) => void
	phoneNumber: string
	remember?: boolean
}

const Verify: FC<VerifyProps> = ({
	phoneNumber,
	setIsVerify,
	isVerify,
	remember
}) => {
	const [form] = Form.useForm<VerifyChange>()
	const navigate = useNavigate()
	const auth = useAuth()

	const {
		data: verifyData,
		mutate: verify,
		isPending: verifyLoading,
		isSuccess
	} = useVerifyMutation()

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
			auth.login(verifyData?.data, remember)
			navigate({
				to: "/",
				replace: true
			})
		}
	}, [navigate, isSuccess, verifyData, auth, remember])
	return (
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
	)
}

export { Verify }
