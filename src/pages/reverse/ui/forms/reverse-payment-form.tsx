import {
	Badge,
	Card,
	Col,
	Descriptions,
	Flex,
	Form,
	Input,
	Radio,
	Row
} from "antd"
import { type FC } from "react"
import { useReverse } from "src/pages/reverse/hooks"
import { type BookingFinalChange } from "src/services/booking"
import { useGetMeQuery } from "src/services/users"
import { useToken } from "src/shared/hooks"
import { formatPhone } from "src/shared/utils"

const ReversePaymentForm: FC = () => {
	const { token } = useToken()

	const { form, onFinish } = useReverse()
	const { data: profile, isLoading } = useGetMeQuery()
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
						<Col xs={24} md={16}>
							<Form.Item<BookingFinalChange>
								label={"Номер телефона"}
								name={"phone_number"}
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
						</Col>
						<Col xs={24} md={8}>
							<Card type={"inner"} loading={isLoading}>
								<Descriptions
									column={1}
									layout={"vertical"}
									items={[
										{
											key: "name",
											label: "Имя",
											children: `${profile?.data?.first_name || ""} ${profile?.data?.last_name || ""}`
										},
										{
											key: "phone",
											label: "Телефон",
											children: formatPhone(profile?.data?.phone_number)
										}
									]}
								/>
							</Card>
						</Col>
					</Row>
					<Card type={"inner"}>
						<Form.Item<BookingFinalChange>
							label={"Способ оплаты"}
							name={"payment_method_id"}
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
										onClick={() => form.setFieldValue("payment_method_id", 1)}
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
