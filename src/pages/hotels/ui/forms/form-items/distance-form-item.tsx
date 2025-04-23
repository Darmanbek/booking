import { useNavigate } from "@tanstack/react-router"
import { Col, Form, type FormInstance, InputNumber, Row, Slider } from "antd"
import { type FC } from "react"
import type { FilterChange } from "src/pages/hotels/types"
import { useDebounceEffect, useTranslation } from "src/shared/hooks"
import { formatNumber } from "src/shared/utils"

interface DistanceFormItemProps {
	form: FormInstance<FilterChange>
	isLocal?: boolean
}

const DistanceFormItem: FC<DistanceFormItemProps> = ({ form, isLocal }) => {
	const distance = Form.useWatch("distance", form)
	const { t } = useTranslation()
	const navigate = useNavigate()

	useDebounceEffect(() => {
		if (isLocal) return
		navigate({
			to: ".",
			resetScroll: false,
			search: (prev) => ({
				...prev,
				distance: formatNumber(distance)
			})
		})
	}, [isLocal, navigate, distance])
	return (
		<>
			<Form.Item label={t("Расположение от центра города")}>
				<Row gutter={16}>
					<Col xs={24} sm={18}>
						<Form.Item name={"distance"} initialValue={30}>
							<Slider
								tooltip={{
									formatter: (value) => `${formatNumber(value)}км`
								}}
								min={1}
								max={30}
							/>
						</Form.Item>
					</Col>
					<Col xs={24} sm={6}>
						<Form.Item name={"distance"}>
							<InputNumber
								formatter={(value) => `${value}км`}
								min={1}
								max={30}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form.Item>
		</>
	)
}

export { DistanceFormItem }
