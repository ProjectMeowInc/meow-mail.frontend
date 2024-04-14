import { IInputError } from "./IInputError"
import { ChangeEvent, useEffect, useState } from "react"
import { IOnChangeEvent } from "../../events/IOnChangeEvent"

export const useInput = (
    name: string,
    onChange?: (data: IOnChangeEvent, event?: ChangeEvent<HTMLInputElement>) => void,
    errors?: IInputError[],
) => {
    const [inputError, setInputError] = useState<IInputError | undefined>(undefined)

    const ChangeHandler = (data: IOnChangeEvent, event?: ChangeEvent<HTMLInputElement>) => {
        onChange?.call(null, data, event)
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
