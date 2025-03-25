import { Card, Flex, List } from "antd"
import { type FC } from "react"
import { Text, Title } from "src/shared/ui"
import { formatPriceWithCurrency } from "src/shared/utils/format.utils"

const ReversePricesCard: FC = () => {
	return (
		<Card
			title={"Стоимость бронирования"}
			actions={[
				<Flex
					key={"Total"}
					style={{ width: "100%", padding: "8px 24px" }}
					justify={"space-between"}
					gap={16}
				>
					<Title level={5} style={{ maxWidth: 200 }}>
						Цена
					</Title>
					<Title level={5}>{formatPriceWithCurrency(650_000 * 5)}</Title>
				</Flex>
			]}
		>
			<List
				dataSource={Array.from({ length: 5 }).map((_, index) => index + 1)}
				renderItem={(_, index) => (
					<List.Item key={index}>
						<Flex style={{ width: "100%" }} justify={"space-between"} gap={16}>
							<Text style={{ maxWidth: 200 }}>
								Трехместный номер с ванной комнатой
							</Text>
							<Text>{formatPriceWithCurrency(650_000)}</Text>
						</Flex>
					</List.Item>
				)}
			/>
		</Card>
	)
}

export { ReversePricesCard }
