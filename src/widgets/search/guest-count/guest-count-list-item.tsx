import { Button, Flex, Form, type FormListFieldData } from "antd"
import { type FC } from "react"
import { Counter, Text, Title } from "src/shared/ui"

interface GuestCountListItemProps {
	field: FormListFieldData
	remove: (index: number) => void
}

const GuestCountListItem: FC<GuestCountListItemProps> = ({ field, remove }) => {
	return (
		<Flex vertical={true} gap={12}>
			<Flex justify={"space-between"} align={"center"}>
				<Title level={5}>{field.name} номер</Title>
				{field.name !== 0 && (
					<Button
						onClick={() => remove(field.name)}
						type={"link"}
						danger={true}
					>
						Удалить
					</Button>
				)}
			</Flex>
			<Flex justify={"space-between"}>
				<Text>Гости</Text>
				<Form.Item name={[field.name]} noStyle={true} initialValue={1}>
					<Counter />
				</Form.Item>
			</Flex>
		</Flex>
	)
}

export { GuestCountListItem }
