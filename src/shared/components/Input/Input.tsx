import React, { FC, useState } from "react"
import classes from "./input.module.css"
import { IOnChangeError, IOnChangeEvent } from "../../events/IOnChangeEvent"

interface IInputProps {
    placeholder?: string
    name?: string
    type?: "email" | "text" | "password"
    onChange?: (data: IOnChangeEvent) => void | IOnChangeError[]
    style?: {
        margin?: string
        width?: string
    }
}

const Input: FC<IInputProps> = ({placeholder, type, name, style, onChange}) => {

    const [error, setError] = useState<IOnChangeError[] | void>(undefined)

    const ChangeHandler = (data: IOnChangeEvent) => {
        setError(onChange?.call(null, data))
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