import { Tag, type TagProps } from "antd"
import { type FC } from "react"

const RatingTag: FC<TagProps> = ({ children, style, ...rest }) => {
	return (
		<>
			<Tag
				color={"blue-inverse"}
				style={{ fontSize: 16, paddingBlock: 6, ...style }}
				{...rest}
			>
				{children}
			</Tag>
		</>
	)
}

export { RatingTag }
