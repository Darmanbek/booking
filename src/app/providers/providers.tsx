import { type FC, type PropsWithChildren } from "react"
import { AntdProvider } from "./antd-provider"
import { AuthProvider } from "./auth-provider"

const Providers: FC<PropsWithChildren> = ({ children }) => {
	return (
		<AuthProvider>
			<AntdProvider>{children}</AntdProvider>
		</AuthProvider>
	)
}

export { Providers }
