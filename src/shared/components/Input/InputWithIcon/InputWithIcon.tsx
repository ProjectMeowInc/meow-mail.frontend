import React, { FC, ReactNode } from "react"
import classes from "./inputWithIcon.module.css"
import { IOnChangeEvent } from "../../../events/IOnChangeEvent"
import { IInputError } from "../IInputError"
import { useInput } from "../useInput"

interface IInputWithIcon {
    icon?: ReactNode
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

const InputWithIcon: FC<IInputWithIcon> = ({ placeholder, type, name, style, onChange, error, icon }) => {
    const { inputError, ChangeHandler } = useInput(name, onChange, error)

    return (
        <div className={classes.input_wrapper}
             style={{
                 width: style?.width,
                 margin: style?.margin,
             }}
        >
            <div>
                {icon}
            </div>
            <input
                placeholder={placeholder}
                type={type}
                name={name}
                className={classes.input}
                onChange={(event) =>
                    ChangeHandler({
                        fieldName: event.target.name,
                        fieldValue: event.target.value,
                    })
                }
            />
            {inputError && <p className={classes.error}>{inputError.fieldError}</p>}
        </div>
    )
}

export default InputWithIcon