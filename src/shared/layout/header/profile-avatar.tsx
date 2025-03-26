import {
	HeartOutlined,
	LogoutOutlined,
	OrderedListOutlined,
	SettingOutlined,
	UserOutlined
} from "@ant-design/icons"
import { useLocation, useNavigate } from "@tanstack/react-router"
import { Avatar, Dropdown, Space } from "antd"
import { type FC } from "react"
import { useAuth } from "src/shared/hooks"
import { Title } from "src/shared/ui"

const ProfileAvatar: FC = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { logout } = useAuth()

	const onSelectMenu = (key: string) => {
		if (key === "/logout") {
			console.log("Logout")
			logout()
			return
		}
		navigate({
			to: key
		})
	}

	return (
		<Dropdown
			trigger={["click"]}
			placement={"bottomRight"}
			menu={{
				onSelect: (item) => onSelectMenu(item.key),
				selectable: true,
				selectedKeys: [pathname],
				items: [
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
					},
					{
						key: "/logout",
						icon: <LogoutOutlined />,
						danger: true,
						label: "Выйти"
					}
				]
			}}
		>
			<Space style={{ cursor: "pointer" }}>
				<Avatar icon={<UserOutlined />} />
				<Title level={5} style={{ fontSize: 16 }}>
					Alex Mercer
				</Title>
			</Space>
		</Dropdown>
	)
}

export { ProfileAvatar }
