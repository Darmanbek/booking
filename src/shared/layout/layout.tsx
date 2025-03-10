import { Layout as AntdLayout } from "antd"
import { type FC, type PropsWithChildren } from "react"

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<AntdLayout style={{ minHeight: "100vh" }}>{children}</AntdLayout>
		</>
	)
}

export { Layout }
