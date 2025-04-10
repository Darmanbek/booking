import { Card, Form, Slider, Space } from "antd"
import { type FC } from "react"
import { InputPrice } from "src/shared/ui"
import { formatPrice } from "src/shared/utils/format.utils"

const HotelsForm: FC = () => {
	const [form] = Form.useForm()

	return (
		<Form
			layout={"vertical"}
			autoComplete={"off"}
			requiredMark={false}
			name={"hotels-form"}
			form={form}
			style={{ position: "sticky", top: 20, left: 0, right: 0 }}
		>
			<Card title={"Все фильтры"}>
				<Form.Item label={"Цена за ночь"}>
					<Space split={"до"} align={"baseline"}>
						<Form.Item name={["prices", 0]} initialValue={0}>
							<InputPrice />
						</Form.Item>
						<Form.Item name={["prices", 1]} initialValue={10_000_000}>
							<InputPrice />
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
			</Card>
		</Form>
	)
}

export { HotelsForm }
