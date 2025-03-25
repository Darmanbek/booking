import {
	Badge,
	Card,
	Checkbox,
	Col,
	Descriptions,
	Flex,
	Form,
	type FormInstance,
	type FormProps,
	Input,
	Radio,
	Row
} from "antd"
import { type FC } from "react"
import { useToken } from "src/shared/hooks"

interface ReversePaymentFormProps {
	form: FormInstance
	onFinish: FormProps["onFinish"]
}

const ReversePaymentForm: FC<ReversePaymentFormProps> = ({
	form,
	onFinish
}) => {
	const { token } = useToken()
	return (
		<Card title={"Ваши данные"}>
			<Form
				autoComplete={"off"}
				layout={"vertical"}
				name={"payment-form"}
				form={form}
				labelCol={{
					style: {
						fontWeight: "bold"
					}
				}}
				onFinish={onFinish}
			>
				<Flex vertical={true} gap={20}>
					<Row gutter={16} style={{ rowGap: 16 }}>
						<Col span={16}>
							<Form.Item
								label={"Номер телефона"}
								name={"phone"}
								tooltip={{
									icon: (
										<span className={"anticon"}>
											(предпочтительно мобильный)
										</span>
									)
								}}
								help={
									"Необходим объекту размещения, чтобы удостовериться в действительности вашего бронирования"
								}
							>
								<Input addonBefore={"+998"} />
							</Form.Item>
							<br />
							<Form.Item
								valuePropName={"checked"}
								name={"is_message"}
								initialValue={false}
								help={"(рекомендуется)"}
							>
								<Checkbox>
									Да, отправьте мне бесплатное электронное подтверждение
								</Checkbox>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Card type={"inner"}>
								<Descriptions
									column={1}
									layout={"vertical"}
									items={[
										{
											key: "name",
											label: "Имя",
											children: "Alex"
										},
										{
											key: "phone",
											label: "Телефон",
											children: "+998 90 123 45 67"
										}
									]}
								/>
							</Card>
						</Col>
					</Row>
					<Card type={"inner"}>
						<Form.Item
							label={"Способ оплаты"}
							name={"payment_method"}
							initialValue={1}
						>
							<Radio.Group size={"large"}>
								<Badge.Ribbon text={"Наличными"}>
									<Card
										type={"inner"}
										style={{
											padding: 16,
											borderColor: token.colorPrimary,
											cursor: "pointer"
										}}
										onClick={() => form.setFieldValue("payment_method", 1)}
									>
										<Radio value={1}>На месте</Radio>
									</Card>
								</Badge.Ribbon>
							</Radio.Group>
						</Form.Item>
					</Card>
				</Flex>
			</Form>
		</Card>
	)
}

export { ReversePaymentForm }
