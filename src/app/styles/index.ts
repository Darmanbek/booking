import { createGlobalStyle } from "antd-style"

export const GlobalStyles = createGlobalStyle`
	html {
		scrollbar-color: ${(token) => token.theme.colorBorder} transparent;
	}

	.leaflet-control-zoom {
		border: 0 !important;
	}

	.leaflet-control-zoom-in,
	.leaflet-control-zoom-out {
		background-color: ${(token) => token.theme.colorBgContainer} !important;
		color: ${(token) => token.theme.colorText} !important;
		border-radius: ${(token) => token.theme.borderRadius}px !important;
		width: ${(token) => token.theme.controlHeight}px;
		height: ${(token) => token.theme.controlHeight}px;
		font-size: ${(token) => token.theme.fontSize}px;
	}

	.leaflet-control-zoom-out {
		border-top-left-radius: 0 !important;
		border-top-right-radius: 0 !important;
	}

	.leaflet-control-zoom-in {
		border-bottom-left-radius: 0 !important;
		border-bottom-right-radius: 0 !important;
	}

	.leaflet-control-zoom-in:hover,
	.leaflet-control-zoom-out:hover {
		background-color: ${(token) => token.theme.colorBgContainer} !important;
		filter: brightness(0.95);
	}
`
