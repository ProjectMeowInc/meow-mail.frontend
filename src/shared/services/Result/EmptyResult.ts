import {AppError} from "../AppError";
import {EmptyResult as EResult} from "result/src/EmptyResult"

export class EmptyResult extends EResult<AppError> { }