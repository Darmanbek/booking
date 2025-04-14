import { CloseOutlined, MenuOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useResponsive } from "antd-style"
import { type FC } from "react"
import { useMenuStore } from "src/shared/store"

interface MenuButtonProps {
	isActive?: boolean
}

const MenuButton: FC<MenuButtonProps> = ({ isActive }) => {
	const { md } = useResponsive()
	const toggleOpen = useMenuStore((state) => state.toggleOpen)

	if (md) return

	return (
		<>
			<Button
				type={"text"}
				icon={isActive ? <CloseOutlined /> : <MenuOutlined />}
				onClick={toggleOpen}
			/>
		</>
	)
}

export { MenuButton }
