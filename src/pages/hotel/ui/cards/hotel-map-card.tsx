import { Card, Flex } from "antd"
import { type FC } from "react"
import { useToken } from "src/shared/hooks"
import { Text, Title } from "src/shared/ui"

const HotelMapCard: FC = () => {
	const { token } = useToken()
	return (
		<Card
			title={
				<Flex vertical={true} gap={4} style={{ paddingBlock: 12 }}>
					<Title level={3} style={{ fontSize: "inherit" }}>
						Расположение
					</Title>
					<Text style={{ fontSize: 14, fontWeight: 500 }}>
						Центр города, набережная Тухачевского, дом 10, Омск
					</Text>
				</Flex>
			}
		>
			<Flex
				align={"center"}
				justify={"center"}
				style={{
					border: "1px dashed",
					borderRadius: token.borderRadius,
					minHeight: 300
				}}
			>
				Карта
			</Flex>
		</Card>
	)
}

export { HotelMapCard }
