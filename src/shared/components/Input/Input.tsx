import React, { FC } from "react"
import classes from "./input.module.css"

interface IInputProps {
    placeholder?: string
    name?: string
    type?: "email" | "text" | "password"
    style?: {
        margin?: string
        width?: string
    }
}

const Input: FC<IInputProps> = ({placeholder, type, name, style}) => {
    return (
        <input
            className={classes.input}
            placeholder={placeholder}
            type={type}
            name={name}
            style={{
                width: style?.width,
                margin: style?.margin
            }}
        />
    )
}

export default Input