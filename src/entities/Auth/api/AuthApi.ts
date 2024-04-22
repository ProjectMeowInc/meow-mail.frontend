import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_API_URL } from "../../../consts"
import { IRegistrationRequest } from "../models/requests/IRegistrationRequest"
import { IBaseErrorResponse } from "../../../shared/models/IBaseErrorResponse"
import { IValidationErrorResponse } from "../../../shared/models/IValidationErrorResponse"
import { TokenService } from "../../../shared/services/TokenService"
import { AlertService } from "../../../shared/services/AlertService"
import { IUpdateAuthorizationResponse } from "../models/responses/IUpdateAuthorizationResponse"
import { RedirectService } from "../../../shared/services/RedirectService"
import { query } from "../../../shared/utils/query"
import { IChangePasswordRequest } from "../models/requests/IChangePasswordRequest"
import { AuthorizationResponseV2Type } from "../models/responses/AuthorizationResponseV2Type"
import { AuthorizationRequestV2Type } from "../models/requests/AuthorizationRequestV2Type"
import { IConnectTelegramResponse } from "../models/responses/IConnectTelegramResponse"

const baseQuery = fetchBaseQuery({ baseUrl: BASE_API_URL }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    IBaseErrorResponse | IValidationErrorResponse
>

export const fetchBaseQueryWithReAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    IBaseErrorResponse | IValidationErrorResponse
> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions)

    if (!result.error || result.error.status !== 401) {
        return result
    }

    const refreshToken = TokenService.getRefreshToken()

    if (!refreshToken) {
        RedirectService.redirect("/")
        AlertService.error("Ошибка авторизации. Пожалуйста авторизуйтесь заново")
    }

    const accessToken = TokenService.getAccessToken()

    if (accessToken && TokenService.isValidAccessToken(accessToken)) {
        return baseQuery(
            {
                ...(args as FetchArgs),
                headers: {
                    Authorization: accessToken,
                },
            },
            api,
            extraOptions,
        )
    }

    const updateAuth = await baseQuery(
        {
            url: BASE_API_URL + "v1/auth/update-auth",
            method: "POST",
            body: {
                refresh_token: refreshToken,
            },
        },
        api,
        extraOptions,
    )

    if (!updateAuth.data) {
        RedirectService.redirect("/")
        AlertService.error("Ошибка обновления токена. Пожалуйста переавторизутесь")
        return updateAuth
    }

    const { refresh_token, access_token } = updateAuth.data as IUpdateAuthorizationResponse

    TokenService.setAccessToken(access_token)
    TokenService.setRefreshToken(refresh_token)

    return baseQuery(
        {
            ...(args as FetchArgs),
            headers: {
                Authorization: TokenService.getAccessToken() ?? undefined,
            },
        },
        api,
        extraOptions,
    )
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQueryWithReAuth,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        authorizationV2: builder.mutation<AuthorizationResponseV2Type, AuthorizationRequestV2Type>({
            query: (body) => query("/v2/auth/", "POST", false, body),
        }),

        connectTelegram: builder.mutation<IConnectTelegramResponse, void>({
            query: () => query("/v1/auth/connect-telegram", "POST", true),
        }),

        registration: builder.mutation<void, IRegistrationRequest>({
            query: (body) => query("/v1/auth/registration", "POST", false, body),
        }),

        createMailBox: builder.mutation<void, void>({
            query: () => query("/v1/auth/create-mail-box", "POST", true),
        }),

        changePassword: builder.mutation<void, IChangePasswordRequest>({
            query: (body) => query("/v1/auth/change-password", "POST", true, body),
        }),
    }),
})

export const {
    useChangePasswordMutation,
    useRegistrationMutation,
    useCreateMailBoxMutation,
    useAuthorizationV2Mutation,
    useConnectTelegramMutation,
} = authApi
