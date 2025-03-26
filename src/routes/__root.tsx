import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import type { AuthContextValues } from "src/shared/context/auth.context"

export const Route = createRootRouteWithContext<{
	auth?: AuthContextValues
}>()({
	component: RootComponent
})

function RootComponent() {
	return (
		<>
			<Outlet />
		</>
	)
}
