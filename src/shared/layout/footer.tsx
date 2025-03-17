import { useLocation } from "@tanstack/react-router"
import { Divider, Flex, Layout } from "antd"
import { type FC } from "react"
import { FooterContent } from "src/shared/layout/footer/footer-content"
import { FooterCopyright } from "src/shared/layout/footer/footer-copyright"
import { FooterHeader } from "src/shared/layout/footer/footer-header"
import { FooterPayments } from "src/shared/layout/footer/footer-payments"
import { Container } from "src/shared/ui"

const Footer: FC = () => {
	const { pathname } = useLocation()

	const isAuthPage = ["/login", "/register"].includes(pathname)

	return (
		<>
			<Layout.Footer>
				<Container>
					<Flex vertical={true}>
						{isAuthPage ? null : (
							<>
								<Divider />
								<FooterHeader />
								<Divider />
								<FooterContent />
								<Divider />
								<FooterPayments />
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
