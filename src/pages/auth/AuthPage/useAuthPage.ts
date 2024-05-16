import { FormEvent, useEffect, useState } from "react"
import {
    useAuthorizationV2Mutation,
    useCreateMailBoxMutation,
    useLazyGetInformationAboutUserQuery,
} from "../../../entities/Auth/api/AuthApi"
import { IOnChangeEvent } from "../../../shared/events/IOnChangeEvent"
import { AuthorizationDto } from "../../../entities/Auth/dto/AuthorizationDto"
import { AlertService } from "../../../shared/services/AlertService"
import { TokenService } from "../../../shared/services/TokenService"
import { cleanUpStore, useAppDispatch } from "../../../store"
import { useNavigate } from "react-router-dom"
import { setUser } from "../../../entities/Auth/redusers/userSlice"
import { isCorrectError } from "../../../shared/utils/hasData"
import { useFirstLoading } from "../../../shared/hooks/useFirstLoading"
import { AuthService } from "../../../shared/services/AuthService"

export const useAuthPage = () => {
    const [authorizationV2, { data, isLoading, error }] = useAuthorizationV2Mutation()
    const [requestData, setRequestData] = useState<AuthorizationDto>({})
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [createMailBox, { error: createMailBoxError }] = useCreateMailBoxMutation()
    const [code, setCode] = useState<string>("")
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [getInformation] = useLazyGetInformationAboutUserQuery()

    useFirstLoading(() => {
        // if we already try fast auth
        if (AuthService.isTryFastAuth()) {
            return
        }

        // set try auth status and try to fast auth
        AuthService.setTryFastAuth()
        navigate("/my?page=1&is_received=true")
    })

    useEffect(() => {
        if (isCorrectError(error)) {
            AlertService.error(error.data.message)
        }
    }, [error])

    // Здесь идёт проверка ошибки при создании ящика
    // Если приходит отличная ошибка отличная от типа MailBoxAlreadyExists,
    // то она будет выведена.
    useEffect(() => {
        if (isCorrectError(createMailBoxError)) {
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

        if (!requestData.login || !requestData.password) {
            return AlertService.error("Поля не могут быть пустыми")
        }

        TokenService.removeRefreshToken()
        TokenService.removeAccessToken()

        cleanUpStore()

        const result = await authorizationV2({
            login: requestData.login,
            password: requestData.password,
            type: "Base",
        })

        if (!result.data) {
            if (isCorrectError(result.error)) {
                return AlertService.error(result.error.data.message)
            }
        }

        if (data && data.type === "Success") {
            const { access_token, refresh_token } = data

            TokenService.setAccessToken(access_token)
            TokenService.setRefreshToken(refresh_token)

            await createMailBox()

            const getInformationResult = await getInformation()

            if (isCorrectError(getInformationResult.error)) {
                return AlertService.error(getInformationResult.error.data.message)
            }

            if (getInformationResult.data) {
                const { id, login, role } = TokenService.parseAccessToken(TokenService.getAccessToken() ?? "")
                const {
                    user: { contains_two_factor, contains_mailbox },
                    mailbox: { address },
                } = getInformationResult.data

                dispatch(
                    setUser({
                        id,
                        login,
                        role,
                        contains_mailbox,
                        contains_two_factor,
                        mailbox: address,
                    }),
                )
            }

            navigate("/my?page=1&is_received=true")
        } else {
            setIsSuccess(true)
        }
    }

    const SubmitCodeHandler = async (event: FormEvent) => {
        event.preventDefault()

        if (!data) {
            return
        }

        if (data.type === "RequireTwoFactor") {
            const result = await authorizationV2({
                code: code,
                request_id: data.request_id,
                type: "TwoFactor",
            })

            if (!result.data) {
                if (isCorrectError(result.error)) {
                    return AlertService.error(result.error.data.message)
                }

                return AlertService.error("Ошибка")
            }

            if (result.data.type === "Success") {
                const { access_token, refresh_token } = result.data

                TokenService.setAccessToken(access_token)
                TokenService.setRefreshToken(refresh_token)

                await createMailBox()

                const getInformationResult = await getInformation()

                if (isCorrectError(getInformationResult.error)) {
                    return AlertService.error(getInformationResult.error.data.message)
                }

                if (!getInformationResult.data) {
                    return AlertService.error("Ошибка")
                }

                const { id, login, role } = TokenService.parseAccessToken(TokenService.getAccessToken() ?? "")
                const {
                    user: { contains_two_factor, contains_mailbox },
                    mailbox: { address },
                } = getInformationResult.data

                dispatch(
                    setUser({
                        id,
                        login,
                        role,
                        contains_mailbox,
                        contains_two_factor,
                        mailbox: address,
                    }),
                )
            }

            navigate("/my?page=1&is_received=true")
        }
    }

    return {
        isLoading,
        ChangeHandler,
        SubmitHandler,
        setCode,
        isSuccess,
        SubmitCodeHandler,
    }
}
