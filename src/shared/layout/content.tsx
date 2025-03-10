import { Layout } from "antd"
import { type FC, type PropsWithChildren } from "react"

const Content: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Layout.Content
				style={{
					padding: "24px 0"
				}}
			>
				{children}
			</Layout.Content>
		</>
	)
}

export { Content }
