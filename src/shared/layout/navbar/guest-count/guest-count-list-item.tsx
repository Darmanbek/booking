import { Button, Flex } from "antd"
import { type FC } from "react"
import { Counter, Text, Title } from "src/shared/ui"

const GuestCountListItem: FC = () => {
	return (
		<Flex vertical={true} gap={12}>
			<Flex justify={"space-between"} align={"center"}>
				<Title level={5}>0 номер</Title>
				<Button type={"text"} danger={true}>
					Удалить
				</Button>
			</Flex>
			<Flex justify={"space-between"}>
				<Text>Гости</Text>
				<Counter />
			</Flex>
		</Flex>
	)
}

export { GuestCountListItem }
