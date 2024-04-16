import { useChangePasswordMutation } from "../../../../entities/Auth/api/AuthApi"
import { FormEvent, useEffect, useState } from "react"
import { AlertService } from "../../../../shared/services/AlertService"
import { IOnChangeEvent } from "../../../../shared/events/IOnChangeEvent"
import { LogService } from "../../../../shared/services/LogService"
import { isCorrectError } from "../../../../shared/utils/hasData"

interface IFormData {
    old_password: string
    new_password: string
    confirm_password: string
}

export const useChangePasswordForm = () => {
    const [formData, setFormData] = useState<IFormData>({
        new_password: "",
        confirm_password: "",
        old_password: "",
    })
    const [changePassword, { error, isSuccess }] = useChangePasswordMutation()

    useEffect(() => {
        if (isSuccess) {
            return AlertService.success("Пароль изменён успешно")
        }
    }, [isSuccess])

    useEffect(() => {
        if (isCorrectError(error)) {
            return AlertService.error(error.data.message)
        }
    }, [error])

    const ChangeHandler = ({ fieldValue, fieldName }: IOnChangeEvent) => {
        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue,
        }))
    }

    const SubmitHandler = async (event: FormEvent) => {
        event.preventDefault()

        if (formData.new_password !== formData.confirm_password) {
            return AlertService.error("Пароли не совпадают")
        }

        await changePassword({
            old_password: formData.old_password,
            new_password: formData.new_password,
        })
    }

    return {
        ChangeHandler,
        SubmitHandler,
    }
}
