import { DatePicker } from "antd"
import type { RangePickerProps } from "antd/es/date-picker"
import localeRU from "antd/es/date-picker/locale/ru_RU"
import dayjs from "dayjs"
import type { PickerRef } from "rc-picker"
import { forwardRef } from "react"

dayjs.locale("ru")

const SearchDates = forwardRef<PickerRef, RangePickerProps>(
	({ style, ...props }, ref) => {
		return (
			<DatePicker.RangePicker
				ref={ref}
				locale={localeRU}
				inputReadOnly={true}
				format={"dd, DD MMM"}
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
