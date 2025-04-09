import { App } from "antd"

export const useModal = () => {
	const { modal } = App.useApp()

	return { modal }
}
