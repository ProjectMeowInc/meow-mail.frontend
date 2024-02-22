import React, { FC, useState } from "react"
import classes from "./input.module.css"
import { IOnChangeEvent } from "../../events/IOnChangeEvent"
import { IInputError } from "./IInputError"

interface IInputProps {
    placeholder?: string
    name?: string
    type?: "email" | "text" | "password"
    onChange?: (data: IOnChangeEvent) => void
    error?: IInputError[]
    style?: {
        margin?: string
        width?: string
    }
}

const Input: FC<IInputProps> = ({placeholder, type, name, style, onChange}) => {

    const [error, setError] = useState<IInputError[] | null>(null)

    const ChangeHandler = (data: IOnChangeEvent) => {
       onChange?.call(null, data)
    }

    return (
        <>
            <input
                className={classes.input}
                placeholder={placeholder}
                type={type}
                name={name}
                onChange={(event) => ChangeHandler({
                    fieldName: event.target.name,
                    fieldValue: event.target.value
                })}
                style={{
                    width: style?.width,
                    margin: style?.margin
                }}
            />
            {error && <p>{error.filter(item => item.fieldName === name)[0].fieldName}</p>}
        </>
    )
}

export default Input