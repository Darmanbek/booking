import { type FC } from "react"
import { Helmet } from "react-helmet-async"

interface SeoProps {
	title?: string
	description?: string
	canonical?: string
	image?: string
	schemaMarkup?: {
		"@context"?: string
		"@type"?: string
		name?: string
		url?: string
	} & Record<string, string>
}

const Seo: FC<SeoProps> = ({
	title: currentTitle,
	description,
	canonical,
	image,
	schemaMarkup
}) => {
	const title = currentTitle ? `${currentTitle} | NBooking` : "NBooking"

	return (
		<>
			<Helmet>
				<title>{title}</title>
				{description && <meta name={"description"} content={description} />}
				{canonical && (
					<link
						rel={"canonical"}
						href={`${import.meta.env.VITE_BASE_URL}${canonical}`}
					/>
				)}

				{/* Open Graph for Facebook, LinkedIn */}
				<meta property={"og:title"} content={title} />
				{description && (
					<meta property={"og:description"} content={description} />
				)}
				{image && <meta property={"og:image"} content={image} />}

				{/* Twitter Card */}
				<meta name={"twitter:title"} content={title} />
				{description && (
					<meta name={"twitter:description"} content={description} />
				)}
				{image && <meta name={"twitter:image"} content={image} />}

				{/* Structured Data (Schema Markup) */}
				{schemaMarkup && (
					<script type={"application/ld+json"}>
						{JSON.stringify(schemaMarkup)}
					</script>
				)}
			</Helmet>
		</>
	)
}

export { Seo }
