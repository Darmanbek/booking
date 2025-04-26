import { createFileRoute } from "@tanstack/react-router"
import { LoginPage } from "src/pages/login"
import { Seo } from "src/widgets/seo"

export const Route = createFileRoute("/_layout/login")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<Seo title={"Войти"} canonical={"/login"} />
			<LoginPage />
		</>
	)
}
