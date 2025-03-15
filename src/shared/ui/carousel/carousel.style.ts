import { createStyles } from "antd-style"

export const useCarouselStyles = createStyles(({ css, token }) => ({
	button: css`
		&.slick-arrow {
			background-color: ${token.colorBgContainer};
			opacity: 1;
			color: ${token.colorText};
			height: 36px;
			width: 36px;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: ${token.boxShadow};

			&:after {
				display: none;
			}
		}
	`
}))
