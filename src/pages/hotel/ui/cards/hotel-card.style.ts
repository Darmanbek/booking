import { createStyles } from "antd-style"

export const useHotelCardStyles = createStyles(({ css, token }) => ({
	carousel: css`
		.slick-slide {
			//width: 304px !important;
			//height: 300px;
			max-height: 300px;
			max-width: 302px;
			padding-left: 2px;
		}

		.slick-list {
			margin-left: -2px;
		}

		.slick-arrow:after {
			display: none;
		}

		.slick-arrow {
			width: ${token.controlHeightLG}px;
			height: ${token.controlHeightLG}px;
			background-color: ${token.colorBgContainer};
			opacity: 1;
			color: ${token.colorPrimary} !important;
			box-shadow: ${token.boxShadow};

			top: 100%;
			transform: translateY(-120%);

			&.slick-prev {
				inset-inline-start: auto;
				inset-inline-end: calc(${token.controlHeightLG}px + 16px);
			}

			&.slick-disabled {
				display: block;
				background-color: ${token.colorBgContainer};
				opacity: 0.5;
				pointer-events: all !important;
				cursor: default;
			}
		}
	`
}))
