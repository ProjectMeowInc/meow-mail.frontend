import { FetchArgs } from "@reduxjs/toolkit/query/react"
import { TokenService } from "../services/TokenService"

type QueryMethod = "GET" | "PUT" | "POST" | "DELETE"

export const query = (
    url: string,
    method: QueryMethod,
    withAuth: boolean,
    body?: object,
    params?: object,
    config?: object,
): FetchArgs => {
    let result: FetchArgs = {
        url,
        method,
        body,
        params,
        ...config,
    }

    if (withAuth) {
        result = {
            ...result,
            headers: {
                Authorization: TokenService.getAccessToken() ?? undefined,
            },
        }
    }

    return result
}
