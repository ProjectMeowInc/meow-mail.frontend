import { useRegistrationMutation } from "../../../entities/Auth/api/AuthApi"
import { FormEvent, useEffect, useState } from "react"
import { RegistrationDto } from "../../../entities/Auth/dto/RegistrationDto"
import { IOnChangeEvent } from "../../../shared/events/IOnChangeEvent"
import { AlertService } from "../../../shared/services/AlertService"
import { IInputError } from "../../../shared/components/Input/IInputError"
import { IBaseErrorResponse } from "../../../shared/models/IBaseErrorResponse"
import { IValidationErrorResponse } from "../../../shared/models/IValidationErrorResponse"
import { SerializedError } from "@reduxjs/toolkit"
import { hasDataInError } from "../../../shared/utils/hasData"

export const useRegistrationPage = () => {
    const [registration, { isLoading, error }] = useRegistrationMutation()
    const [requestData, setRequestData] = useState<RegistrationDto>({})
    const [inputErrors, setInputErrors] = useState<IInputError[] | undefined>(undefined)

    const IsValidationError = (
        error: IBaseErrorResponse | IValidationErrorResponse | SerializedError | undefined,
    ): error is IValidationErrorResponse => {
        if (hasDataInError(error) && "errors" in error.data) {
            return true
        }

        return false
    }

    useEffect(() => {
        if (IsValidationError(error)) {
            setInputErrors(
                error.data.errors.map((item) => ({
                    fieldName: item.field,
                    fieldError: item.message,
                })),
            )
        }
    }, [error])

    const SubmitHandler = async (event: FormEvent) => {
        event.preventDefault()

        if (!requestData) {
            return AlertService.error("Поля не может быть пустыми")
        }

        if (requestData.login && requestData.password) {
            await registration({
                login: requestData.login,
                password: requestData.password,
            })
        }
    }

    const ChangeHandler = ({ fieldName, fieldValue }: IOnChangeEvent) => {
        setRequestData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue,
        }))
    }

    return {
        isLoading,
        SubmitHandler,
        ChangeHandler,
        inputErrors,
    }
}
