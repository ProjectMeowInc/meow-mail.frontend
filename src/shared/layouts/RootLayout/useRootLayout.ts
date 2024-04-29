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
import { nextPage, prevPage } from "../../../entities/Page/slices/pageSlice"

const DefaultPage = "1"

export const useRootLayout = () => {
    const location = useLocation()
    const { setSearchParams, getParamExcept } = useSearchParamsWrapper()
    const pageStr = getParamExcept("page", ["0", "NaN"]).unwrapOrElse(() => {
        LogService.log(`Error get page STR. Use default value: ${DefaultPage}`, "ERROR")
        return DefaultPage
    })
    const [pageNumber, setPageNumber] = useState<number>(Number(pageStr))
    const deviceType = ClientService.getClientType()
    const user = useAppSelector((state) => state.user.data)
    const [searchParams] = useSearchParams()
    const [subject, setSubject] = useState<string>("")
    const {
        data: mails,
        error,
        refetch,
    } = useGetEmailWithFilterQuery(
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
    const navigate = useNavigate()
    const [hideComponent, setHideComponents] = useState<boolean>(false)
    const page = useAppSelector((state) => state.pageSlice)

    useEffect(() => {
        if (mails) {
            dispatch(setEmails(mails.items))
        }
    }, [mails])

    useEffect(() => {
        if (location.pathname.match(/\/my\/([0-9])/)) {
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
        navigate(`?page=${pageNumber}&is_received=${searchParams.get("is_received")}`)
    }, [pageNumber])

    useEffect(() => {
        if (!pageNumber) {
            return setSearchParams("page", pageNumber.toString())
        }
    }, [pageNumber])

    useEffect(() => {
        refetch()
    }, [searchParams])

    const MovePage = (number: number) => {
        if (number === 1) {
            if (mails && mails.count === 20 && mails.count >= page.currentCount) {
                setPageNumber((prevState) => prevState + 1)
                dispatch(
                    nextPage({
                        currentCount: mails.count,
                        prevCount: 20,
                    }),
                )
            }
            return
        }

        if (mails && mails && pageNumber !== 1) {
            setPageNumber((prevState) => prevState - 1)
            dispatch(
                prevPage({
                    currentCount: 20,
                    prevCount: 20,
                }),
            )
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
        MovePage,
        QuitHandler,
        hideComponent,
        page,
    }
}
