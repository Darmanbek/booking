import { useSearch } from "@tanstack/react-router"
import { Card, Divider, Form } from "antd"
import { type FC } from "react"
import { type FilterChange } from "src/pages/hotels/types"
import { useGetAmenitiesQuery } from "src/services/amenities"
import { useDebounceEffect } from "src/shared/hooks"
import { formatNumber } from "src/shared/utils"
import {
	AmenitiesFormItem,
	DistanceFormItem,
	PricesFormItem
} from "./form-items"

const HotelsForm: FC = () => {
	const [form] = Form.useForm<FilterChange>()
	const searchParams = useSearch({
		from: "/_layout/hotels/$citySlug/"
	})

	const { data: amenitiesData, isLoading } = useGetAmenitiesQuery()

	useDebounceEffect(() => {
		if (searchParams) {
			form.setFieldsValue({
				prices: [
					formatNumber(searchParams?.from_price, 0),
					formatNumber(searchParams?.to_price, 10_000_000)
				],
				distance: formatNumber(searchParams.distance, 30),
				amenities: searchParams.amenities?.split("-")?.reduce(
					(acc, pair) => {
						const [index, value] = pair.split(":").map(Number)
						acc[index] = value
						return acc
					},
					[] as (number | undefined)[]
				)
			})
		}
	}, [form])
	return (
		<Form<FilterChange>
			layout={"vertical"}
			autoComplete={"off"}
			requiredMark={false}
			name={"hotels-filter-form"}
			form={form}
			style={{ position: "sticky", top: 20, left: 0, right: 0 }}
		>
			<Card title={"Все фильтры"}>
				<PricesFormItem form={form} />
				<Divider />
				<DistanceFormItem form={form} />
				<Divider />
				<AmenitiesFormItem
					data={amenitiesData?.data}
					form={form}
					loading={isLoading}
				/>
			</Card>
		</Form>
	)
}

export { HotelsForm }
