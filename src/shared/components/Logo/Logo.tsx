import React, { FC } from "react"
import classes from "./logo.module.css"

interface ILogoProps {
    fontSize?: number
    color?: string
}

const Logo: FC<ILogoProps> = ({fontSize, color}) => {
    return (
        <h1
            style={{
            color,
            fontSize }}
            className={classes.logo}
        >
            MeowMail
        </h1>
    )
}

export default Logo