import { LoadingOutlined } from "@ant-design/icons"
import { createRouter } from "@tanstack/react-router"
import { Spin } from "antd"
import { routeTree } from "src/routeTree.gen"
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
	defaultPendingComponent: () => (
		<Spin
			fullscreen={true}
			spinning={true}
			indicator={<LoadingOutlined style={{ fontSize: 32, color: "#fff" }} />}
		/>
	)
})

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}
