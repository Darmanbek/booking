import { DatePicker } from "antd"
import type { RangePickerProps } from "antd/es/date-picker"
import dayjs from "dayjs"
import type { PickerRef } from "rc-picker"
import { forwardRef } from "react"

const SearchDates = forwardRef<PickerRef, RangePickerProps>(
	({ style, ...props }, ref) => {
		return (
			<DatePicker.RangePicker
				ref={ref}
				inputReadOnly={true}
				format={(value) => dayjs(value).format("dd, DD MMM")}
				style={{
					minWidth: 300,
					minHeight: 50,
					...style
				}}
				allowClear={false}
				size={"large"}
				{...props}
			/>
		)
	}
)
SearchDates.displayName = "SearchDates"

export { SearchDates }
