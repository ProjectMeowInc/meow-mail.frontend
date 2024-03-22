import React, { FC } from "react"
import classes from "./defaultInput.module.css"
import { IOnChangeEvent } from "../../../events/IOnChangeEvent"
import { IInputError } from "../IInputError"
import { useInput } from "../useInput"

interface IDefaultInputProps {
    placeholder?: string
    name: string
    type?: "email" | "text" | "password"
    onChange?: (data: IOnChangeEvent) => void
    error?: IInputError[]
    style?: {
        margin?: string
        width?: string
    }
}

const DefaultInput: FC<IDefaultInputProps> = ({ placeholder, type, name, style, onChange, error }) => {
    const { inputError, ChangeHandler } = useInput(name, onChange, error)

    return (
        <>
            <input
                className={classes.input}
                placeholder={placeholder}
                type={type}
                name={name}
                onChange={(event) =>
                    ChangeHandler({
                        fieldName: event.target.name,
                        fieldValue: event.target.value,
                    })
                }
                style={{
                    width: style?.width,
                    margin: style?.margin,
                }}
            />
            {inputError && <p className={classes.error}>{inputError.fieldError}</p>}
        </>
    )
}

export default DefaultInput