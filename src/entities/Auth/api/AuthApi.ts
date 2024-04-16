import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_API_URL } from "../../../consts"
import { IAuthorizationResponse } from "../models/responses/IAuthorizationResponse"
import { IAuthorizationRequest } from "../models/requests/IAuthorizationRequest"
import { IRegistrationRequest } from "../models/requests/IRegistrationRequest"
import { IBaseErrorResponse } from "../../../shared/models/IBaseErrorResponse"
import { IValidationErrorResponse } from "../../../shared/models/IValidationErrorResponse"
import { TokenService } from "../../../shared/services/TokenService"
import { AlertService } from "../../../shared/services/AlertService"
import { IUpdateAuthorizationResponse } from "../models/responses/IUpdateAuthorizationResponse"
import { RedirectService } from "../../../shared/services/RedirectService"
import { query } from "../../../shared/utils/query"
import { IChangePasswordRequest } from "../models/requests/IChangePasswordRequest"

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

    if (result.error && result.error.status !== 401) {
        return result
    }

    if (result && !result.error) {
        return result
    }

    const refreshToken = TokenService.getRefreshToken()

    if (!refreshToken) {
        RedirectService.redirect("/")
        AlertService.error("Ошибка авторизации. Пожалуйста авторизуйтесь заново")
        return result
    }

    const accessToken = TokenService.getAccessToken()

    if (accessToken && TokenService.isValidAccessToken(accessToken)) {
        return result
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

    if (updateAuth.data) {
        const { refresh_token, access_token } = updateAuth.data as IUpdateAuthorizationResponse

        TokenService.setAccessToken(access_token)
        TokenService.setRefreshToken(refresh_token)

        return baseQuery(args, api, extraOptions)
    }

    return baseQuery(args, api, extraOptions)
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQueryWithReAuth,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        authorization: builder.mutation<IAuthorizationResponse, IAuthorizationRequest>({
            query: (body) => query("/v1/auth/authorization", "POST", false, body),
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
    useAuthorizationMutation,
    useChangePasswordMutation,
    useRegistrationMutation,
    useCreateMailBoxMutation,
} = authApi
