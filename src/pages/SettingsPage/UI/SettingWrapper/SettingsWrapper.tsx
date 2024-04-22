import React, { FC, PropsWithChildren } from "react"
import classes from "./settingWrapper.module.css"

interface ISettingsWrapperProps {
    caption: string
    flex?: boolean
}

const SettingsWrapper: FC<PropsWithChildren<ISettingsWrapperProps>> = ({ caption, children, flex }) => {
    return (
        <div className={classes.wrapper}>
            <p className={classes.caption}>{caption}</p>
            <div
                className={classes.children}
                style={
                    flex
                        ? {
                              display: "flex",
                          }
                        : {}
                }
            >
                {children}
            </div>
        </div>
    )
}

export default SettingsWrapper
