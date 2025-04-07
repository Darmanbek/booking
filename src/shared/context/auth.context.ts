import { createContext } from "react"
import type { Tokens } from "src/services/shared"

export type AuthContextValues = {
	isAuth: boolean
	login: (tokens: Tokens, remember?: boolean) => void
	logout: () => void
}

export const AuthContext = createContext<AuthContextValues | null>(null)
