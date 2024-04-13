import React, { FC, PropsWithChildren } from "react"
import classes from "./settingWrapper.module.css"

interface ISettingsWrapperProps {
    caption: string
}

const SettingsWrapper: FC<PropsWithChildren<ISettingsWrapperProps>> = ({ caption, children }) => {
    return (
        <div className={classes.wrapper}>
            <p className={classes.caption}>{caption}</p>
            <div>{children}</div>
        </div>
    )
}

export default SettingsWrapper
