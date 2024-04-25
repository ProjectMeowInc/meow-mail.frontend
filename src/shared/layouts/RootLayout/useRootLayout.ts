import { ClientService } from "../../services/ClientService"
import { cleanUpStore, useAppDispatch, useAppSelector } from "../../../store"
import { useGetEmailWithFilterQuery } from "../../../entities/Email/api/emailApi"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { AlertService } from "../../services/AlertService"
import { setEmails } from "../../../entities/Email/slices/emailSlice"
import { RedirectService } from "../../services/RedirectService"
import { isCorrectError } from "../../utils/hasData"
import { useSearchParamsWrapper } from "../../hooks/useSearchParamsWrapper"
import { LogService } from "../../services/LogService"
import { TokenService } from "../../services/TokenService"

const DefaultPage = "1"

export const useRootLayout = () => {
    const location = useLocation()
    const { setSearchParams, getParamExcept } = useSearchParamsWrapper()
    const pageStr = getParamExcept("page", ["0"]).unwrapOrElse(() => {
        LogService.log(`Error get page STR. Use default value: ${DefaultPage}`, "ERROR")
        return DefaultPage
    })
    const [pageNumber, setPageNumber] = useState<number>(Number(pageStr))
    const deviceType = ClientService.getClientType()
    const user = useAppSelector((state) => state.user.data)
    const [searchParams] = useSearchParams()
    const [subject, setSubject] = useState<string>("")
    const { data: mails, error } = useGetEmailWithFilterQuery(
        {
            pageNumber: pageNumber,
            subject: subject.length > 0 ? subject : undefined,
            is_received: searchParams.get("is_received") === "true",
        },
        {
            pollingInterval: 20000,
        },
    )
    const dispatch = useAppDispatch()
    const [isActiveSendForm, setIsActiveSendForm] = useState<boolean>(false)
    const [mailsCount, setMailCount] = useState<number>(0)
    const navigate = useNavigate()
    const [hideComponent, setHideComponents] = useState<boolean>(false)

    useEffect(() => {
        if (mails) {
            dispatch(setEmails(mails.items))
            setMailCount(mails.page_count)
        }
    }, [mails])

    useEffect(() => {
        if (location.pathname.match(/\/my\/([0-9]|admin)/)) {
            return setHideComponents(true)
        }

        setHideComponents(false)
    }, [location])

    useEffect(() => {
        if (isCorrectError(error)) {
            return AlertService.error(error.data.message)
        }
    }, [error])

    useEffect(() => {
        navigate(`?page=${pageNumber}`)
    }, [pageNumber])

    useEffect(() => {
        if (!pageNumber) {
            return setSearchParams("page", pageNumber.toString())
        }
    }, [pageNumber])

    const MovePage = (number: number) => {
        console.log(mails)
        console.log(mails.page_count)
        console.log(mails.count)

        if (number === 1) {
            if (mails && mails.page_count === 20 && mails.count <= mailsCount) {
                setPageNumber((prevState) => prevState + 1)
                setMailCount((prevState) => prevState + mails.page_count)
            }
            return
        }

        if (mails && mails.count === mailsCount && pageNumber !== 1) {
            setPageNumber((prevState) => prevState - 1)
            setMailCount((prevState) => prevState - mails.page_count)
        }
    }

    const QuitHandler = () => {
        cleanUpStore()
        TokenService.removeAccessToken()
        TokenService.removeRefreshToken()
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
        QuitHandler,
        hideComponent,
    }
}
