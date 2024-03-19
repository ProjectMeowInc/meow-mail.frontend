import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQueryWithAuth } from "../../Auth/api/AuthApi"
import { IGetAllEmailResponse } from "../models/responses/IGetAllEmailResponse"
import { IGetAllEmailWIthFilterRequest } from "../models/requests/IGetAllEmailWIthFilterRequest"
import { IGetAllEmailWithFilterResponse } from "../models/responses/IGetAllEmailWithFilterResponse"
import { IUpdateEmailStatusRequest } from "../models/requests/IUpdateEmailStatusRequest"

export const emailApi = createApi({
    reducerPath: "emailApi",
    baseQuery: fetchBaseQueryWithAuth,
    endpoints: build => ({
        getAllEmail: build.query<IGetAllEmailResponse, number>({
            query: pageNumber => ({
                url: `/v1/email/my?page=${pageNumber}`,
                method: "GET"
            })
        }),

        getEmailWithFilter: build.query<IGetAllEmailWithFilterResponse, IGetAllEmailWIthFilterRequest>({
            query: ({pageNumber, subject}) => ({
                url: `/v1/email/filter?page=${pageNumber}&subject=${subject}`,
                method: "GET",
            })
        }),

        updateEmailStatus: build.mutation<void, IUpdateEmailStatusRequest>({
            query: body => ({
                url: "/v1/email/my/set-read",
                method: "PUT",
                body
            })
        })
    })
})

export const {useGetAllEmailQuery, useGetEmailWithFilterQuery, useUpdateEmailStatusMutation} = emailApi