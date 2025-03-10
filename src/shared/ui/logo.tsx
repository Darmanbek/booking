import { Flex } from "antd"
import { type FC } from "react"
import { Title, type TitleProps } from "./typography"

interface LogoProps {
	titleProps?: TitleProps
}

const Logo: FC<LogoProps> = ({ titleProps }) => {
	return (
		<Flex>
			<Title level={3} {...titleProps}>
				Booking.uz
			</Title>
		</Flex>
	)
}

export { Logo }
