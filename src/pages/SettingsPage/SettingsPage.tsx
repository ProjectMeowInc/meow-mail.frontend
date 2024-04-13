import React from "react"
import SettingsWrapper from "./UI/SettingWrapper/SettingsWrapper"
import ChangePasswordForm from "./UI/ChangePasswordForm/ChangePasswordForm"
import ChangeTheme from "./UI/ChangeTheme/ChangeTheme"

const SettingsPage = () => {
    return (
        <div>
            <SettingsWrapper caption={"Настройка внешнего вида"}>
                <ChangeTheme />
            </SettingsWrapper>

            <SettingsWrapper caption={"Некий заголовок"}>
                <ChangePasswordForm />
            </SettingsWrapper>
        </div>
    )
}

export default SettingsPage
