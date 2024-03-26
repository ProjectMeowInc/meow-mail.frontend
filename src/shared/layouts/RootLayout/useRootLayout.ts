import { ClientService } from "../../services/ClientService"
import { useAppDispatch, useAppSelector } from "../../../store"
import { useGetEmailWithFilterQuery } from "../../../entities/Email/api/emailApi"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { AlertService } from "../../services/AlertService"
import { setEmails } from "../../../entities/Email/slices/emailSlice"
import { RedirectService } from "../../services/RedirectService"
import { resetUser } from "../../../entities/Auth/redusers/userSlice"

export const useRootLayout = () => {
    const deviceType = ClientService.getClientType()
    const user = useAppSelector(state => state.user.data)
    const [searchParams] = useSearchParams()
    const [subject, setSubject] = useState<string>("")
    const [pageNumber, setPageNumber] = useState<number>(Number(searchParams.get("page")) ?? 1)
    const {data: mails, error} = useGetEmailWithFilterQuery({
        pageNumber: pageNumber,
        subject: subject
    }, {skip: true})
    const dispatch = useAppDispatch()
    const [isActiveSendForm, setIsActiveSendForm] = useState<boolean>(false)
    const [mailsCount, setMailCount] = useState<number>(0)
    const navigate = useNavigate()

    useEffect(() => {
        if (mails) {
            dispatch(setEmails(mails.items))
            setMailCount(mails.page_count)
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
            if (mails && mails.page_count === 20 && mails.count <= mailsCount) {
                setPageNumber(prevState =>  prevState + 1)
                setMailCount(prevState => prevState + mails.page_count)
            }
            return
        }

        if (mails && mails.count === mailsCount && pageNumber !== 1) {
            setPageNumber(prevState => prevState - 1)
            setMailCount(prevState => prevState - mails.page_count)
        }
    }

    const QuitHandler = () => {
        localStorage.clear()
        RedirectService.redirect("/")
    }

    return {
        deviceType,
        user,
        setSubject,
        isActiveSendForm,
        setIsActiveSendForm,
        mailsCount,
        MovePage,
        QuitHandler
    }
}