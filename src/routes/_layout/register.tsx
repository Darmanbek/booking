import { createFileRoute } from "@tanstack/react-router"
import { RegisterPage } from "src/pages/register"

export const Route = createFileRoute("/_layout/register")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<RegisterPage />
		</>
	)
}
