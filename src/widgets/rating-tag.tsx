import { Tag, type TagProps } from "antd"
import { type FC } from "react"
import { useToken } from "src/shared/hooks"

const RatingTag: FC<TagProps> = ({ children, style, ...rest }) => {
	const { token } = useToken()
	return (
		<>
			<Tag
				color={token.colorPrimary}
				style={{ fontSize: 16, paddingBlock: 6, ...style }}
				{...rest}
			>
				{children}
			</Tag>
		</>
	)
}

export { RatingTag }
