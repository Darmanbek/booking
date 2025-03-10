import { createStyles } from "antd-style"

export const useCounterStyles = createStyles(({ css }) => ({
	input: css`
		max-width: 60px;
		text-align: center;

		&:focus-within,
		&:hover {
			z-index: 3;
		}
	`
}))
