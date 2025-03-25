import {
	Card,
	Col,
	Form,
	type FormInstance,
	type FormProps,
	Input,
	Row
} from "antd"
import { type FC } from "react"

interface ReverseUserFormProps {
	form: FormInstance
	onFinish: FormProps["onFinish"]
}

const ReverseUserForm: FC<ReverseUserFormProps> = ({ form, onFinish }) => {
	return (
		<Card title={"Ваши данные"}>
			<Form
				layout={"vertical"}
				autoComplete={"off"}
				form={form}
				scrollToFirstError={{
					block: "center"
				}}
				onFinish={onFinish}
			>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							label={"Имя"}
							name={"first_name"}
							rules={[{ required: true }]}
							tooltip={{
								icon: <span className={"anticon"}>(Обязательно)</span>
							}}
							initialValue={""}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label={"Фамилия"}
							name={"last_name"}
							rules={[{ required: true }]}
							tooltip={{
								icon: <span className={"anticon"}>(Обязательно)</span>
							}}
							initialValue={""}
						>
							<Input />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	)
}

export { ReverseUserForm }
