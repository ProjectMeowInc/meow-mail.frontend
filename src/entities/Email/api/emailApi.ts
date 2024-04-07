import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQueryWithReAuth } from "../../Auth/api/AuthApi"
import { IGetAllEmailResponse } from "../models/responses/IGetAllEmailResponse"
import { IGetAllEmailWIthFilterRequest } from "../models/requests/IGetAllEmailWIthFilterRequest"
import { IGetAllEmailWithFilterResponse } from "../models/responses/IGetAllEmailWithFilterResponse"
import { IUpdateEmailStatusRequest } from "../models/requests/IUpdateEmailStatusRequest"
import { TokenService } from "../../../shared/services/TokenService"
import { ISendEmailRequest } from "../models/requests/ISendEmailRequest"
import { IGetEmailByIdResponse } from "../models/responses/IGetEmailByIdResponse"
import { EmailGroup, EmailType } from "../../../consts"
import { IGetEmailsByEmailGroupResponse } from "../../EmailGroup/models/responses/IGetEmailsByEmailGroupResponse"
import { IGetEmailByEmailGroupRequest } from "../../EmailGroup/models/requests/IGetEmailByEmailGroupRequest"

export const emailApi = createApi({
    reducerPath: "emailApi",
    baseQuery: fetchBaseQueryWithReAuth,
    tagTypes: [EmailType, EmailGroup],
    refetchOnReconnect: true,
    refetchOnFocus: true,
    endpoints: (build) => ({
        getAllEmail: build.query<IGetAllEmailResponse, number>({
            query: (pageNumber) => ({
                url: `/v1/email/my?page=${pageNumber}`,
                method: "GET",
                headers: {
                    Authorization: TokenService.getAccessToken(),
                },
            }),
            providesTags: (result) =>
                result
                    ? [...result.items.map(({ id }) => ({ type: EmailType, id })), { type: EmailType, id: "LIST" }]
                    : [{ type: EmailType, id: "LIST" }],
        }),

        getEmailWithFilter: build.query<IGetAllEmailWithFilterResponse, IGetAllEmailWIthFilterRequest>({
            query: ({ pageNumber, subject, is_received }) => ({
                url: "/v1/email/filter",
                method: "GET",
                headers: {
                    Authorization: TokenService.getAccessToken(),
                },
                params: {
                    page: pageNumber,
                    subject,
                    is_received,
                },
            }),
            providesTags: (result) =>
                result
                    ? [...result.items.map(({ id }) => ({ type: EmailType, id })), { type: EmailType, id: "LIST" }]
                    : [{ type: EmailType, id: "LIST" }],
        }),

        getEmailsByEmailGroup: build.query<IGetEmailsByEmailGroupResponse, IGetEmailByEmailGroupRequest>({
            query: ({page, email_group_id}) => ({
                url: `/v1/email-group/find/${email_group_id}?page=${page}`,
                method: "GET",
                headers: {
                    Authorization: TokenService.getAccessToken()
                },
            }),
            providesTags: result => result
                ? [...result.items.map(({ id }) => ({ type: EmailType, id })), { type: EmailType, id: "LIST" }]
                : [{ type: EmailType, id: "LIST" }, { type: EmailGroup, id: "LIST" }],
        }),

        updateEmailStatus: build.mutation<void, IUpdateEmailStatusRequest>({
            query: (body) => ({
                url: "/v1/email/my/set-read",
                method: "PUT",
                body,
                headers: {
                    Authorization: TokenService.getAccessToken(),
                },
            }),
            invalidatesTags: [{ type: EmailType, id: "LIST" }, { type: EmailGroup, id: "LIST" }],
        }),

        sendEmail: build.mutation<void, ISendEmailRequest>({
            query: (body) => ({
                url: "/v1/email/send-message",
                method: "POST",
                body,
                headers: {
                    Authorization: TokenService.getAccessToken(),
                },
            }),
            invalidatesTags: [{ type: EmailType, id: "LIST" }],
        }),

        getEmailById: build.query<IGetEmailByIdResponse, number>({
            query: (emailId: number) => ({
                url: `/v1/email/${emailId}`,
                method: "GET",
                headers: {
                    Authorization: TokenService.getAccessToken(),
                },
            }),
        }),

        deleteEmailById: build.mutation<void, number>({
            query: (emailId: number) => ({
                url: `/v1/email/${emailId}`,
                method: "DELETE",
                headers: {
                    Authorization: TokenService.getAccessToken(),
                },
            }),
            invalidatesTags: [{ type: EmailType, id: "LIST" }, { type: EmailGroup, id: "LIST" }],
        }),
    }),
})

export const {
    useGetAllEmailQuery,
    useGetEmailWithFilterQuery,
    useUpdateEmailStatusMutation,
    useSendEmailMutation,
    useGetEmailByIdQuery,
    useDeleteEmailByIdMutation,
    useGetEmailsByEmailGroupQuery
} = emailApi
