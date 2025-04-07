import { type FC, type PropsWithChildren, useState } from "react"
import {
	AuthContext,
	type AuthContextValues
} from "src/shared/context/auth.context"
import { tokenStorage } from "src/shared/utils/storage.utils"

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isAuth, setIsAuth] = useState(() => !!tokenStorage.getAccess())

	const login: AuthContextValues["login"] = (tokens, remember) => {
		tokenStorage.setAccess(tokens.access_token, remember)
		if (tokens.refresh_token) {
			tokenStorage.setRefresh(tokens.refresh_token, remember)
		}
		setIsAuth(true)
	}

	const logout: AuthContextValues["logout"] = () => {
		tokenStorage.clear()
		setIsAuth(false)
	}

	return (
		<AuthContext.Provider
			value={{
				isAuth,
				login,
				logout
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthProvider }
