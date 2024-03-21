import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQueryWithReAuth } from "../../Auth/api/AuthApi"
import { IGetAllEmailResponse } from "../models/responses/IGetAllEmailResponse"
import { IGetAllEmailWIthFilterRequest } from "../models/requests/IGetAllEmailWIthFilterRequest"
import { IGetAllEmailWithFilterResponse } from "../models/responses/IGetAllEmailWithFilterResponse"
import { IUpdateEmailStatusRequest } from "../models/requests/IUpdateEmailStatusRequest"
import { TokenService } from "../../../shared/services/TokenService"

const EmailType = "email" as const

export const emailApi = createApi({
    reducerPath: "emailApi",
    baseQuery: fetchBaseQueryWithReAuth,
    tagTypes: ["email"],
    endpoints: build => ({
        getAllEmail: build.query<IGetAllEmailResponse, number>({
            query: pageNumber => ({
                url: `/v1/email/my?page=${pageNumber}`,
                method: "GET",
                headers: {
                    Authorization: TokenService.getAccessToken()
                }
            }),
            providesTags: result =>  result
                ? [...result.items.map(({ id }) => ({ type: EmailType, id })), EmailType]
                : [EmailType],
        }),

        getEmailWithFilter: build.query<IGetAllEmailWithFilterResponse, IGetAllEmailWIthFilterRequest>({
            query: ({pageNumber, subject}) => ({
                url: `/v1/email/filter?page=${pageNumber}&subject=${subject}`,
                method: "GET",
                headers: {
                    Authorization: TokenService.getAccessToken()
                }
            }),
            providesTags: result =>  result
                ? [...result.items.map(({ id }) => ({ type: EmailType, id })), EmailType]
                : [EmailType],
        }),

        updateEmailStatus: build.mutation<void, IUpdateEmailStatusRequest>({
            query: body => ({
                url: "/v1/email/my/set-read",
                method: "PUT",
                body,
                headers: {
                    Authorization: TokenService.getAccessToken()
                }
            }),
            invalidatesTags: [{type: EmailType, id: "LIST"}],
        })
    })
})

export const {useGetAllEmailQuery, useGetEmailWithFilterQuery, useUpdateEmailStatusMutation} = emailApi