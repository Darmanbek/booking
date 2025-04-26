import { type FC, type PropsWithChildren } from "react"
import { HelmetProvider } from "react-helmet-async"
import { AntdProvider } from "./antd-provider"
import { AuthProvider } from "./auth-provider"
import { ReactQueryProvider } from "./react-query-provider"

const Providers: FC<PropsWithChildren> = ({ children }) => (
	<ReactQueryProvider>
		<HelmetProvider>
			<AuthProvider>
				<AntdProvider>{children}</AntdProvider>
			</AuthProvider>
		</HelmetProvider>
	</ReactQueryProvider>
)

export { Providers }
