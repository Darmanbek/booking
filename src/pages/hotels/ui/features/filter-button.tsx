import { FilterFilled } from "@ant-design/icons"
import { Button } from "antd"
import { type FC } from "react"
import { useMenuStore } from "src/shared/store"

const FilterButton: FC = () => {
	const { toggleFilter } = useMenuStore()

	return (
		<>
			<Button
				type={"link"}
				block={true}
				onClick={toggleFilter}
				icon={<FilterFilled />}
			>
				Фильтры
			</Button>
		</>
	)
}

export { FilterButton }
