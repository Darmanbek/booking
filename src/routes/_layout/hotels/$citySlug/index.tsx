import { createFileRoute } from "@tanstack/react-router"
import { HotelsPage } from "src/pages/hotels"
import { useGetLocationBySlugQuery } from "src/services/locations"
import { useTranslation } from "src/shared/hooks"
import type { GetSearchParams } from "src/shared/types/params.types"
import { Seo } from "src/widgets/seo"

export const Route = createFileRoute("/_layout/hotels/$citySlug/")({
	component: RouteComponent,
	validateSearch: (search: GetSearchParams): GetSearchParams => search
})

function RouteComponent() {
	const { citySlug } = Route.useParams()
	const { t } = useTranslation()

	const { data: location } = useGetLocationBySlugQuery(citySlug)

	return (
		<>
			<Seo
				title={
					location ? `Отели по направлению ${t(location?.data?.name)}` : "Отели"
				}
			/>
			<HotelsPage />
		</>
	)
}
