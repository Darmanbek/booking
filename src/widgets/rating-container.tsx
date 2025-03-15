import { Badge } from "antd"
import type { RibbonProps } from "antd/es/badge/Ribbon"
import type { FC } from "react"

const RatingContainer: FC<RibbonProps> = ({ children, style, ...rest }) => {
	return (
		<Badge.Ribbon style={{ fontSize: 16, paddingBlock: 8, ...style }} {...rest}>
			{children}
		</Badge.Ribbon>
	)
}

export { RatingContainer }
