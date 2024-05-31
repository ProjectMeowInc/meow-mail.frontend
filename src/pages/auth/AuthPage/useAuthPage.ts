import { FormEvent, useEffect, useState } from "react"
import {
    useAuthorizationV2Mutation,
    useCreateMailBoxMutation,
    useLazyGetInformationAboutUserQuery,
} from "../../../entities/Auth/api/AuthApi"
import { IOnChangeEvent } from "../../../shared/events/IOnChangeEvent"
import { AlertService } from "../../../shared/services/AlertService"
import { TokenService } from "../../../shared/services/TokenService"
import { cleanUpStore, useAppDispatch } from "../../../store"
import { useNavigate } from "react-router-dom"
import { setUser } from "../../../entities/Auth/redusers/userSlice"
import { isCorrectError } from "../../../shared/utils/hasData"
import { useFirstLoading } from "../../../shared/hooks/useFirstLoading"
import { AuthService } from "../../../shared/services/AuthService"

type AuthPageState =
    | {
          login: string
          password: string
          type: "Base"
      }
    | {
          type: "TwoFactor"
          code: string
          request_id: string
      }
    | {
          type: "Success"
      }

export const useAuthPage = () => {
    const [authorizationV2, { isLoading, error }] = useAuthorizationV2Mutation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [createMailBox, { error: createMailBoxError }] = useCreateMailBoxMutation()
    const [code, setCode] = useState<string>("")
    const [getInformation] = useLazyGetInformationAboutUserQuery()
    const [state, setState] = useState<AuthPageState>({
        type: "Base",
        login: "",
        password: "",
    })

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
        switch (state.type) {
            case "Base":
                setState((prevState) => ({
                    ...prevState,
                    [fieldName]: fieldValue,
                }))
                break

            case "TwoFactor": {
                setState((prevState) => ({
                    ...prevState,
                    [fieldName]: fieldValue,
                }))
            }
        }
    }

    const cleanUp = () => {
        TokenService.removeRefreshToken()
        TokenService.removeAccessToken()

        cleanUpStore()
    }

    const SubmitHandler = async (e: FormEvent) => {
        e.preventDefault()
        cleanUp()

        switch (state.type) {
            case "Base":
                const result = await authorizationV2(state)

                if (isCorrectError(result.error)) {
                    return AlertService.error(result.error.data.message)
                }

                if (!result.data) {
                    return
                }

                if (result.data.type === "Success") {
                    const { access_token, refresh_token } = result.data

                    TokenService.setAccessToken(access_token)
                    TokenService.setRefreshToken(refresh_token)

                    const getInformationResult = await getInformation()
                    const { id, login, role } = TokenService.parseAccessToken(access_token)

                    await createMailBox()

                    if (getInformationResult.data) {
                        const {
                            mailbox: { address },
                            user: { contains_mailbox, contains_two_factor },
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

                    setState({
                        type: "Success",
                    })

                    navigate("/my?page=1&is_received=true")
                }

                if (result.data.type === "RequireTwoFactor") {
                    setState({
                        type: "TwoFactor",
                        request_id: result.data.request_id,
                        code,
                    })
                }
                break

            case "TwoFactor":
                const twoFactorResult = await authorizationV2(state)

                if (isCorrectError(twoFactorResult.error)) {
                    return AlertService.error(twoFactorResult.error.data.message)
                }

                if (!twoFactorResult.data) {
                    return
                }

                if (twoFactorResult.data.type === "Success") {
                    const { access_token, refresh_token } = twoFactorResult.data

                    TokenService.setAccessToken(access_token)
                    TokenService.setRefreshToken(refresh_token)

                    const getInformationResult = await getInformation()
                    const { id, login, role } = TokenService.parseAccessToken(access_token)

                    await createMailBox()

                    if (getInformationResult.data) {
                        const {
                            mailbox: { address },
                            user: { contains_mailbox, contains_two_factor },
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

                    setState({
                        type: "Success",
                    })

                    navigate("/my?page=1&is_received=true")
                }

                break
        }
    }

    return {
        isLoading,
        ChangeHandler,
        SubmitHandler,
        setCode,
        state,
    }
}
