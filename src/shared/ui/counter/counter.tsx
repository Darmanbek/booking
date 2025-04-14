import { MinusOutlined, PlusOutlined } from "@ant-design/icons"
import {
	Button,
	type ButtonProps,
	ConfigProvider,
	InputNumber,
	type InputNumberProps as AntdInputNumberProps,
	Space
} from "antd"
import type { SpaceCompactProps } from "antd/es/space/Compact"
import { forwardRef, useEffect, useState } from "react"
import { useCounterStyles } from "./counter.style"

interface InputNumberProps extends AntdInputNumberProps {
	buttonProps?: {
		decrement?: ButtonProps
		increment?: ButtonProps
	}
	spaceProps?: SpaceCompactProps
}

const Counter = forwardRef<HTMLInputElement, InputNumberProps>(
	(
		{
			value,
			onChange,
			className,
			min = 1,
			max,
			buttonProps,
			spaceProps,
			...rest
		},
		ref
	) => {
		const minLength = Number(min)

		const [currentValue, setCurrentValue] = useState(Number(value) || minLength)
		const { styles, cx } = useCounterStyles()
		
		const decrement = () => {
			if (currentValue < minLength + 1) return
			setCurrentValue((prev) => prev - 1)
		}
		
		const increment = () => {
			setCurrentValue((prev) =>
				max && prev >= Number(max) ? prev : prev + 1
			)
		}

		useEffect(() => {
			onChange?.(currentValue)
		}, [currentValue, onChange])
		return (
			<ConfigProvider
				wave={{
					disabled: true
				}}
			>
				<Space.Compact {...spaceProps}>
					<Button
						icon={<MinusOutlined />}
						onClick={decrement}
						{...buttonProps?.decrement}
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
						onClick={increment}
						{...buttonProps?.increment}
					/>
				</Space.Compact>
			</ConfigProvider>
		)
	}
)
Counter.displayName = "Counter"

export { Counter }
