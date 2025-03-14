import { createFileRoute } from "@tanstack/react-router"
import { HotelPage } from "src/pages/hotel"

export const Route = createFileRoute("/_layout/hotels/$citySlug/$hotelSlug")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<HotelPage />
		</>
	)
}
