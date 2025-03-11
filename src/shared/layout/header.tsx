import { Button, Flex, Layout, Space } from "antd"
import { type FC } from "react"
import { useToken } from "src/shared/hooks"
import { Container, Logo } from "src/shared/ui"

const Header: FC = () => {
	const { token } = useToken()

	return (
		<Layout.Header
			style={{
				backgroundColor: token.colorBgContainer
				// borderBottom: `1px solid ${token.colorBorder}`
			}}
		>
			<Container>
				<Flex
					align={"center"}
					gap={8}
					justify={"space-between"}
					style={{
						padding: "0 16px",
						height: "100%"
					}}
				>
					<Logo />
					<Space>
						<Button type={"primary"}>Зарегистрироваться</Button>
						<Button type={"link"}>Войти</Button>
					</Space>
				</Flex>
			</Container>
		</Layout.Header>
	)
}

export { Header }
