import axios, { type AxiosError } from "axios"
import { BASE_URL } from "src/shared/config"
import { tokenStorage } from "src/shared/utils"
import { refreshAccessToken } from "./api.service"

const api = axios.create({
	baseURL: `${BASE_URL}/api/v1`
})

const classic = axios.create({
	baseURL: `${BASE_URL}/api/v1`
})

api.interceptors.request.use((config) => {
	const token = tokenStorage.getAccess()
	if (token) {
		config.headers["Authorization"] = `Bearer ${token}`
	}

	return config
})

api.interceptors.response.use(
	(response) => response,
	async (
		error: AxiosError & {
			config: AxiosError["config"] & {
				_Retry: boolean
			}
		}
	) => {
		const originalRequest = error.config
		if (error.status === 401 && !originalRequest._Retry) {
			originalRequest._Retry = true // Mark the request as retried to avoid infinite loops.
			try {
				const refreshToken = tokenStorage.getRefresh() // Retrieve the stored refresh token.
				// Make a request to your auth server to refresh the token.
				const response = await refreshAccessToken(refreshToken)
				const { access_token } = response.data
				// Store the new access and refresh tokens.
				tokenStorage.setAccess(access_token)
				// Update the authorization header with the new access token.
				api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`
				return api(originalRequest) // Retry the original request with the new access token.
			} catch (refreshError) {
				// Handle refresh token errors by clearing stored tokens and redirecting to the login page.
				console.error("Token refresh failed:", refreshError)
				tokenStorage.clear()
			}
		}
		return Promise.reject(error)
	}
)

export { api, classic }
