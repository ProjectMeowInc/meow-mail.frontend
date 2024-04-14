import { IInputError } from "./IInputError"
import { useEffect, useState } from "react"
import { IOnChangeEvent } from "../../events/IOnChangeEvent"

export const useInput = (name: string, onChange?: (data: IOnChangeEvent) => void, errors?: IInputError[]) => {
    const [inputError, setInputError] = useState<IInputError | undefined>(undefined)

    const ChangeHandler = (data: IOnChangeEvent) => {
        onChange?.call(null, data)
    }

    useEffect(() => {
        if (name) {
            setInputError(errors?.filter((item) => item.fieldName === name)[0])
        }
    }, [errors])

    return {
        inputError,
        ChangeHandler,
    }
}
