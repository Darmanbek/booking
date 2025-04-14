import {
	FacebookFilled,
	InstagramFilled,
	SendOutlined,
	TwitterOutlined,
	YoutubeFilled
} from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import { Button, Flex, Space } from "antd"
import { useResponsive } from "antd-style"
import { type FC } from "react"
import { Logo } from "src/shared/ui"

const FooterHeader: FC = () => {
	const { sm } = useResponsive()

	return (
		<Flex gap={20} justify={sm ? "space-between" : "center"} wrap={true}>
			<Link to={"/"}>
				<Logo />
			</Link>
			<Space>
				<Button
					size={"large"}
					shape={"circle"}
					type={"text"}
					icon={<FacebookFilled />}
				/>
				<Button
					size={"large"}
					shape={"circle"}
					type={"text"}
					icon={<InstagramFilled />}
				/>
				<Button
					size={"large"}
					shape={"circle"}
					type={"text"}
					icon={<YoutubeFilled />}
				/>
				<Button
					size={"large"}
					shape={"circle"}
					type={"text"}
					icon={<TwitterOutlined />}
				/>
				<Button
					size={"large"}
					shape={"circle"}
					type={"text"}
					icon={<SendOutlined rotate={-45} />}
				/>
			</Space>
		</Flex>
	)
}

export { FooterHeader }
