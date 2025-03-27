import { PlusOutlined } from "@ant-design/icons"
import { Button, Divider, Flex, type FormListFieldData, Space } from "antd"
import { type FC } from "react"
import { useToken } from "src/shared/hooks"
import { GuestCountListItem } from "./guest-count-list-item"

interface GuestCountListProps {
	fields: FormListFieldData[]
	add: () => void
	remove: (index: number) => void
	onClose: () => void
}

const GuestCountList: FC<GuestCountListProps> = ({
	fields,
	remove,
	add,
	onClose
}) => {
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
				{fields.map((field, index) => (
					<GuestCountListItem field={field} remove={remove} key={index} />
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
					right: 0,
					marginTop: "auto"
				}}
			>
				<Button type={"link"} onClick={() => add()} icon={<PlusOutlined />}>
					Добавить номер
				</Button>
				<Button type={"primary"} onClick={onClose}>
					Готово
				</Button>
			</Space>
		</Flex>
	)
}

export { GuestCountList }
