import { Card, Skeleton } from "antd"
import { createStyles } from "antd-style"
import { type FC } from "react"

const useStyles = createStyles({
	skeleton: {
		height: "220px !important",
		width: "100% !important"
	}
})

const CityLoadingCard: FC = () => {
	const { styles } = useStyles()

	return (
		<>
			<Card
				styles={{
					body: {
						padding: 8
					}
				}}
				style={{ overflow: "hidden", cursor: "progress" }}
				cover={
					<Skeleton.Image
						active={true}
						rootClassName={styles.skeleton}
						className={styles.skeleton}
					/>
				}
			>
				<Skeleton
					paragraph={{
						rows: 1
					}}
					active={true}
				/>
			</Card>
		</>
	)
}

export { CityLoadingCard }
