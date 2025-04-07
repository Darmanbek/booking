import Cookies from "js-cookie"

export const TokenKeys = {
	ACCESS_TOKEN: "access-token",
	REFRESH_TOKEN: "refresh-token"
}

export const tokenStorage = {
	getAccess: (): string | null => Cookies.get(TokenKeys.ACCESS_TOKEN) || null,
	getRefresh: (): string | null => Cookies.get(TokenKeys.REFRESH_TOKEN) || null,
	setAccess: (token: string, remember?: boolean) => {
		Cookies.set(TokenKeys.ACCESS_TOKEN, token, {
			expires: remember ? 30 : 7
		})
	},
	setRefresh: (token: string, remember?: boolean) => {
		Cookies.set(TokenKeys.REFRESH_TOKEN, token, {
			expires: remember ? 30 : 7
		})
	},
	removeAccess(): void {
		Cookies.remove(TokenKeys.ACCESS_TOKEN)
	},
	removeRefresh(): void {
		Cookies.remove(TokenKeys.REFRESH_TOKEN)
	},
	clear(): void {
		Cookies.remove(TokenKeys.ACCESS_TOKEN)
		Cookies.remove(TokenKeys.REFRESH_TOKEN)
	}
}
