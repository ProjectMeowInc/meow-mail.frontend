import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQueryWithReAuth } from "../../Auth/api/AuthApi"
import { IGetAllEmailWIthFilterRequest } from "../models/requests/IGetAllEmailWIthFilterRequest"
import { IGetAllEmailWithFilterResponse } from "../models/responses/IGetAllEmailWithFilterResponse"
import { IUpdateEmailStatusRequest } from "../models/requests/IUpdateEmailStatusRequest"
import { ISendEmailRequest } from "../models/requests/ISendEmailRequest"
import { IGetEmailByIdResponse } from "../models/responses/IGetEmailByIdResponse"
import { EmailGroup, EmailType } from "../../../consts"
import { IGetEmailsByEmailGroupResponse } from "../../EmailGroup/models/responses/IGetEmailsByEmailGroupResponse"
import { IGetEmailByEmailGroupRequest } from "../../EmailGroup/models/requests/IGetEmailByEmailGroupRequest"
import { query } from "../../../shared/utils/query"
import { encode } from "js-base64"
import { IGetEmailStatisticsResponse } from "../models/responses/IGetEmailStatistic"
import { IGetEmailAttachments } from "../models/responses/IGetEmailAttachments"

export const emailApi = createApi({
    reducerPath: "emailApi",
    baseQuery: fetchBaseQueryWithReAuth,
    tagTypes: [EmailType, EmailGroup],
    refetchOnReconnect: true,
    refetchOnFocus: true,
    endpoints: (build) => ({
        getEmailWithFilter: build.query<IGetAllEmailWithFilterResponse, IGetAllEmailWIthFilterRequest>({
            query: ({ pageNumber, subject, is_received }) =>
                query("/v1/email/filter", "GET", true, undefined, {
                    page: pageNumber,
                    subject: encode(subject ?? ""),
                    is_received,
                    is_base64: true,
                }),
            providesTags: (result) =>
                result
                    ? [...result.items.map(({ id }) => ({ type: EmailType, id })), { type: EmailType, id: "LIST" }]
                    : [{ type: EmailType, id: "LIST" }],
        }),

        getEmailsByEmailGroup: build.query<IGetEmailsByEmailGroupResponse, IGetEmailByEmailGroupRequest>({
            query: ({ page, email_group_id }) =>
                query(`/v1/email-group/find/${email_group_id}?page=${page}`, "GET", true),
            providesTags: (result) =>
                result
                    ? [...result.items.map(({ id }) => ({ type: EmailType, id })), { type: EmailType, id: "LIST" }]
                    : [
                          { type: EmailType, id: "LIST" },
                          { type: EmailGroup, id: "LIST" },
                      ],
        }),

        updateEmailStatus: build.mutation<void, IUpdateEmailStatusRequest>({
            query: (body) => query("/v1/email/my/set-read", "PUT", true, body),
            invalidatesTags: [
                { type: EmailType, id: "LIST" },
                { type: EmailGroup, id: "LIST" },
            ],
        }),

        sendEmail: build.mutation<void, ISendEmailRequest>({
            query: (body) => query("/v1/email/send-message", "POST", true, body),
            invalidatesTags: [{ type: EmailType, id: "LIST" }],
        }),

        getEmailById: build.query<IGetEmailByIdResponse, number>({
            query: (emailId: number) => query(`/v1/email/${emailId}`, "GET", true),
        }),

        getEmailStatistic: build.query<IGetEmailStatisticsResponse, void>({
            query: () => query("/v1/email/statistic/", "GET", true),
            providesTags: [{ type: EmailType, id: "LIST" }],
        }),

        deleteEmailById: build.mutation<void, number>({
            query: (emailId: number) => query(`/v1/email/${emailId}`, "DELETE", true),
            invalidatesTags: [
                { type: EmailType, id: "LIST" },
                { type: EmailGroup, id: "LIST" },
            ],
        }),

        getEmailAttachments: build.query<IGetEmailAttachments, number>({
            query: (emailId) => query(`/v1/email/${emailId}/attachments`, "GET", true),
            providesTags: [{ type: EmailType, id: "LIST" }],
        }),
    }),
})

export const {
    useGetEmailWithFilterQuery,
    useUpdateEmailStatusMutation,
    useSendEmailMutation,
    useGetEmailByIdQuery,
    useDeleteEmailByIdMutation,
    useGetEmailsByEmailGroupQuery,
    useGetEmailStatisticQuery,
    useGetEmailAttachmentsQuery,
} = emailApi
