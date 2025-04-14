import { Card, Col, Form, Input, Row } from "antd"
import { type FC } from "react"
import { useReverse } from "src/pages/reverse/hooks"

const ReverseUserForm: FC = () => {
	const { form, onFinish } = useReverse()

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
