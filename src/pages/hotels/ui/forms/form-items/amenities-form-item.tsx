import { useNavigate } from "@tanstack/react-router"
import { Form, type FormInstance, Skeleton } from "antd"
import { type FC, useMemo } from "react"
import type { FilterChange } from "src/pages/hotels/types"
import type { HotelAmenity } from "src/services/amenities"
import { useDebounceEffect, useTranslation } from "src/shared/hooks"
import { default as AmenityFormItem } from "./amenity-form-item"

interface AmenitiesFormItemProps {
	data?: HotelAmenity[]
	loading: boolean
	form: FormInstance<FilterChange>
	isLocal?: boolean
}

const AmenitiesFormItem: FC<AmenitiesFormItemProps> = ({
	form,
	data,
	loading,
	isLocal
}) => {
	const { t } = useTranslation()
	const amenities = Form.useWatch("amenities", form)
	const navigate = useNavigate()

	const filterAmenities = useMemo(() => {
		if (amenities?.length === 0) return undefined
		return amenities
			?.map((val, index) => (val !== undefined ? `${index}:${val}` : null))
			.filter(Boolean)
			.join("-")
	}, [amenities])

	const uniqueAmenities = useMemo(() => {
		if (!data) return []
		let itemKey = 0
		return data?.map((el) => ({
			...el,
			hotel_amenities: el.hotel_amenities?.map((subEl) => ({
				...subEl,
				key: itemKey++
			}))
		}))
	}, [data])

	useDebounceEffect(() => {
		if (isLocal) return
		navigate({
			to: ".",
			resetScroll: false,
			search: (prev) => ({
				...prev,
				amenities: filterAmenities
			})
		})
	}, [navigate, filterAmenities, isLocal])
	if (loading) return <Skeleton active={true} />

	return (
		<>
			{uniqueAmenities?.map((item, index) => (
				<Form.Item
					key={index}
					label={t(item?.name)}
					labelCol={{ style: { fontWeight: 600 } }}
				>
					{item?.hotel_amenities?.map((el, ind) => (
						<AmenityFormItem key={ind} form={form} data={el} field={el.key} />
					))}
				</Form.Item>
			))}
		</>
	)
}

export { AmenitiesFormItem }
