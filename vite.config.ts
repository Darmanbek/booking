import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		TanStackRouterVite({
			target: "react",
			autoCodeSplitting: true,
			semicolons: false,
			quoteStyle: "double"
		}),
		react()
	],
	resolve: {
		alias: {
			src: path.resolve(__dirname, "./src")
		}
	}
})
