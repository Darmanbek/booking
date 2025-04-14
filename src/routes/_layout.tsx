import { createFileRoute, Outlet } from "@tanstack/react-router"
import {
	Content,
	DrawerMenu,
	Footer,
	Header,
	Layout,
	Navbar
} from "src/shared/layout"

export const Route = createFileRoute("/_layout")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<Layout>
			<Header />
			<DrawerMenu />
			<Navbar />
			<Content>
				<Outlet />
			</Content>
			<Footer />
		</Layout>
	)
}
