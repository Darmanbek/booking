import { createStyles } from "antd-style"

export const useHotelStyles = createStyles(({ css, token }) => ({
	carousel: css`
		.slick-arrow {
			background-color: ${token.colorBgContainer};
			opacity: 1;
			color: ${token.colorText};
			border-radius: 999px;
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
	`,
	item: css`
		display: flex !important;
		justify-content: center;
	`
}))
