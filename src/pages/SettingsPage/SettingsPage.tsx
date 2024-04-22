import React from "react"
import SettingsWrapper from "./UI/SettingWrapper/SettingsWrapper"
import ChangePasswordForm from "./UI/ChangePasswordForm/ChangePasswordForm"
import ChangeTheme from "./UI/ChangeTheme/ChangeTheme"
import AddToFactor from "./UI/AddTwoFactor/AddToFactor"

const SettingsPage = () => {
    return (
        <div>
            <SettingsWrapper caption={"Настройка внешнего вида"}>
                <ChangeTheme />
            </SettingsWrapper>

            <SettingsWrapper caption={"Настройки аккаунта"} flex={true}>
                <ChangePasswordForm />
                <AddToFactor />
            </SettingsWrapper>
        </div>
    )
}

export default SettingsPage
