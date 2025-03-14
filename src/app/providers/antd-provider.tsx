import { ConfigProvider } from "antd"
import localeRU from "antd/locale/ru_RU"
import "dayjs/locale/ru"
import dayjs from "dayjs"
import { type FC, type PropsWithChildren } from "react"
import { useToken } from "src/shared/hooks"

dayjs.locale("ru")

const AntdProvider: FC<PropsWithChildren> = ({ children }) => {
	const { token } = useToken()
	return (
		<>
			<ConfigProvider
				locale={localeRU}
				theme={{
					token: {
						fontFamily: `Open Sans,${token.fontFamily}`
					},
					components: {
						Breadcrumb: {
							linkColor: token.colorLink,
							linkHoverColor: token.colorLinkHover
						}
					}
				}}
				typography={{
					style: {
						marginBottom: 0
					}
				}}
			>
				{children}
			</ConfigProvider>
		</>
	)
}

export { AntdProvider }
