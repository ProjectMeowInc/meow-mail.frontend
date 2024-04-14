import { ChangeEvent } from "react"

export interface IOnChangeEvent {
    fieldName: string
    fieldValue: string
    baseEvent?: ChangeEvent<HTMLInputElement>
}
