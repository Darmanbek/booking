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
		background-color: ${(token) => token.theme.colorBgContainer} !important; /* Зеленый фон */
		color: ${(token) => token.theme.colorText} !important; /* Белый цвет текста */
		border-radius: ${(token) => token.theme.borderRadius}px !important; /* Скругление */
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
		background-color: ${(token) => token.theme.colorBgContainer} !important; /* Темно-зеленый при наведении */
		filter: brightness(0.95);
	}
`
