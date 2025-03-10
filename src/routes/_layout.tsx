import { createFileRoute, Outlet } from "@tanstack/react-router"
import { Content, Footer, Header, Layout, Navbar } from "src/shared/layout"

export const Route = createFileRoute("/_layout")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<Layout>
			<Header />
			<Navbar />
			<Content>
				<Outlet />
			</Content>
			<Footer />
		</Layout>
	)
}
