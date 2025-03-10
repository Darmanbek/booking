import { Flex } from "antd"
import type { FC, PropsWithChildren } from "react"
import { Title } from "src/shared/ui"

interface TitleContainerProps {
	title: string
}

const TitleContainer: FC<PropsWithChildren<TitleContainerProps>> = ({
	children,
	title
}) => {
	return (
		<Flex vertical={true}>
			<Title level={2} style={{ marginBottom: 16, fontSize: 24 }}>
				{title}
			</Title>
			{children}
		</Flex>
	)
}

export { TitleContainer }
