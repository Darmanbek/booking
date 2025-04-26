import { createFileRoute } from "@tanstack/react-router"
import { HotelPage } from "src/pages/hotel"
import {
	useGetHotelsBySlugImagesQuery,
	useGetHotelsBySlugQuery
} from "src/services/hotels"
import { useTranslation } from "src/shared/hooks"
import { Seo } from "src/widgets/seo"

export const Route = createFileRoute("/_layout/hotels/$citySlug/$hotelSlug")({
	component: RouteComponent
})

function RouteComponent() {
	const { hotelSlug, citySlug } = Route.useParams()
	const { t } = useTranslation()
	const { data: hotel } = useGetHotelsBySlugQuery(hotelSlug)
	const { data: hotelImages } = useGetHotelsBySlugImagesQuery(hotelSlug)

	return (
		<>
			<Seo
				title={t(hotel?.data?.name)}
				description={t(hotel?.data?.description)}
				canonical={`/hotels/${citySlug}/${hotelSlug}`}
				image={`${hotelImages?.data?.[0]?.image}`}
			/>
			<HotelPage />
		</>
	)
}
