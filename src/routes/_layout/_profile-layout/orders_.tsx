import { createFileRoute } from "@tanstack/react-router"
import { OrdersPage } from "src/pages/orders"

export const Route = createFileRoute("/_layout/_profile-layout/orders_")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<OrdersPage />
		</>
	)
}
