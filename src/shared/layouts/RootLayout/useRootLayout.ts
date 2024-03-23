import { ClientService } from "../../services/ClientService"
import { useAppDispatch, useAppSelector } from "../../../store"
import { useGetEmailWithFilterQuery } from "../../../entities/Email/api/emailApi"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { AlertService } from "../../services/AlertService"
import { setEmails } from "../../../entities/Email/slices/emailSlice"

export const useRootLayout = () => {
    const deviceType = ClientService.getClientType()
    const user = useAppSelector(state => state.user.data)
    const [searchParams] = useSearchParams()
    const [subject, setSubject] = useState<string>("")
    const [pageNumber, setPageNumber] = useState<number>(Number(searchParams.get("page")) ?? 1)
    const {data: mails, error} = useGetEmailWithFilterQuery({
        pageNumber: pageNumber,
        subject: subject
    })
    const dispatch = useAppDispatch()
    const [isActiveSendForm, setIsActiveSendForm] = useState<boolean>(false)
    const [mailsCount, setMailCount] = useState<number>(0)
    const navigate = useNavigate()

    useEffect(() => {
        if (mails) {
            dispatch(setEmails(mails.items))
            setMailCount(mails.count)
        }
    }, [mails])

    useEffect(() => {
        if (error && "data" in error) {
            return AlertService.error(error.data.message)
        }
    }, [error])

    useEffect(() => {
        navigate(`?page=${pageNumber}`)
    }, [pageNumber])

    const MovePage = (number: number) => {
        if (number === 1) {
            if (mails && mails.count === 20 && pageNumber >= 1) {
                setPageNumber(prevState =>  prevState + 1)
                setMailCount(prevState => prevState + mails.count)
            }
            return
        }

        if (mails && mails.count !== 20 && pageNumber !== 1) {
            setPageNumber(prevState => prevState - 1)
            setMailCount(prevState => prevState - mails.count)
        }
    }

    return {
        deviceType,
        user,
        setSubject,
        isActiveSendForm,
        setIsActiveSendForm,
        mailsCount,
        MovePage
    }
}