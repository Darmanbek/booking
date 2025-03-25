import { MinusOutlined, PlusOutlined } from "@ant-design/icons"
import {
	Button,
	ConfigProvider,
	InputNumber,
	type InputNumberProps,
	Space
} from "antd"
import { forwardRef, useEffect, useState } from "react"
import { useCounterStyles } from "./counter.style"

const Counter = forwardRef<HTMLInputElement, InputNumberProps>(
	({ value, onChange, className, min = 1, max, ...rest }, ref) => {
		const minLength = Number(min)

		const [currentValue, setCurrentValue] = useState(Number(value) || minLength)
		const { styles, cx } = useCounterStyles()

		useEffect(() => {
			onChange?.(currentValue)
		}, [currentValue, onChange])
		return (
			<ConfigProvider
				wave={{
					disabled: true
				}}
			>
				<Space.Compact>
					<Button
						icon={<MinusOutlined />}
						onClick={() => {
							if (currentValue < minLength + 1) return
							setCurrentValue((prev) => prev - 1)
						}}
					/>
					<InputNumber
						controls={false}
						defaultValue={1}
						onChange={(value) => setCurrentValue(Number(value) || minLength)}
						className={cx(styles.input, className)}
						value={currentValue}
						ref={ref}
						{...rest}
					/>
					<Button
						icon={<PlusOutlined />}
						onClick={() =>
							setCurrentValue((prev) =>
								max && prev >= Number(max) ? prev : prev + 1
							)
						}
					/>
				</Space.Compact>
			</ConfigProvider>
		)
	}
)
Counter.displayName = "Counter"

export { Counter }
