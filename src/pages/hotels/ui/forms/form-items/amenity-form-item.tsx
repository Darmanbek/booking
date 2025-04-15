import { Checkbox, Form, type FormInstance, Input } from "antd"
import { type FC, memo } from "react"
import type { FilterChange } from "src/pages/hotels/types"
import type { Amenity } from "src/services/amenities"
import { useTranslation } from "src/shared/hooks"

interface AmenityFormItemProps {
	form: FormInstance<FilterChange>
	field: number
	data: Amenity
}

const AmenityFormItem: FC<AmenityFormItemProps> = ({ form, field, data }) => {
	const { t } = useTranslation()
	const amenity = Form.useWatch(["amenities", field], form)

	return (
		<>
			<Form.Item
				style={{ marginBottom: 0 }}
				name={["amenities", field]}
				hidden={true}
			>
				<Input hidden={true} />
			</Form.Item>
			<Form.Item style={{ marginBottom: 0 }} valuePropName={"checked"}>
				<Checkbox
					checked={!!amenity}
					onChange={(e) => {
						if (e.target.checked) {
							form.setFieldValue(["amenities", field], data.id)
							return
						}
						form.setFieldValue(["amenities", field], undefined)
					}}
				>
					{t(data?.name)}
				</Checkbox>
			</Form.Item>
		</>
	)
}

export default memo(AmenityFormItem)
