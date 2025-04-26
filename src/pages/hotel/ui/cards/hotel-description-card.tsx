import { useParams } from "@tanstack/react-router"
import { Card, Descriptions, Flex } from "antd"
import { type FC } from "react"
import {
	useGetHotelsBySlugInfoQuery,
	useGetHotelsBySlugQuery
} from "src/services/hotels"
import { useTranslation } from "src/shared/hooks"
import { Paragraph } from "src/shared/ui"
import { formatPhone } from "src/shared/utils"

const HotelDescriptionCard: FC = () => {
	const { hotelSlug } = useParams({
		from: "/_layout/hotels/$citySlug/$hotelSlug"
	})
	const { t } = useTranslation()
	const { data: hotel, isLoading } = useGetHotelsBySlugQuery(hotelSlug)
	const { data: hotelInfo, isLoading: infoLoading } =
		useGetHotelsBySlugInfoQuery(hotelSlug)

	return (
		<Card title={"Описание отеля"} loading={isLoading || infoLoading}>
			<Flex vertical={true} gap={20}>
				<Flex vertical={true} gap={12}>
					{t(hotel?.data?.description)
						.split("\n")
						.map((item, index) => (
							<Paragraph key={index}>{item}</Paragraph>
						))}
				</Flex>
				<Descriptions
					layout={"vertical"}
					column={{
						xs: 1,
						sm: 2,
						md: 2,
						lg: 2,
						xl: 2,
						xxl: 2
					}}
					items={[
						{
							key: "1",
							label: "Телефон номер",
							children: (
								<a
									href={`tel:${hotelInfo?.data?.first_phone_number}`}
									rel={"nofollow"}
								>
									{formatPhone(hotelInfo?.data?.first_phone_number)}
								</a>
							)
						},
						{
							key: "2",
							label: "Телефон номер (Дополнительный)",
							children: (
								<a
									href={`tel:${hotelInfo?.data?.second_phone_number}`}
									rel={"nofollow"}
								>
									{formatPhone(hotelInfo?.data?.second_phone_number)}
								</a>
							)
						},
						{
							key: "3",
							label: "Электронная почта",
							children: (
								<a href={`mailto:${hotelInfo?.data?.email}`} rel={"nofollow"}>
									{hotelInfo?.data?.email}
								</a>
							)
						},
						{
							key: "4",
							label: "Веб-сайт",
							children: (
								<a
									href={hotelInfo?.data?.site_url}
									target={"_blank"}
									rel={"nofollow"}
								>
									{hotelInfo?.data?.site_url}
								</a>
							)
						}
					]}
				/>
			</Flex>
		</Card>
	)
}

export { HotelDescriptionCard }
