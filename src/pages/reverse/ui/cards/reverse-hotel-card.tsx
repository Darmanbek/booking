import { EnvironmentOutlined } from "@ant-design/icons"
import { useParams } from "@tanstack/react-router"
import { Card, Flex, Image, Space } from "antd"
import { type FC } from "react"
import {
	useGetHotelsBySlugLocationQuery,
	useGetHotelsBySlugQuery
} from "src/services/hotels"
import { useToken, useTranslation } from "src/shared/hooks"
import { Text, Title } from "src/shared/ui"

const ReverseHotelCard: FC = () => {
	const { token } = useToken()
	const { t } = useTranslation()

	const { hotelSlug } = useParams({ strict: false })
	const { data: hotel } = useGetHotelsBySlugQuery(hotelSlug)
	const { data: hotelLocation } = useGetHotelsBySlugLocationQuery(hotelSlug)

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
						style={{
							aspectRatio: 1,
							borderRadius: token.borderRadiusLG,
							display: "flex",
							justifyContent: "center",
							alignItems: "center"
						}}
						alt={t(hotel?.data?.name)}
						src={hotel?.data?.images?.[0]}
					/>
				</Flex>
				<Flex vertical={true} align={"start"}>
					<Title level={4}>{t(hotel?.data?.name)}</Title>
					<Space wrap={true} split={<Text>•</Text>}>
						<Space>
							<EnvironmentOutlined />
							{hotelLocation?.data?.address}
						</Space>
						{hotelLocation?.data?.city}
						<Text>4.1км от центра</Text>
					</Space>
				</Flex>
			</Flex>
		</Card>
	)
}

export { ReverseHotelCard }
