import { createStyles } from "antd-style"

export const useNavbarStyles = createStyles(({ css }) => ({
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
