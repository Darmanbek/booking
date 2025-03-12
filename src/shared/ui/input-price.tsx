import { InputNumber, type InputNumberProps } from "antd"
import { forwardRef } from "react"
import { formatInputPrice } from "src/shared/utils/format.utils"

const InputPrice = forwardRef<HTMLInputElement, InputNumberProps>(
	({ style, ...rest }, ref) => {
		return (
			<InputNumber
				ref={ref}
				formatter={formatInputPrice}
				style={{ width: "100%", ...style }}
				{...rest}
			/>
		)
	}
)
InputPrice.displayName = "InputPrice"

export { InputPrice }
