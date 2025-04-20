import { useNavigate, useSearch } from "@tanstack/react-router"
import { Button, Divider, Drawer, Form, FormProps } from "antd"
import { type FC } from "react"
import type { FilterChange } from "src/pages/hotels/types"
import {
	AmenitiesFormItem,
	DistanceFormItem,
	PricesFormItem
} from "src/pages/hotels/ui/forms/form-items"
import { useGetAmenitiesQuery } from "src/services/amenities"
import { useDebounceEffect } from "src/shared/hooks"
import { useMenuStore } from "src/shared/store"
import { formatNumber } from "src/shared/utils"

const HotelsDrawerForm: FC = () => {
	const { filter, toggleFilter } = useMenuStore()
	const [form] = Form.useForm<FilterChange>()
	const searchParams = useSearch({
		from: "/_layout/hotels/$citySlug/"
	})
	const navigate = useNavigate()

	const { data: amenitiesData, isLoading } = useGetAmenitiesQuery()

	const onFinish: FormProps<FilterChange>["onFinish"] = (values) => {
		const amenities = values.amenities
			?.map((val, index) => (val !== undefined ? `${index}:${val}` : null))
			.filter(Boolean)
			.join("-")
		navigate({
			to: ".",
			search: (prev) => ({
				...prev,
				amenities,
				distance: formatNumber(values?.distance, 30),
				from_price: formatNumber(values?.prices?.[0], 0),
				to_price: formatNumber(values?.prices?.[1], 10_000_000)
			})
		})
		toggleFilter()
	}

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
		<Drawer
			open={filter}
			placement={"left"}
			onClose={() => {
				if (filter) {
					toggleFilter()
				}
			}}
			title={"Все фильтры"}
			footer={
				<Button
					onClick={form.submit}
					type={"primary"}
					size={"large"}
					block={true}
				>
					Применить
				</Button>
			}
		>
			<Form<FilterChange>
				layout={"vertical"}
				onFinish={onFinish}
				autoComplete={"off"}
				requiredMark={false}
				name={"hotels-filter-drawer-form"}
				form={form}
				style={{ position: "sticky", top: 20, left: 0, right: 0 }}
			>
				<PricesFormItem form={form} isLocal={true} />
				<Divider />
				<DistanceFormItem form={form} isLocal={true} />
				<Divider />
				<AmenitiesFormItem
					isLocal={true}
					data={amenitiesData?.data}
					form={form}
					loading={isLoading}
				/>
			</Form>
		</Drawer>
	)
}

export { HotelsDrawerForm }
