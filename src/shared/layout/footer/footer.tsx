import { useLocation } from "@tanstack/react-router"
import { Divider, Flex, Layout } from "antd"
import { type FC } from "react"
import { Container } from "src/shared/ui"
import { FooterContent } from "./footer-content"
import { FooterCopyright } from "./footer-copyright"
import { FooterHeader } from "./footer-header"

const Footer: FC = () => {
	const { pathname } = useLocation()

	const isAuthPage = ["/login", "/register"].includes(pathname)

	return (
		<>
			<Layout.Footer
				style={{
					paddingInline: 24
				}}
			>
				<Container>
					<Flex vertical={true}>
						{isAuthPage ? null : (
							<>
								<Divider />
								<FooterHeader />
								<Divider />
								<FooterContent />
								<Divider />
							</>
						)}
						<FooterCopyright noTitle={isAuthPage} />
					</Flex>
				</Container>
			</Layout.Footer>
		</>
	)
}

export { Footer }
