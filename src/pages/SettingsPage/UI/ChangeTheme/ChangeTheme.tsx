import React from "react"
import Switch from "../../../../shared/components/ Switch/Switch"
import { useChangeTheme } from "./useChangeTheme"
import classes from "./changeTheme.module.css"

const ChangeTheme = () => {
    const { ClickHandler, isDarkMode } = useChangeTheme()

    return (
        <div className={classes.wrapper}>
            <div className={classes.info}>
                <p className={classes.caption}>Включить темную тему</p>
                <p className={classes.description}>Включает темную тему на сайте</p>
            </div>

            <Switch isChecked={isDarkMode} onClick={ClickHandler} />
        </div>
    )
}

export default ChangeTheme
