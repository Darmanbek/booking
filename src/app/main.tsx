import L from "leaflet"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Providers } from "src/app/providers"
import { App } from "./app"
import "./styles/index.css"

import "leaflet/dist/leaflet.css"

L.Icon.Default.imagePath = "/"

createRoot(document.getElementById("hotel")!).render(
	<StrictMode>
		<Providers>
			<App />
		</Providers>
	</StrictMode>
)
