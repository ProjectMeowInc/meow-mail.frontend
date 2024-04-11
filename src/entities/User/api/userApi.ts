import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQueryWithReAuth } from "../../Auth/api/AuthApi"
import { query } from "../../../shared/utils/query"
import { IGetUserListResponse } from "../models/IGetUserListResponse"
import { UserType } from "../../../consts"
import { IUpdateUserRoleById } from "../models/IUpdateUserRoleById"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQueryWithReAuth,
    tagTypes: [UserType],
    endpoints: (build) => ({
        getUserList: build.query<IGetUserListResponse, number>({
            query: (page) =>
                query("/v1/user/", "GET", true, undefined, {
                    page: page,
                }),
            providesTags: (result) =>
                result
                    ? [...result.items.map(({ id }) => ({ type: UserType, id })), { type: UserType, id: "LIST" }]
                    : [{ type: UserType, id: "LIST" }],
        }),

        updateUserRoleById: build.mutation<void, IUpdateUserRoleById>({
            query: (body) => query("/v1/user/set-role", "PUT", true, body),
            invalidatesTags: [{ type: UserType, id: "LIST" }],
        }),
    }),
})

export const { useGetUserListQuery, useUpdateUserRoleByIdMutation } = userApi
