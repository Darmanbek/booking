import {
	Card,
	Checkbox,
	Col,
	Divider,
	Form,
	Row,
	Skeleton,
	Slider,
	Space
} from "antd"
import { type FC } from "react"
import { useGetAmenitiesQuery } from "src/services/amenities"
import { useTranslation } from "src/shared/hooks"
import { InputPrice } from "src/shared/ui"
import { formatPrice } from "src/shared/utils/format.utils"

const HotelsForm: FC = () => {
	const [form] = Form.useForm()
	const { t } = useTranslation()

	const prices = Form.useWatch("prices", form)
	const distance = Form.useWatch("max_distance_to_center", form)
	const amenitiesData = Form.useWatch("amenities", form)

	console.log({ prices })
	console.log({ distance })
	console.log({ amenitiesData })

	const { data: amenities, isLoading } = useGetAmenitiesQuery()

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
				<Divider />
				<Form.Item label={"Расположение от центра города"}>
					<Row gutter={16}>
						<Col xs={24} sm={18}>
							<Form.Item name={"max_distance_to_center"} initialValue={30}>
								<Slider max={30} />
							</Form.Item>
						</Col>
						<Col xs={24} sm={6}>
							<Form.Item name={"max_distance_to_center"} initialValue={30}>
								<InputPrice min={0} max={30} />
							</Form.Item>
						</Col>
					</Row>
				</Form.Item>
				<Divider />
				{isLoading ? (
					<Skeleton active={true} />
				) : (
					amenities?.data?.map((item, index) => (
						<Form.Item
							key={index}
							label={t(item?.name)}
							labelCol={{ style: { fontWeight: 600 } }}
						>
							{item?.hotel_amenities?.map((el, ind) => (
								<Form.Item
									key={ind}
									style={{ marginBottom: 0 }}
									name={["amenities", index, "amenity", ind]}
									valuePropName={"checked"}
									initialValue={false}
								>
									<Checkbox>{t(el.name)}</Checkbox>
								</Form.Item>
							))}
						</Form.Item>
					))
				)}
			</Card>
		</Form>
	)
}

export { HotelsForm }
