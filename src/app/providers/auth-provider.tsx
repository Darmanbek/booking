import { type FC, type PropsWithChildren, useState } from "react"
import {
	AuthContext,
	type AuthContextValues
} from "src/shared/context/auth.context"
import { tokenStorage } from "src/shared/utils/storage.utils"

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isAuth, setIsAuth] = useState(() => !!tokenStorage.get())

	const login: AuthContextValues["login"] = (token, remember) => {
		tokenStorage.set(token, remember)
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
