import {Result} from "../../../shared/services/Result/Result";
import {IAuthorizationRequest} from "../models/requests/IAuthorizationRequest";
import {IAuthorizationResponse} from "../models/responses/IAuthorizationResponse";
import {HTTPRequest} from "../../../shared/services/HTTPRequest/HTTPRequest";
import {EmptyResult} from "../../../shared/services/Result/EmptyResult";
import {IRegistrationRequest} from "../models/requests/IRegistrationRequest";

export class AuthApi {
    
    static async authorizationAsync(requestData: IAuthorizationRequest): Promise<Result<IAuthorizationResponse>> {
        const result = await new HTTPRequest<IAuthorizationResponse>()
            .withUrl("/v1/auth/authorization")
            .withPOSTMethod()
            .withBody(requestData)
            .sendAsync()

        if (result.hasError()) {
            return Result.withError(result.getError())
        }

        return Result.withOk(result.unwrap())
    }

    static async registrationAsync(requestData: IRegistrationRequest): Promise<EmptyResult> {
        const result = await new HTTPRequest<void>()
            .withUrl("/v1/auth/registration")
            .withPOSTMethod()
            .withBody(requestData)
            .sendAsync()

        if (result.hasError()) {
            return EmptyResult.withError(result.getError())
        }

        return EmptyResult.withOk()
    }
}