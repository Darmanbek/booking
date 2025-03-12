import { createFileRoute } from "@tanstack/react-router"
import { HotelsPage } from "src/pages/hotels"

export const Route = createFileRoute("/_layout/hotels/$citySlug")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<HotelsPage />
		</>
	)
}
