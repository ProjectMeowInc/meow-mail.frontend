import React, { FC } from "react"
import classes from "./switch.module.css"
import { useSwitch } from "./useSwitch"

interface ISwitchProps {
    isChecked?: boolean
    onClick?: () => void
}

const Switch: FC<ISwitchProps> = ({ isChecked, onClick }) => {
    const { isActive } = useSwitch(isChecked)

    return (
        <div className={isActive ? classes.switch_active : classes.switch} onClick={onClick}>
            <div className={isActive ? classes.circle_active : classes.circle}></div>
        </div>
    )
}

export default Switch
