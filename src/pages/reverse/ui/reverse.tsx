import {
	ArrowLeftOutlined,
	ArrowRightOutlined,
	CheckCircleOutlined
} from "@ant-design/icons"
import { useNavigate, useParams } from "@tanstack/react-router"
import {
	Button,
	Col,
	Flex,
	Form,
	type FormProps,
	Row,
	Spin,
	Steps,
	Tabs
} from "antd"
import { useResponsive } from "antd-style"
import { type Dayjs } from "dayjs"
import { type FC, useEffect, useState } from "react"
import { ReverseContext } from "src/pages/reverse/context"
import {
	ReversePaymentForm,
	ReverseQuestionForm,
	ReverseRoomsForm,
	ReverseUserForm
} from "src/pages/reverse/ui/forms"
import {
	type BookingFinalChange,
	useCreateBookingFinalMutation,
	useGetBookingByIdQuery
} from "src/services/booking"
import { NotFound } from "src/shared/layout"
import { Container } from "src/shared/ui"
import { formatCustomDate, formatFormPhone } from "src/shared/utils"
import { Loader } from "src/widgets/loader"
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
	const [form] = Form.useForm<BookingFinalChange>()
	const [step, setStep] = useState(1)
	const { orderId, hotelSlug } = useParams({
		from: "/_layout/orders/$orderId/reverse/$hotelSlug"
	})
	const { sm = true } = useResponsive()
	const navigate = useNavigate()

	const { data: booking, isLoading } = useGetBookingByIdQuery(orderId)

	const {
		mutate: reverse,
		isPending: reverseLoading,
		isSuccess
	} = useCreateBookingFinalMutation(hotelSlug)

	const onFinish: FormProps<BookingFinalChange>["onFinish"] = (values) => {
		if (!booking) return
		if (values.time) {
			values.time = formatCustomDate(values.time, "HH:mm")
		}
		if (values.phone_number) {
			values.phone_number = formatFormPhone(values.phone_number)
		}
		if (values.rooms_info) {
			values.rooms_info = values?.rooms_info?.map((el) => ({
				...el,
				guest_name: el?.guest_name || undefined
			}))
		}
		reverse({
			...values,
			check_in_date: booking?.data?.check_in_date,
			check_out_date: booking?.data?.check_out_date
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

	useEffect(() => {
		if (isSuccess) {
			navigate({
				to: "/orders",
				replace: true
			})
		}
	}, [isSuccess, navigate])

	if (isLoading)
		return (
			<Flex justify={"center"} align={"center"} style={{ minHeight: "50vh" }}>
				<Spin />
			</Flex>
		)

	if (!booking?.data)
		return (
			<NotFound title={"Не найдено"} subTitle={"Такой брони несуществует"} />
		)

	return (
		<ReverseContext.Provider
			value={{
				form,
				onFinish
			}}
		>
			<Loader loading={reverseLoading} />
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
							<Col xs={24} md={16}>
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
													<ReverseUserForm />
													<ReverseRoomsForm />
													<ReverseQuestionForm />
												</Flex>
											)
										},
										{
											key: "2",
											label: "Способ оплаты",
											children: (
												<Flex vertical={true} gap={20}>
													<ReversePaymentForm />
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
										{sm ? "Назад" : ""}
									</Button>
									<Button
										size={"large"}
										type={"primary"}
										iconPosition={"end"}
										onClick={onNextStep}
										loading={reverseLoading}
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
							<Col xs={24} md={8}>
								<Flex vertical={true} gap={20}>
									<ReverseInfoCard />
									<ReversePricesCard />
								</Flex>
							</Col>
						</Row>
					</Flex>
				</Container>
			</section>
		</ReverseContext.Provider>
	)
}

export { Reverse }
