import { RightOutlined } from "@ant-design/icons"
import { Button, type ButtonProps } from "antd"
import { type FC } from "react"
import { useCarouselStyles } from "./carousel.style"

interface CarouselNextButtonProps extends ButtonProps {
	currentSlide?: number
	slideCount?: number
}

const CarouselNextButton: FC<CarouselNextButtonProps> = ({
	currentSlide,
	slideCount,
	className,
	...rest
}) => {
	const { styles, cx } = useCarouselStyles()
	return (
		<>
			<Button
				title={`${currentSlide} / ${slideCount}`}
				shape={"circle"}
				icon={<RightOutlined />}
				className={cx(styles.button, className)}
				{...rest}
			/>
		</>
	)
}

export { CarouselNextButton }
