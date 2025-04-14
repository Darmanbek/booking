import {
	ArrowLeftOutlined,
	ArrowRightOutlined,
	CheckCircleOutlined
} from "@ant-design/icons"
import {
	App,
	Button,
	Col,
	Flex,
	Form,
	type FormProps,
	Row,
	Steps,
	Tabs,
	Typography
} from "antd"
import dayjs, { type Dayjs } from "dayjs"
import { type FC, useState } from "react"
import {
	ReversePaymentForm,
	ReverseQuestionForm,
	ReverseRoomsForm,
	ReverseUserForm
} from "src/pages/reverse/ui/forms"
import { Container } from "src/shared/ui"
import { ReverseHotelCard, ReverseInfoCard, ReversePricesCard } from "./cards"

export type ReverseChange = {
	first_name: string
	last_name: string
	rooms: {
		guest_name: string
		guest_count: number
	}[]
	question?: string
	time?: string | Dayjs
}

const Reverse: FC = () => {
	const [form] = Form.useForm<ReverseChange>()
	const [step, setStep] = useState(1)

	const { notification } = App.useApp()

	const onFinish: FormProps<ReverseChange>["onFinish"] = (values) => {
		if (values.time) {
			values.time = dayjs(values.time).format("HH:mm")
		}
		console.log(values)
		notification.info({
			message: "Результат",
			description: (
				<Typography.Text>
					<pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
				</Typography.Text>
			)
		})
	}

	const onPrevStep = async () => {
		setStep(1)
		window.scroll({
			top: 0,
			left: 0,
			behavior: "instant"
		})
	}
	const onNextStep = async () => {
		if (step === 2) {
			form.submit()
			return
		}
		const firstName = await form.getFieldValue("first_name")
		const lastName = await form.getFieldValue("last_name")
		if (!firstName) {
			form.validateFields(["first_name"])
			form.scrollToField("first_name", {
				block: "center"
			})
			return
		}
		if (!lastName) {
			form.validateFields(["last_name"])
			form.scrollToField("last_name", {
				block: "center"
			})
			return
		}
		setStep(2)
		window.scroll({
			top: 0,
			left: 0,
			behavior: "instant"
		})
	}

	return (
		<section>
			<Container>
				<Flex vertical={true} gap={20}>
					<Steps
						current={step}
						items={[
							{
								title: "Выбор отеля"
							},
							{
								title: "Бронирование"
							},
							{
								title: "Способ оплаты"
							}
						]}
					/>
					<Row gutter={20} style={{ rowGap: 20 }}>
						<Col span={16}>
							<Tabs
								animated={true}
								activeKey={`${step}`}
								tabBarStyle={{
									display: "none"
								}}
								items={[
									{
										key: "1",
										label: "Бронирование",
										children: (
											<Flex vertical={true} gap={20}>
												<ReverseHotelCard />
												<ReverseUserForm form={form} onFinish={onFinish} />
												<ReverseRoomsForm form={form} onFinish={onFinish} />
												<ReverseQuestionForm form={form} onFinish={onFinish} />
											</Flex>
										)
									},
									{
										key: "2",
										label: "Способ оплаты",
										children: (
											<Flex vertical={true} gap={20}>
												<ReversePaymentForm form={form} onFinish={onFinish} />
											</Flex>
										)
									}
								]}
							/>
							<Flex justify={"space-between"} style={{ marginTop: 20 }}>
								<Button
									danger={true}
									size={"large"}
									type={"primary"}
									iconPosition={"start"}
									style={
										step === 1
											? {
													opacity: 0,
													pointerEvents: "none",
													visibility: "hidden"
												}
											: {}
									}
									onClick={onPrevStep}
									icon={<ArrowLeftOutlined />}
								>
									Назад
								</Button>
								<Button
									size={"large"}
									type={"primary"}
									iconPosition={"end"}
									onClick={onNextStep}
									icon={
										step === 2 ? (
											<CheckCircleOutlined />
										) : (
											<ArrowRightOutlined />
										)
									}
								>
									{step === 2 ? "Забронировать" : "Продолжить"}
								</Button>
							</Flex>
						</Col>
						<Col span={8}>
							<Flex vertical={true} gap={20}>
								<ReverseInfoCard />
								<ReversePricesCard />
							</Flex>
						</Col>
					</Row>
				</Flex>
			</Container>
		</section>
	)
}

export { Reverse }
