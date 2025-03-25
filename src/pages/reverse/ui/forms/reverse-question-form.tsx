import { Alert, Card, DatePicker, Form, Input } from "antd"
import { type FC } from "react"

const ReverseQuestionForm: FC = () => {
	return (
		<Card title={"Ваши пожелания"}>
			<Form
				layout={"vertical"}
				autoComplete={"off"}
				labelCol={{
					style: {
						fontWeight: "bold"
					}
				}}
			>
				<Form.Item label={"Особые пожелания"}>
					<Input.TextArea
						rows={8}
						placeholder={
							"Пожалуйста, напишите свои запросы на русском, узбекском или английском. Также, Вы всегда можете оставить особое пожелание после завершения бронирования!"
						}
					/>
				</Form.Item>
				<Form.Item
					label={"Время прибытия"}
					tooltip={{
						icon: <span style={{ marginLeft: 4 }}>:Вторник, 25 Марта 2025</span>
					}}
					help={"К этому времени отельер подготовит номер к вашему прибытию"}
				>
					<DatePicker
						mode={"time"}
						style={{ minWidth: 300 }}
						picker={"time"}
						format={{
							format: "HH:mm",
							type: "mask"
						}}
					/>
				</Form.Item>
				<br />
				<Alert
					type={"info"}
					showIcon={true}
					message={
						<>
							Ваш номер будет готов в <b>14:00</b>
						</>
					}
					description={
						"Эта информация поможет отелю лучше подготовить для вас номер "
					}
				/>
			</Form>
		</Card>
	)
}

export { ReverseQuestionForm }
