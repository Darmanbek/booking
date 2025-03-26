import { createFileRoute } from "@tanstack/react-router"
import { ProfileSettingsPage } from "src/pages/profile-settings"

export const Route = createFileRoute(
	"/_layout/_profile-layout/profile/settings"
)({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<ProfileSettingsPage />
		</>
	)
}
