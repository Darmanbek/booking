import { Typography as AntdTypography } from "antd"
import type { TypographyProps } from "antd/es/typography"
import type { LinkProps } from "antd/es/typography/Link"
import type { ParagraphProps } from "antd/es/typography/Paragraph"
import type { TextProps } from "antd/es/typography/Text"
import type { TitleProps } from "antd/es/typography/Title"
import { forwardRef } from "react"

const Title = forwardRef<HTMLHeadElement, TitleProps>((props, ref) => {
	return <AntdTypography.Title ref={ref} {...props} />
})
Title.displayName = "Title"

const Text = forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
	return <AntdTypography.Text ref={ref} {...props} />
})
Text.displayName = "Text"

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
	(props, ref) => {
		return <AntdTypography.Paragraph ref={ref} {...props} />
	}
)
Paragraph.displayName = "Paragraph"

const Link = forwardRef<HTMLElement, LinkProps>((props, ref) => {
	return <AntdTypography.Link ref={ref} {...props} />
})
Link.displayName = "Link"

const Typography = forwardRef<HTMLElement, TypographyProps>((props, ref) => {
	return <AntdTypography ref={ref} {...props} />
})
Typography.displayName = "Typography"

export {
	Title,
	type TitleProps,
	Text,
	type TextProps,
	Paragraph,
	type ParagraphProps,
	Link,
	type LinkProps,
	Typography,
	type TypographyProps
}
