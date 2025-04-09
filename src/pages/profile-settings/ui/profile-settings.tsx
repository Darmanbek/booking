import { Card, Divider } from "antd"
import { type FC } from "react"
import { ProfileForm, ProfilePhoneForm } from "./forms"

const ProfileSettings: FC = () => {
	return (
		<>
			<Card title={"Настройки профиля"}>
				<ProfileForm />
				<Divider />
				<ProfilePhoneForm />
			</Card>
		</>
	)
}

export { ProfileSettings }
