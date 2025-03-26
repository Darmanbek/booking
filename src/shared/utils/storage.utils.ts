import Cookies from "js-cookie"

export const tokenStorage = {
	get: (): string | null => Cookies.get("token") || null,
	set: (token: string, remember?: boolean) => {
		Cookies.set("token", token, {
			expires: remember ? 30 : 7
		})
	},
	clear(): void {
		Cookies.remove("token")
	}
}
