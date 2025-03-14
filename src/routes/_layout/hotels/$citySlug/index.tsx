import { createFileRoute } from "@tanstack/react-router"
import { HotelsPage } from "src/pages/hotels"
import type { GetSearchParams } from "src/shared/types/params.types"

export const Route = createFileRoute("/_layout/hotels/$citySlug/")({
	component: RouteComponent,
	validateSearch: (search: GetSearchParams): GetSearchParams => search
})

function RouteComponent() {
	return (
		<>
			<HotelsPage />
		</>
	)
}
