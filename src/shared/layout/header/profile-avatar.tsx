import {
	HeartOutlined,
	LoadingOutlined,
	LogoutOutlined,
	OrderedListOutlined,
	SettingOutlined,
	UserOutlined
} from "@ant-design/icons"
import { useLocation, useNavigate } from "@tanstack/react-router"
import { Avatar, Dropdown, Space } from "antd"
import { useResponsive } from "antd-style"
import { type FC } from "react"
import { useGetMeQuery, useLogoutMutation } from "src/services/users"
import { useAuth } from "src/shared/hooks"
import { Title } from "src/shared/ui"
import { tokenStorage } from "src/shared/utils"

const ProfileAvatar: FC = () => {
	const navigate = useNavigate()
	const { md } = useResponsive()
	const { pathname } = useLocation()
	const { data: profile, isLoading } = useGetMeQuery()
	const auth = useAuth()
	const { mutate: logout, isPending: logoutLoading } = useLogoutMutation()

	const onSelectMenu = (key: string) => {
		if (key === "/logout") {
			logout({
				refresh_token: tokenStorage.getRefresh()
			})
			auth.logout()
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
						icon: logoutLoading ? (
							<LoadingOutlined spin={true} />
						) : (
							<LogoutOutlined />
						),
						danger: true,
						label: "Выйти"
					}
				]
			}}
		>
			<Space style={{ cursor: "pointer" }}>
				<Avatar
					icon={isLoading ? <LoadingOutlined spin={true} /> : <UserOutlined />}
				/>
				{md ? (
					<Title level={5} style={{ fontSize: 16 }}>
						{isLoading
							? "Загрузка"
							: `${profile?.data?.first_name} ${profile?.data?.last_name}`}
					</Title>
				) : null}
			</Space>
		</Dropdown>
	)
}

export { ProfileAvatar }
