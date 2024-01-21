import {Error} from "../Error";
import {Result as CResult} from "result/src/Result"

export class Result<TResult> extends CResult<TResult, Error> { }