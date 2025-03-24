import { EnvironmentOutlined } from "@ant-design/icons"
import { Card, Flex, Image, Space } from "antd"
import { type FC } from "react"
import type { Hotel } from "src/shared/data/hotel.data"
import { useToken } from "src/shared/hooks"
import { Text, Title } from "src/shared/ui"

interface ReverseHotelCardProps {
	data?: Hotel
}

const ReverseHotelCard: FC<ReverseHotelCardProps> = ({ data: hotel }) => {
	const { token } = useToken()
	return (
		<Card
			styles={{
				body: {
					padding: 12
				}
			}}
		>
			<Flex gap={12}>
				<Flex>
					<Image
						width={192}
						style={{ aspectRatio: 1, borderRadius: token.borderRadiusLG }}
						alt={hotel?.name}
						src={hotel?.image}
					/>
				</Flex>
				<Flex vertical={true} align={"start"}>
					<Title level={4}>{hotel?.name}</Title>
					<Space split={<Text>•</Text>}>
						<Space>
							<EnvironmentOutlined />
							{hotel?.address}
						</Space>
						{hotel?.city?.city}
						<Text>4.1км от центра</Text>
					</Space>
				</Flex>
			</Flex>
		</Card>
	)
}

export { ReverseHotelCard }
