import type { ResponseSingleData, Tokens } from "src/services/shared"
import { classic } from "./api.instance"

export const refreshAccessToken = async (
	refreshToken: string | null
): Promise<ResponseSingleData<Tokens>> => {
	const response = await classic.post("/users/auth/refresh", {
		refresh_token: refreshToken
	})
	return response.data
}
