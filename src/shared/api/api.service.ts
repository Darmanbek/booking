import type { Tokens } from "src/services/shared"
import { classic } from "./api.instance"

export const refreshAccessToken = async (
	refreshToken: string | null
): Promise<Tokens> => {
	const response = await classic.post("/users/auth/refresh", {
		refresh_token: refreshToken
	})
	return response.data
}
