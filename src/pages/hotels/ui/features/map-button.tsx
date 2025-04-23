import { AimOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { type FC } from "react"
import { useTranslation } from "src/shared/hooks"
import { useMenuStore } from "src/shared/store"

const MapButton: FC = () => {
	const { toggleMap } = useMenuStore()
	const { t } = useTranslation()

	return (
		<>
			<Button
				onClick={toggleMap}
				type={"link"}
				block={true}
				icon={<AimOutlined />}
			>
				{t("Карта")}
			</Button>
		</>
	)
}

export { MapButton }
