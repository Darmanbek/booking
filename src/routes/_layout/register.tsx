import { createFileRoute } from "@tanstack/react-router"
import { RegisterPage } from "src/pages/register"
import { Seo } from "src/widgets/seo"

export const Route = createFileRoute("/_layout/register")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<Seo title={"Регистация"} canonical={"/register"} />
			<RegisterPage />
		</>
	)
}
