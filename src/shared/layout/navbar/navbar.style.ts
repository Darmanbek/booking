import { createStyles } from "antd-style"

export const useNavbarStyles = createStyles(({ css }) => ({
	navbarBg: css`
		position: absolute;
		inset: 0;
		z-index: 1;
		margin: 0 auto;
		max-width: 1440px;

		@media screen and (min-width: 1440px) {
			background:
				linear-gradient(90deg, #000 0, transparent 11.5%),
				linear-gradient(270deg, #000 0, transparent 11.5%);
		}
	`,
	tabBar: css`
		.ant-tabs-nav:before {
			border: 0;
		}

		.ant-tabs-nav-wrap {
			flex-grow: 0 !important;
		}

		.ant-tabs-extra-content {
			flex-grow: 1;
		}
	`
}))
