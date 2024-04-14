import { ChangeEvent } from "react"

export interface IOnChangeEvent {
    fieldName: string
    fieldValue: string
    input?: ChangeEvent<HTMLInputElement>
}
