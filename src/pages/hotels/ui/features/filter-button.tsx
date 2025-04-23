import { FilterFilled } from "@ant-design/icons"
import { Button } from "antd"
import { type FC } from "react"
import { useTranslation } from "src/shared/hooks"
import { useMenuStore } from "src/shared/store"

const FilterButton: FC = () => {
	const { toggleFilter } = useMenuStore()
	const { t } = useTranslation()

	return (
		<>
			<Button
				type={"link"}
				block={true}
				onClick={toggleFilter}
				icon={<FilterFilled />}
			>
				{t("Фильтры")}
			</Button>
		</>
	)
}

export { FilterButton }
