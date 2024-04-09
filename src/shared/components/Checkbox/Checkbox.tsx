import React, { FC, ReactNode } from "react"
import classes from "./checkbox.module.css"
import "./checkbox.module.css"

interface ICheckboxProps {
    label?: ReactNode
}

const Checkbox: FC<ICheckboxProps> = ({label}) => {
    return (
        <label className={classes.label}>
            <input className={classes.checkbox} type={"checkbox"} required/>
            <p className={classes.label_content}>{label ?? ""}</p>
        </label>
    )
}

export default Checkbox