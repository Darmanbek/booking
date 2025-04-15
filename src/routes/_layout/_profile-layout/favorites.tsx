import { createFileRoute } from "@tanstack/react-router"
import { FavoritesPage } from "src/pages/favorites"

export const Route = createFileRoute("/_layout/_profile-layout/favorites")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<FavoritesPage />
		</>
	)
}
