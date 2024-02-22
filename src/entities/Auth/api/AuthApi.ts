import { BaseQueryFn, createApi, EndpointBuilder, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_API_URL } from "../../../consts";
import { IAuthorizationResponse } from "../models/responses/IAuthorizationResponse"
import { IAuthorizationRequest } from "../models/requests/IAuthorizationRequest"
import { IRegistrationRequest } from "../models/requests/IRegistrationRequest"
import { IBaseErrorResponse } from "../../../shared/models/IBaseErrorResponse"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl: BASE_API_URL}) as BaseQueryFn<string | FetchArgs, unknown, IBaseErrorResponse>,
    endpoints: (builder) => ({
        authorization: builder.mutation<IAuthorizationResponse, IAuthorizationRequest>({
            query: (body) => ({
                url: "/v1/auth/authorization",
                method: "POST",
                body
            }),
        }),

        registration: builder.mutation<void, IRegistrationRequest>({
            query: (body) => ({
                url: "/v1/auth/registration",
                method: "POST",
                body
            })
        })
    })
})

export const {useAuthorizationMutation, useRegistrationMutation} = authApi