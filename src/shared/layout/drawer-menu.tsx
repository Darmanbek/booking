import {
	HeartOutlined,
	LoginOutlined,
	OrderedListOutlined,
	SettingOutlined,
	TeamOutlined
} from "@ant-design/icons"
import { Link, useNavigate } from "@tanstack/react-router"
import { Divider, Drawer, Flex, Menu, type MenuProps } from "antd"
import { type FC } from "react"
import { useAuth, useToken } from "src/shared/hooks"
import { LangSelect } from "src/shared/layout/header/lang-select"
import { MenuButton } from "src/shared/layout/header/menu-button"
import { useMenuStore } from "src/shared/store"
import { Logo, Text } from "src/shared/ui"

const items: MenuProps["items"] = [
	{
		key: "/profile/settings",
		icon: <SettingOutlined />,
		label: "Настрока профиля"
	},
	{
		key: "/orders",
		icon: <OrderedListOutlined />,
		label: "Мои бронирования"
	},
	{
		key: "/favorites",
		icon: <HeartOutlined />,
		label: "Мои избранные отели"
	},
	{
		type: "divider"
	}
]

const authItems: MenuProps["items"] = [
	{
		key: "/login",
		icon: <LoginOutlined />,
		label: "Войти"
	},
	{
		key: "/register",
		icon: <TeamOutlined />,
		label: "Регистрация"
	}
]

const DrawerMenu: FC = () => {
	const { open, toggleOpen } = useMenuStore()
	const navigate = useNavigate()

	const { isAuth } = useAuth()

	const { token } = useToken()

	const onSelectMenu = (key: string) => {
		navigate({
			to: key
		})
	}

	const onCloseMenu = () => {
		if (open) {
			toggleOpen()
		}
	}

	return (
		<>
			<Drawer
				width={"100%"}
				open={open}
				onClose={onCloseMenu}
				closable={false}
				styles={{
					body: {
						padding: "0 16px 16px"
					}
				}}
			>
				<Flex
					style={{
						minHeight: 64
					}}
					align={"center"}
					justify={"space-between"}
				>
					<Link to={"/"} style={{ color: token.colorPrimary }}>
						<Logo titleProps={{ style: { color: "inherit" } }} />
					</Link>
					<MenuButton isActive={true} />
				</Flex>
				<Divider style={{ marginBlock: 8 }} />
				<Menu
					onSelect={(item) => onSelectMenu(item.key)}
					items={isAuth ? items : authItems}
				/>
				<Divider style={{ marginBlock: 8 }} />
				<Flex gap={8} justify={"space-between"} align={"center"}>
					<Text>Сменить язык:</Text>
					<LangSelect />
				</Flex>
				<Menu />
			</Drawer>
		</>
	)
}

export { DrawerMenu }
