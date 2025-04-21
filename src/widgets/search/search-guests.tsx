import { UserOutlined } from "@ant-design/icons"
import { type FormListFieldData, Select, type SelectProps, Space } from "antd"
import { useResponsive } from "antd-style"
import type { BaseSelectRef } from "rc-select"
import { forwardRef, useState } from "react"
import { Text } from "src/shared/ui"
import { GuestCountList } from "./guest-count/guest-count-list"

interface SearchGuestsProps extends SelectProps {
	fields: FormListFieldData[]
	guests?: number[]
	add: () => void
	remove: (index: number) => void
}

const SearchGuests = forwardRef<BaseSelectRef, SearchGuestsProps>(
	({ fields, guests, add, remove, style, ...props }, ref) => {
		const [open, setOpen] = useState(false)
		const { sm = true } = useResponsive()
		return (
			<Select
				ref={ref}
				style={{
					minWidth: sm ? 300 : "100%",
					minHeight: 50,
					...style
				}}
				value={"guests"}
				open={open}
				onDropdownVisibleChange={setOpen}
				options={[
					{
						value: "guests",
						label: (
							<Space split={"/"}>
								<Text>
									Гостей:{" "}
									{guests?.reduce(
										(total, guest) => total + (Number(guest) || 0),
										0
									)}
								</Text>
								<Text>Номеров: {guests?.length}</Text>
							</Space>
						)
					}
				]}
				placement={"bottomLeft"}
				popupMatchSelectWidth={false}
				prefix={<UserOutlined />}
				size={"large"}
				dropdownRender={() => (
					<GuestCountList
						fields={fields}
						add={add}
						remove={remove}
						onClose={() => setOpen(false)}
					/>
				)}
				{...props}
			/>
		)
	}
)
SearchGuests.displayName = "SearchGuests"

export { SearchGuests }
