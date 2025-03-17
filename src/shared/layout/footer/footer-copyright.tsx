import { Flex } from "antd"
import { type FC } from "react"
import { Text } from "src/shared/ui"

interface FooterCopyrightProps {
	noTitle?: boolean
}

const FooterCopyright: FC<FooterCopyrightProps> = ({ noTitle }) => {
	return (
		<Flex vertical={true}>
			{noTitle ? null : (
				<Text type={"secondary"} style={{ textAlign: "center" }}>
					Booking.uz — часть Booking Uzbekistan Inc., мирового лидера в сфере
					онлайн-туризма и сопутствующих услуг.
				</Text>
			)}
			<Text type={"secondary"} style={{ textAlign: "center" }}>
				Copyright © 1996–
				{new Date().getFullYear()} Booking.uz™. Все права защищены
			</Text>
		</Flex>
	)
}

export { FooterCopyright }
