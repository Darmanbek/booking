import { createFileRoute } from "@tanstack/react-router"
import { HomePage } from "src/pages/home"
import { Seo } from "src/widgets/seo"

export const Route = createFileRoute("/_layout/")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<Seo title={"NBooking"} canonical={"/"} />
			<HomePage />
		</>
	)
}
