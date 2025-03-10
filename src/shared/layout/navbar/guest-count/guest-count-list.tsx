import { PlusOutlined } from "@ant-design/icons"
import { Button, Divider, Flex, Space } from "antd"
import { type FC } from "react"
import { useToken } from "src/shared/hooks"
import { GuestCountListItem } from "./guest-count-list-item"

const GuestCountList: FC = () => {
	const { token } = useToken()
	return (
		<Flex
			vertical={true}
			style={{
				width: "100%",
				position: "relative",
				height: 350,
				overflowX: "hidden",
				overflowY: "auto",
				scrollbarWidth: "thin"
			}}
		>
			<Space
				direction={"vertical"}
				size={0}
				style={{ width: "100%", padding: 20, paddingBottom: 8 }}
				split={<Divider style={{ marginBlock: 16 }} />}
			>
				{Array.from({ length: 5 }).map((_, index) => (
					<GuestCountListItem key={index} />
				))}
			</Space>
			<Space
				style={{
					backgroundColor: token.colorBgContainer,
					width: "100%",
					padding: "16px 20px 8px",
					position: "sticky",
					bottom: 0,
					left: 0,
					right: 0
				}}
			>
				<Button type={"link"} icon={<PlusOutlined />}>
					Добавить номер
				</Button>
				<Button type={"primary"}>Готово</Button>
			</Space>
		</Flex>
	)
}

export { GuestCountList }
