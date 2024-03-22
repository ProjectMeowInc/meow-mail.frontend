import { ClientService } from "../../services/ClientService"
import { useAppDispatch, useAppSelector } from "../../../store"
import { useGetEmailWithFilterQuery } from "../../../entities/Email/api/emailApi"
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { AlertService } from "../../services/AlertService"
import { setEmails } from "../../../entities/Email/slices/emailSlice"

export const useRootLayout = () => {
    const deviceType = ClientService.getClientType()
    const user = useAppSelector(state => state.user.data)
    const [searchParams] = useSearchParams()
    const [subject, setSubject] = useState<string>("")
    const {data: mails, error} = useGetEmailWithFilterQuery({
        pageNumber: Number(searchParams.get("page")) ?? 1,
        subject: subject
    })
    const dispatch = useAppDispatch()
    const [isActiveSendForm, setIsActiveSendForm] = useState<boolean>(false)

    useEffect(() => {
        if (mails) {
            dispatch(setEmails(mails.items))
        }
    }, [mails])

    useEffect(() => {
        if (error && "data" in error) {
            return AlertService.error(error.data.message)
        }
    }, [error])

    return {
        deviceType,
        user,
        setSubject,
        isActiveSendForm,
        setIsActiveSendForm
    }
}