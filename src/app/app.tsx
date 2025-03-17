import { RouterProvider } from "@tanstack/react-router"
import { type FC } from "react"
import { router } from "./router"
import { GlobalStyles } from "./styles"

const App: FC = () => {
	return (
		<>
			<GlobalStyles />
			<RouterProvider router={router} />
		</>
	)
}

export { App }
