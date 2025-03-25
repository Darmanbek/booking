import { Flex, Form, type FormInstance, type FormProps } from "antd"
import { type FC } from "react"
import { ReverseRoomsFormItem } from "./reverse-rooms-form-item"

interface ReverseRoomFormProps {
	form: FormInstance
	onFinish: FormProps["onFinish"]
}

const ReverseRoomsForm: FC<ReverseRoomFormProps> = ({ form, onFinish }) => {
	return (
		<Form
			layout={"vertical"}
			autoComplete={"off"}
			name={"rooms-form"}
			form={form}
			onFinish={onFinish}
		>
			<Flex vertical={true} gap={20}>
				<Form.List
					name={"rooms"}
					initialValue={[
						{
							guest_name: "",
							guest_count: 1
						}
					]}
				>
					{(fields, { remove }) => (
						<>
							{fields.map((field, index) => (
								<ReverseRoomsFormItem
									field={field}
									remove={remove}
									key={index}
								/>
							))}
						</>
					)}
				</Form.List>
			</Flex>
		</Form>
	)
}

export { ReverseRoomsForm }
