import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {ApiUrl} from "../../../consts/VARS";
import {IncorrectUrlException} from "../../exceptions/IncorrectUrlException";
import {Result} from "../Result/Result";
import {AppError} from "../AppError";
import {LogService} from "../LogService";

type Method = "GET" | "POST" | "PUT" | "DELETE"

export class HTTPRequest<TResult> {
    private url: string | null = null
    private method: Method = "GET"
    private body: object | null = null
    private auth: boolean = false

    async sendAsync(): Promise<Result<TResult>> {

        if (!this.url) {
            throw new IncorrectUrlException()
        }

        if (this.isValidUrl(this.url)) {
            throw new IncorrectUrlException()
        }

        const config: AxiosRequestConfig = {
            baseURL: `${ApiUrl}/api`,
            method: this.method,
            url: this.url
        }

        if (this.body) {
            config.data = this.body
        }

        if (this.auth) {
            //TODO: Сделать взаимодействие с токенами
        }

        try {
            const result = await axios.request<TResult>(config)

            return Result.withOk(result.data)
        }
        catch (e: any) {
            if (e.isAxiosError) {
                const baseError = e as AxiosError<AppError>

                if (!baseError.response) {
                    LogService.error(baseError.message, "HTTPRequest")

                    return Result.withError({
                        errorType: "AppError",
                        displayMessage: baseError.message
                    })
                }

                return Result.withError({
                    errorType: "HTTPError",
                    responseBody: baseError.response.data,
                    statusCode: baseError.status ?? 400
                })
            }

            return Result.withError({
                errorType: "AppError",
                displayMessage: e.message
            })
        }
    }

    withUrl(url: string): HTTPRequest<TResult> {
        this.url === url
        return this
    }

    withBody(body: object) {
        this.body = body
        return this
    }

    withPOSTMethod(): HTTPRequest<TResult> {
        this.withMethod("POST")
        return this
    }

    withPUTMethod(): HTTPRequest<TResult> {
        this.withMethod("PUT")
        return this
    }

    withDELETEMethod(): HTTPRequest<TResult> {
        this.withMethod("DELETE")
        return this
    }

    withGETMethod(): HTTPRequest<TResult> {
        this.withMethod("GET")
        return this
    }

    private withMethod(method: Method): HTTPRequest<TResult> {
        this.method = method
        return this
    }

    private isValidUrl(url: string): boolean {
        return url[0] === "/";
    }
}