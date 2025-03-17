import { Flex, Image } from "antd"
import { type FC } from "react"
import { type Hotel } from "src/shared/data/hotel.data"
import { Text, Title } from "src/shared/ui"
import { formatPriceWithCurrency } from "src/shared/utils/format.utils"
import { RatingTag } from "src/widgets/rating-tag"

interface MapHotelCardProps {
	data?: Hotel
}

const MapHotelCard: FC<MapHotelCardProps> = ({ data: hotel }) => {
	return (
		<Flex gap={8}>
			<Image
				preview={false}
				width={75}
				height={75}
				style={{ borderRadius: 8 }}
				src={hotel?.image}
			/>
			<Flex vertical={true} gap={8} justify={"space-between"}>
				<Flex gap={16} align={"start"} justify={"space-between"}>
					<Flex vertical={true}>
						<Title level={5} style={{ fontSize: 14 }}>
							{hotel?.name}
						</Title>
						<Text type={"secondary"} style={{ fontSize: 12 }}>
							{hotel?.city?.city}
						</Text>
					</Flex>
					<RatingTag>{hotel?.rating}</RatingTag>
				</Flex>
				<Title level={5} style={{ fontSize: 14 }}>
					{formatPriceWithCurrency(hotel?.price)}
				</Title>
			</Flex>
		</Flex>
	)
}

export { MapHotelCard }
