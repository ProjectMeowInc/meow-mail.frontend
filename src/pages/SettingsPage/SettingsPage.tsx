import React from "react"
import SettingsWrapper from "./UI/SettingWrapper/SettingsWrapper"
import ChangePasswordForm from "./UI/ChangePasswordForm/ChangePasswordForm"
import ChangeTheme from "./UI/ChangeTheme/ChangeTheme"
import AddTwoFactor from "./UI/AddTwoFactor/AddTwoFactor"

const SettingsPage = () => {
    return (
        <div>
            <SettingsWrapper caption={"Настройка внешнего вида"}>
                <ChangeTheme />
            </SettingsWrapper>

            <SettingsWrapper caption={"Настройки аккаунта"} flex={true}>
                <ChangePasswordForm />
                <AddTwoFactor />
            </SettingsWrapper>
        </div>
    )
}

export default SettingsPage
