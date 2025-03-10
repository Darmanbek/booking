import { createFileRoute } from "@tanstack/react-router"
import { HomePage } from "src/pages/home"

export const Route = createFileRoute("/_layout/")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: "Главная"
			}
		]
	})
})

function RouteComponent() {
	return (
		<>
			<HomePage />
		</>
	)
}
