import { useParams } from "@tanstack/react-router"
import { Card, Flex } from "antd"
import { type FC } from "react"
import { useGetHotelsBySlugQuery } from "src/services/hotels"
import { useTranslation } from "src/shared/hooks"
import { Paragraph } from "src/shared/ui"

const HotelDescriptionCard: FC = () => {
	const { hotelSlug } = useParams({
		from: "/_layout/hotels/$citySlug/$hotelSlug"
	})
	const { t } = useTranslation()
	const { data: hotel, isLoading } = useGetHotelsBySlugQuery(hotelSlug)

	return (
		<Card title={"Описание отеля"} loading={isLoading}>
			<Flex vertical={true} gap={20}>
				<Flex vertical={true} gap={12}>
					{t(hotel?.data.description)
						.split("\n")
						.map((item, index) => (
							<Paragraph key={index}>{item}</Paragraph>
						))}
				</Flex>
			</Flex>
		</Card>
	)
}

export { HotelDescriptionCard }
