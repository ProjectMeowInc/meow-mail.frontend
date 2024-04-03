import {createApi} from "@reduxjs/toolkit/query/react"
import {fetchBaseQueryWithReAuth} from "../../Auth/api/AuthApi";
import {ICreateEmailGroupResponse} from "../models/responses/ICreateEmailGroupResponse";
import {ICreateEmailGroupRequest} from "../models/requests/ICreateEmailGroupRequest";
import {TokenService} from "../../../shared/services/TokenService";
import {IGetEmailGroupsResponse} from "../models/responses/IGetEmailGroupsResponse";

export const emailGroupApi = createApi({
    reducerPath: "emailGroupApi",
    baseQuery: fetchBaseQueryWithReAuth,
    endpoints: build => ({
        createEmailGroup: build.mutation<ICreateEmailGroupResponse, ICreateEmailGroupRequest>({
            query: (body) => ({
                url: "/v1/email-group",
                method: "POST",
                body,
                headers: {
                    Authorization: TokenService.getAccessToken()
                }
            })
        }),

        getAllEmailGroup: build.query<IGetEmailGroupsResponse, void>({
            query: () => ({
                url: "/v1/email-groups/my",
                method: "GET",
                headers: {
                    Authorization: TokenService.getAccessToken()
                }
            })
        }),

        deleteEmailGroupById: build.mutation<void, number>({
            query: (emailGroupId) => ({
                url: `/v1/email-group/${emailGroupId}`,
                method: "DELETE",
                headers: {
                    Authorization: TokenService.getAccessToken()
                }
            })
        })
    })
})