import { Link, useNavigate } from "@tanstack/react-router"
import { Button, Flex, Layout, Space } from "antd"
import { useResponsive } from "antd-style"
import { type FC } from "react"
import { useAuth, useToken } from "src/shared/hooks"
import { Container, Logo } from "src/shared/ui"
import { LangSelect } from "./lang-select"
import { MenuButton } from "./menu-button"
import { ProfileAvatar } from "./profile-avatar"

const Header: FC = () => {
	const { token } = useToken()
	const navigate = useNavigate()
	const { isAuth } = useAuth()
	const { md } = useResponsive()

	return (
		<Layout.Header
			style={{
				backgroundColor: token.colorBgContainer,
				// borderBottom: `1px solid ${token.colorBorder}`
				paddingInline: 0
			}}
		>
			<Container>
				<Flex align={"center"} gap={8} justify={"space-between"}>
					<Link to={"/"} style={{ color: token.colorPrimary }}>
						<Logo titleProps={{ style: { color: "inherit" } }} />
					</Link>
					<Space>
						{md && <LangSelect />}
						{isAuth ? (
							<>
								<ProfileAvatar />
							</>
						) : md ? (
							<>
								<Button
									type={"primary"}
									onClick={() =>
										navigate({
											to: "/register"
										})
									}
								>
									Зарегистрироваться
								</Button>
								<Button
									type={"link"}
									onClick={() =>
										navigate({
											to: "/login"
										})
									}
								>
									Войти
								</Button>
							</>
						) : null}
						<MenuButton />
					</Space>
				</Flex>
			</Container>
		</Layout.Header>
	)
}

export { Header }
