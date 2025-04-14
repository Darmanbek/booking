import { createFileRoute } from "@tanstack/react-router"
import { ReversePage } from "src/pages/reverse"

export const Route = createFileRoute("/_layout/orders/$orderId/reverse/$hotelSlug")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<ReversePage />
		</>
	)
}
