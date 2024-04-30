import { useAppDispatch, useAppSelector } from "../../store"
import { useFirstLoading } from "../../shared/hooks/useFirstLoading"
import { resetState } from "../../entities/Page/slices/pageSlice"
import { useSearchParamsWrapper } from "../../shared/hooks/useSearchParamsWrapper"
import { LogService } from "../../shared/services/LogService"
import { useEffect, useState } from "react"
import { FormatterService, IGroupedEmails } from "../../shared/services/FormatterService"
import { ClientService } from "../../shared/services/ClientService"
import { useGetEmailWithFilterQuery } from "../../entities/Email/api/emailApi"
import { isCorrectError } from "../../shared/utils/hasData"
import { AlertService } from "../../shared/services/AlertService"

export const useSentEmailsPage = () => {
    const { setSearchParams, getParamExcept } = useSearchParamsWrapper()
    const pageString = getParamExcept("page", ["0"]).unwrapOrElse(() => {
        LogService.log("Page must be bigger then 0", "DEBUG")
        return "1"
    })
    const [page, setPage] = useState<number>(Number(pageString))

    const [groupedEmails, setGroupedEmails] = useState<IGroupedEmails[] | null>(null)

    const [prevCount, setPrevCount] = useState<number>(1)
    const [currentCount, setCurrentCount] = useState<number>(20)

    const deviceType = ClientService.getClientType()
    const isMobileDevice = ClientService.isMobileDevice(deviceType)

    const [subject, setSubject] = useState<string>("")

    const { data: emails, error } = useGetEmailWithFilterQuery(
        {
            pageNumber: page,
            is_received: false,
            subject: subject.length > 0 ? subject : undefined,
        },
        {
            pollingInterval: 20000,
        },
    )

    useEffect(() => {
        if (!page) {
            setSearchParams("page", page.toString())
        }
    }, [page])

    useEffect(() => {
        if (isCorrectError(error)) {
            return AlertService.error(error.data.message)
        }
    }, [error])

    useEffect(() => {
        if (emails) {
            setGroupedEmails(FormatterService.sortEmailsByDate(emails.items))
        }
    }, [emails])

    const NextPageHandler = () => {
        if (emails && emails.count === 20 && emails.page_count > page) {
            setPage((prevPage) => prevPage + 1)
            setCurrentCount((prevState) => prevState + 20)
            setPrevCount((prevState) => prevState + 20)
        }
    }

    const PrevPageHandler = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1)
            setCurrentCount((prevState) => prevState - 20)
            setPrevCount((prevState) => prevState - 20)
        }
    }

    return {
        groupedEmails,
        NextPageHandler,
        prevCount,
        currentCount,
        PrevPageHandler,
        isMobileDevice,
        setSubject,
    }
}
