import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQueryWithReAuth } from "../../Auth/api/AuthApi"
import { IGetDmarcReportsResponse } from "../models/responses/IGetDmarcReportsResponse"
import { query } from "../../../shared/utils/query"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQueryWithReAuth,
    endpoints: (build) => ({
        getDmarcReports: build.query<IGetDmarcReportsResponse, void>({
            query: () => query("/v1/admin/dmarc-report", "GET", true),
        }),
    }),
})

export const { useGetDmarcReportsQuery } = adminApi
