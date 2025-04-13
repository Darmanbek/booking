import { createRouter } from "@tanstack/react-router"
import { routeTree } from "src/routeTree.gen"
import { ErrorBoundary, NotFound } from "src/shared/layout"
import { Loader } from "src/widgets/loader"
// Import the generated route tree

// Create a new router instance
export const router = createRouter({
	routeTree,
	context: {
		auth: undefined
	},
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
	defaultPendingComponent: () => <Loader loading={true} />,
	defaultErrorComponent: ErrorBoundary,
	defaultNotFoundComponent: NotFound
})

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}
