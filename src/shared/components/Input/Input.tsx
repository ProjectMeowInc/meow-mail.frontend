import React, { FC, ReactNode } from "react"
import { IOnChangeEvent } from "../../events/IOnChangeEvent"
import { IInputError } from "./IInputError"
import DefaultInput from "./DefaultInput/DefaultInput"
import InputWithIcon from "./InputWithIcon/InputWithIcon"

interface IInputProps {
    icon?: ReactNode
    inputType?: 1 | 2
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

const Input: FC<IInputProps> = ({ placeholder, type, name, style, onChange, error, inputType, icon }) => {

    switch (inputType) {
        case 1: return (
            <DefaultInput
                name={name}
                placeholder={placeholder}
                type={type}
                style={style}
                onChange={onChange}
                error={error}
            />
        )

        case 2: return (
            <InputWithIcon
                name={name}
                placeholder={placeholder}
                type={type}
                style={style}
                onChange={onChange}
                error={error}
                icon={icon}
            />
        )

        default: return (
            <DefaultInput
                name={name}
                placeholder={placeholder}
                type={type}
                style={style}
                onChange={onChange}
                error={error}
            />
        )
    }
}

export default Input
