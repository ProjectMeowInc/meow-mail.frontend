import { FormEvent, useEffect, useState } from "react"
import { useAuthorizationMutation, useCreateMailBoxMutation } from "../../../entities/Auth/api/AuthApi"
import { IOnChangeEvent } from "../../../shared/events/IOnChangeEvent"
import { AuthorizationDto } from "../../../entities/Auth/dto/AuthorizationDto"
import { AlertService } from "../../../shared/services/AlertService"
import { TokenService } from "../../../shared/services/TokenService"
import { useAppDispatch } from "../../../store"
import { useNavigate } from "react-router-dom"
import { setUser } from "../../../entities/Auth/redusers/userSlice"

export const useAuthPage = () => {
    const [authorization, { data, error, isLoading }] = useAuthorizationMutation()
    const [requestData, setRequestData] = useState<AuthorizationDto>({})
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [createMailBox, {error: createMailBoxError}] = useCreateMailBoxMutation()

    useEffect(() => {
        if (data) {
            const { access_token, refresh_token } = data

            TokenService.setAccessToken(access_token)
            TokenService.setRefreshToken(refresh_token)

            const {id, login} = TokenService.parseAccessToken(access_token)

            dispatch(setUser({
                id,
                login
            }))

            createMailBox().then()

            navigate("/my?page=1")
        }
    }, [data, isLoading])

    useEffect(() => {
        if (error && "data" in error) {
            AlertService.error(error.data.message)
        }
    }, [error])

    // Здесь идёт проверка ошибки при создании ящика
    // Если приходит отличная ошибка отличная от типа MailBoxAlreadyExists,
    // то она будет выведена.
    useEffect(() => {
        if (createMailBoxError && "data" in createMailBoxError) {
            if (createMailBoxError.data.error_type.split(".")[1] !== "MailBoxAlreadyExists") {
                return AlertService.error(createMailBoxError.data.message)
            }
        }
    }, [createMailBoxError])

    const ChangeHandler = ({ fieldName, fieldValue }: IOnChangeEvent) => {
        setRequestData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue,
        }))
    }

    const SubmitHandler = async (e: FormEvent) => {
        e.preventDefault()

        if (!requestData) {
            return AlertService.error("Поля не могут быть пустыми")
        }

        if (requestData.login && requestData.password) {
            await authorization({
                login: requestData.login,
                password: requestData.password,
            })
        }
    }

    return {
        ChangeHandler,
        SubmitHandler,
        isLoading,
    }
}
