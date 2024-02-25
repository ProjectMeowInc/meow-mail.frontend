import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_API_URL } from "../../../consts"
import { IAuthorizationResponse } from "../models/responses/IAuthorizationResponse"
import { IAuthorizationRequest } from "../models/requests/IAuthorizationRequest"
import { IRegistrationRequest } from "../models/requests/IRegistrationRequest"
import { IBaseErrorResponse } from "../../../shared/models/IBaseErrorResponse"
import { IValidationErrorResponse } from "../../../shared/models/IValidationErrorResponse"
import { TokenService } from "../../../shared/services/TokenService"
import { redirect } from "react-router-dom"
import { AlertService } from "../../../shared/services/AlertService"
import { IUpdateAuthorizationResponse } from "../models/responses/IUpdateAuthorizationResponse"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        IBaseErrorResponse | IValidationErrorResponse
    >,
    endpoints: (builder) => ({
        authorization: builder.mutation<IAuthorizationResponse, IAuthorizationRequest>({
            query: (body) => ({
                url: "/v1/auth/authorization",
                method: "POST",
                body,
            }),
        }),

        registration: builder.mutation<void, IRegistrationRequest>({
            query: (body) => ({
                url: "/v1/auth/registration",
                method: "POST",
                body,
            }),
        }),
    }),
})

const baseQuery = fetchBaseQuery({baseUrl: BASE_API_URL}) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    IBaseErrorResponse | IValidationErrorResponse
>

export const fetchBaseQueryWithAuth: BaseQueryFn<
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
        redirect("/")
        AlertService.error("Ошибка авторизации. Пожалуйста авторизуйтесь заново")
        return result
    }

    const accessToken = TokenService.getAccessToken()

    if (!accessToken || !TokenService.isValidAccessToken(accessToken)) {
        const result = await baseQuery({
            url: BASE_API_URL + "v1/auth/update-auth",
            method: "POST",
            body: {
                refresh_token: refreshToken
            }
        }, api, extraOptions)

        if (result.data) {
            const {refresh_token, access_token} = result.data as IUpdateAuthorizationResponse

            TokenService.setAccessToken(access_token)
            TokenService.setRefreshToken(refresh_token)

            return result
        }

        return result
    }

    return result

}

export const { useAuthorizationMutation, useRegistrationMutation } = authApi