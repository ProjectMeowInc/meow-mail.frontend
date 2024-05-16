import { useChangePasswordMutation, useGet2FATokenMutation } from "../../../../entities/Auth/api/AuthApi"
import { FormEvent, useEffect, useState } from "react"
import { AlertService } from "../../../../shared/services/AlertService"
import { IOnChangeEvent } from "../../../../shared/events/IOnChangeEvent"
import { isCorrectError } from "../../../../shared/utils/hasData"
import { TokenService } from "../../../../shared/services/TokenService"

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

    const [get2FAToken] = useGet2FATokenMutation()
    const [changePassword, { error, isSuccess }] = useChangePasswordMutation()

    const [verifyCode, setVerifyCode] = useState<string>("")
    const [need2FA, setNeed2FA] = useState<boolean>(false)

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

        const result = await get2FAToken({
            type: "RequestCode",
        })

        if (!result.data) {
            if (isCorrectError(result.error)) {
                return AlertService.error(result.error.data.message)
            }

            return AlertService.error("Ошибка")
        }

        if (result.data.type === "Success") {
            const { token } = result.data

            TokenService.set2FAToken(token)

            await changePassword({
                old_password: formData.old_password,
                new_password: formData.new_password,
            })
            return
        } else {
            setNeed2FA(true)
        }
    }

    const Submit2FAHandler = async (event: FormEvent) => {
        event.preventDefault()

        const result = await get2FAToken({
            type: "SendVerifyCode",
            code: verifyCode,
        })

        if (!result.data) {
            if (isCorrectError(result.error)) {
                return AlertService.error(result.error.data.message)
            }

            return AlertService.error("Ошибка")
        }

        if (result.data.type === "Success") {
            const { token } = result.data

            TokenService.set2FAToken(token)

            await changePassword({
                old_password: formData.old_password,
                new_password: formData.new_password,
            })

            setNeed2FA(false)
        }
    }

    return {
        ChangeHandler,
        SubmitHandler,
        Submit2FAHandler,
        setVerifyCode,
        need2FA,
    }
}
