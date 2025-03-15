import { LeftOutlined } from "@ant-design/icons"
import { Button, type ButtonProps } from "antd"
import { type FC } from "react"
import { useCarouselStyles } from "./carousel.style"

interface CarouselPrevButtonProps extends ButtonProps {
	currentSlide?: number
	slideCount?: number
}

const CarouselPrevButton: FC<CarouselPrevButtonProps> = ({
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
				icon={<LeftOutlined />}
				className={cx(styles.button, className)}
				{...rest}
			/>
		</>
	)
}

export { CarouselPrevButton }
