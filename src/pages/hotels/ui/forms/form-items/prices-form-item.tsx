import { useNavigate } from "@tanstack/react-router"
import { Form, type FormInstance, Slider, Space } from "antd"
import { type FC } from "react"
import { type FilterChange } from "src/pages/hotels/types"
import { useDebounceEffect } from "src/shared/hooks"
import { InputPrice } from "src/shared/ui"
import { formatNumber, formatPrice } from "src/shared/utils"

interface PricesFormItemProps {
	form: FormInstance<FilterChange>
}

const PricesFormItem: FC<PricesFormItemProps> = ({ form }) => {
	const prices = Form.useWatch("prices", form)
	const navigate = useNavigate()

	useDebounceEffect(() => {
		const [min, max] = prices
		navigate({
			to: ".",
			resetScroll: false,
			search: (prev) => ({
				...prev,
				from_price: formatNumber(min),
				to_price: formatNumber(max)
			})
		})
	}, [navigate, prices])
	return (
		<>
			<Form.Item label={"Цена за ночь"}>
				<Space split={"до"} align={"baseline"}>
					<Form.Item name={["prices", 0]} initialValue={0}>
						<InputPrice min={0} max={10_000_000} />
					</Form.Item>
					<Form.Item name={["prices", 1]} initialValue={10_000_000}>
						<InputPrice min={0} max={10_000_000} />
					</Form.Item>
				</Space>
				<Form.Item name={"prices"} initialValue={[10_000, 10_000_000]}>
					<Slider
						range={true}
						tooltip={{
							formatter: formatPrice
						}}
						max={10_000_000}
					/>
				</Form.Item>
			</Form.Item>
		</>
	)
}

export { PricesFormItem }
