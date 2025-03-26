import { createContext } from "react"

export type AuthContextValues = {
	isAuth: boolean
	login: (token: string, remember?: boolean) => void
	logout: () => void
}

export const AuthContext = createContext<AuthContextValues | null>(null)
