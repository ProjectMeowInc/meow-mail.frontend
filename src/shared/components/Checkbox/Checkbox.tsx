import React, { FC } from "react"
import classes from "./checkbox.module.css"
import "./checkbox.module.css"

interface ICheckboxProps {
    label?: string
}

const Checkbox: FC<ICheckboxProps> = ({label}) => {
    return (
        <label className={classes.label}>
            <input className={classes.checkbox} type={"checkbox"} required/>
            {label}
        </label>
    )
}

export default Checkbox