import { Card, Flex, Image } from "antd"
import { type FC } from "react"
import { Text, Title } from "src/shared/ui"

interface CityCardProps {
	data: string
}

const CityCard: FC<CityCardProps> = ({ data: city }) => {
	return (
		<Card
			styles={{
				body: {
					padding: 8
				}
			}}
			hoverable={true}
			style={{ overflow: "hidden", cursor: "pointer" }}
			cover={
				<Image
					preview={false}
					loading={"lazy"}
					height={220}
					style={{
						objectFit: "cover"
					}}
					role={"presentation"}
					src={"/hotel/city.jpg"}
					alt={""}
				/>
			}
		>
			<Flex vertical={true} gap={2}>
				<Title level={5} style={{ fontSize: 14 }}>
					Отели {city}
				</Title>
				<Text type={"secondary"} style={{ fontSize: 12 }}>
					{city}
				</Text>
			</Flex>
		</Card>
	)
}

export { CityCard }
