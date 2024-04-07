import {createApi} from "@reduxjs/toolkit/query/react"
import {fetchBaseQueryWithReAuth} from "../../Auth/api/AuthApi"
import {ICreateEmailGroupResponse} from "../models/responses/ICreateEmailGroupResponse"
import {ICreateEmailGroupRequest} from "../models/requests/ICreateEmailGroupRequest"
import {TokenService} from "../../../shared/services/TokenService"
import {IGetEmailGroupsResponse} from "../models/responses/IGetEmailGroupsResponse"
import { EmailGroup, EmailType } from "../../../consts"


export const emailGroupApi = createApi({
    reducerPath: "emailGroupApi",
    baseQuery: fetchBaseQueryWithReAuth,
    tagTypes: [EmailGroup, EmailType],
    endpoints: build => ({
        createEmailGroup: build.mutation<ICreateEmailGroupResponse, ICreateEmailGroupRequest>({
            query: (body) => ({
                url: "/v1/email-group/",
                method: "POST",
                body,
                headers: {
                    Authorization: TokenService.getAccessToken()
                }
            }),
            invalidatesTags: [{type: EmailGroup, id: "LIST"}]
        }),

        getAllEmailGroup: build.query<IGetEmailGroupsResponse, void>({
            query: () => ({
                url: "/v1/email-group/my",
                method: "GET",
                headers: {
                    Authorization: TokenService.getAccessToken()
                }
            }),
            providesTags: result => result
                ? [...result.items.map(({ id }) => ({ type: EmailGroup, id })), { type: EmailGroup, id: "LIST" }]
                : [{ type: EmailGroup, id: "LIST" }],
        }),

        deleteEmailGroupById: build.mutation<void, number>({
            query: (emailGroupId) => ({
                url: `/v1/email-group/${emailGroupId}`,
                method: "DELETE",
                headers: {
                    Authorization: TokenService.getAccessToken()
                }
            }),
            invalidatesTags: [{type: EmailGroup, id: "LIST"}]
        })
    })
})

export const {useCreateEmailGroupMutation, useDeleteEmailGroupByIdMutation, useGetAllEmailGroupQuery} = emailGroupApi