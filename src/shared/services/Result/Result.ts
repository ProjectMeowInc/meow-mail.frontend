import {AppError} from "../AppError";
import {Result as CResult} from "result/src/Result"

export class Result<TResult> extends CResult<TResult, AppError> { }