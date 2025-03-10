import { MinusOutlined, PlusOutlined } from "@ant-design/icons"
import {
	Button,
	ConfigProvider,
	InputNumber,
	type InputNumberProps,
	Space
} from "antd"
import { forwardRef, useState } from "react"
import { useCounterStyles } from "./counter.style"

const Counter = forwardRef<HTMLInputElement, InputNumberProps>(
	({ value, className, ...rest }, ref) => {
		const [currentValue, setCurrentValue] = useState(Number(value) || 1)
		const { styles, cx } = useCounterStyles()

		return (
			<ConfigProvider
				wave={{
					disabled: true
				}}
			>
				<Space.Compact>
					<Button
						icon={<MinusOutlined />}
						disabled={currentValue < 2}
						onClick={() => setCurrentValue((prev) => prev - 1)}
					/>
					<InputNumber
						controls={false}
						defaultValue={1}
						onChange={(value) => setCurrentValue(Number(value) || 1)}
						className={cx(styles.input, className)}
						value={currentValue}
						ref={ref}
						{...rest}
					/>
					<Button
						icon={<PlusOutlined />}
						onClick={() => setCurrentValue((prev) => prev + 1)}
					/>
				</Space.Compact>
			</ConfigProvider>
		)
	}
)
Counter.displayName = "Counter"

export { Counter }
