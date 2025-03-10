import { type FC, type PropsWithChildren } from "react"
import { AntdProvider } from "src/app/providers/antd-provider"

const Providers: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<AntdProvider>{children}</AntdProvider>
		</>
	)
}

export { Providers }
