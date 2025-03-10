import { Button, Flex, Layout, Space } from "antd"
import { type FC } from "react"
import { useToken } from "src/shared/hooks"
import { Container, Logo } from "src/shared/ui"

const Header: FC = () => {
	const { token } = useToken()

	return (
		<Layout.Header
			style={{
				backgroundColor: token.blue8
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
					<Logo
						titleProps={{
							style: {
								color: token.colorWhite
							}
						}}
					/>
					<Space>
						<Button>Зарегистрироваться</Button>
						<Button>Войти</Button>
					</Space>
				</Flex>
			</Container>
		</Layout.Header>
	)
}

export { Header }
