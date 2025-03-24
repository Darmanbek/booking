import { UserOutlined } from "@ant-design/icons"
import { type FormListFieldData, Select, type SelectProps, Space } from "antd"
import type { BaseSelectRef } from "rc-select"
import { forwardRef } from "react"
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
		return (
			<Select
				ref={ref}
				style={{
					minWidth: 300,
					minHeight: 50,
					...style
				}}
				value={"guests"}
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
					<GuestCountList fields={fields} add={add} remove={remove} />
				)}
				{...props}
			/>
		)
	}
)
SearchGuests.displayName = "SearchGuests"

export { SearchGuests }
