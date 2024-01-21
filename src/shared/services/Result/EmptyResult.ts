import {Error} from "../Error";
import {EmptyResult as EResult} from "result/src/EmptyResult"

export class EmptyResult extends EResult<Error> { }