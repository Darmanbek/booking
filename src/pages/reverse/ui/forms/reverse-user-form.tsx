import { Card, Col, Form, Input, Radio, Row, Space } from "antd"
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
					<Col xs={24} sm={12}>
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
					<Col xs={24} sm={12}>
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
				<Form.Item
					label={"Путешествуете по работе?"}
					name={"booking_type"}
					initialValue={"personal"}
				>
					<Radio.Group buttonStyle={"solid"}>
						<Space>
							<Radio.Button value={"business"}>Да</Radio.Button>
							<Radio.Button value={"personal"}>Нет</Radio.Button>
						</Space>
					</Radio.Group>
				</Form.Item>
			</Form>
		</Card>
	)
}

export { ReverseUserForm }
