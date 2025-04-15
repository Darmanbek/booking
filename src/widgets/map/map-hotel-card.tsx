import { Link } from "@tanstack/react-router"
import { Flex, Image } from "antd"
import { type FC } from "react"
import type { Hotel } from "src/services/hotels"
import { useTranslation } from "src/shared/hooks"
import { Text, Title } from "src/shared/ui"
import { formatPriceWithCurrency } from "src/shared/utils/format.utils"
import { RatingTag } from "src/widgets/rating-tag"

interface MapHotelCardProps {
	data?: Hotel
}

const MapHotelCard: FC<MapHotelCardProps> = ({ data: hotel }) => {
	const { t } = useTranslation()

	return (
		<Link
			to={"/hotels/$citySlug/$hotelSlug"}
			params={{
				citySlug: hotel?.location?.city || "",
				hotelSlug: hotel?.slug || ""
			}}
			target={"_blank"}
		>
			<Flex gap={8}>
				<Image
					preview={false}
					width={75}
					height={75}
					style={{ borderRadius: 8 }}
					src={hotel?.images?.[0]?.image}
				/>
				<Flex vertical={true} gap={8} justify={"space-between"}>
					<Flex gap={16} align={"start"} justify={"space-between"}>
						<Flex vertical={true} style={{ minWidth: 70 }}>
							<Title level={5} style={{ fontSize: 14 }}>
								{t(hotel?.name)}
							</Title>
							<Text type={"secondary"} style={{ fontSize: 12 }}>
								{t(hotel?.location?.city)}
							</Text>
						</Flex>
						<RatingTag>
							{Number(Number(hotel?.rating) || 0).toFixed(1)}
						</RatingTag>
					</Flex>
					<Title level={5} style={{ fontSize: 14 }}>
						{formatPriceWithCurrency(hotel?.min_price)}
					</Title>
				</Flex>
			</Flex>
		</Link>
	)
}

export { MapHotelCard }
