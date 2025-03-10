import type { ComponentProps, FC } from "react"

const Container: FC<ComponentProps<"div">> = ({ children, style, ...rest }) => {
	return (
		<>
			<div
				style={{
					maxWidth: 1280,
					margin: "0 auto",
					height: "100%",
					padding: "0 20px",
					...style
				}}
				{...rest}
			>
				{children}
			</div>
		</>
	)
}

export { Container }
