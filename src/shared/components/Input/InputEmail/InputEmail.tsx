import React, { FC } from "react"
import classes from "./inputEmail.module.css"
import { IOnChangeEvent } from "../../../events/IOnChangeEvent"
import { IInputError } from "../IInputError"
import { useInput } from "../useInput"

interface IInputEmailProps {
    placeholder?: string
    name: string
    type?: "email" | "text" | "password"
    onChange?: (data: IOnChangeEvent) => void
    error?: IInputError[]
    style?: {
        margin?: string
        width?: string
    }
    fieldName?: string
}

const InputEmail: FC<IInputEmailProps> = ({ placeholder, type, name, style, onChange, error, fieldName }) => {
    const { inputError, ChangeHandler } = useInput(name, onChange, error)

    return (
        <>
            <div className={classes.input_wrapper}>
                <p>{fieldName}</p>
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
            </div>
            {inputError && <p className={classes.error}>{inputError.fieldError}</p>}
        </>
    )
}

export default InputEmail
