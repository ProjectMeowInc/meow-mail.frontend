import { FormEvent, useEffect, useState } from "react"
import { useAuthorizationMutation } from "../../../entities/Auth/api/AuthApi"
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

    useEffect(() => {
        if (error && "data" in error) {
            AlertService.error(error.data.message)
        }

        if (data) {
            const { access_token, refresh_token } = data
            TokenService.setAccessToken(access_token)
            TokenService.setRefreshToken(refresh_token)
            const {id, login} = TokenService.parseAccessToken(access_token)
            dispatch(setUser({
                id,
                login
            }))
            navigate("/my")
        }
    }, [error, data, isLoading])

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
