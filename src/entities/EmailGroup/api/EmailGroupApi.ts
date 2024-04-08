import {createApi} from "@reduxjs/toolkit/query/react"
import {fetchBaseQueryWithReAuth} from "../../Auth/api/AuthApi"
import {ICreateEmailGroupResponse} from "../models/responses/ICreateEmailGroupResponse"
import {ICreateEmailGroupRequest} from "../models/requests/ICreateEmailGroupRequest"
import {IGetEmailGroupsResponse} from "../models/responses/IGetEmailGroupsResponse"
import { EmailGroup, EmailType } from "../../../consts"
import { query } from "../../../shared/utils/query"


export const emailGroupApi = createApi({
    reducerPath: "emailGroupApi",
    baseQuery: fetchBaseQueryWithReAuth,
    tagTypes: [EmailGroup, EmailType],
    endpoints: build => ({
        createEmailGroup: build.mutation<ICreateEmailGroupResponse, ICreateEmailGroupRequest>({
            query: (body) => query("/v1/email-group/", "POST", true, body),
            invalidatesTags: [{type: EmailGroup, id: "LIST"}]
        }),

        getAllEmailGroup: build.query<IGetEmailGroupsResponse, void>({
            query: () => query("/v1/email-group/my", "GET", true),
            providesTags: result => result
                ? [...result.items.map(({ id }) => ({ type: EmailGroup, id })), { type: EmailGroup, id: "LIST" }]
                : [{ type: EmailGroup, id: "LIST" }],
        }),

        deleteEmailGroupById: build.mutation<void, number>({
            query: (emailGroupId) => query(`/v1/email-group/${emailGroupId}`, "DELETE", true),
            invalidatesTags: [{type: EmailGroup, id: "LIST"}]
        })
    })
})

export const {useCreateEmailGroupMutation, useDeleteEmailGroupByIdMutation, useGetAllEmailGroupQuery} = emailGroupApi