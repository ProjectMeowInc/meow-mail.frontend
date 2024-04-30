import { useSearchParamsWrapper } from "../../shared/hooks/useSearchParamsWrapper"
import { useEffect, useState } from "react"
import { LogService } from "../../shared/services/LogService"
import { useParams } from "react-router"
import { AlertService } from "../../shared/services/AlertService"
import { useGetEmailsByEmailGroupQuery } from "../../entities/Email/api/emailApi"
import { isCorrectError } from "../../shared/utils/hasData"
import { FormatterService, IGroupedEmails } from "../../shared/services/FormatterService"
import { ClientService } from "../../shared/services/ClientService"

const DefaultPage = "1"

export const useEmailGroupPage = () => {
    const { setSearchParams, getParamExcept } = useSearchParamsWrapper()
    const pageStr = getParamExcept("page", ["0"]).unwrapOrElse(() => {
        LogService.log(`Error get page STR. Use default value: ${DefaultPage}`, "ERROR")
        return DefaultPage
    })

    const [page, setPage] = useState<number>(Number(pageStr))

    useEffect(() => {
        if (!page) {
            return setSearchParams("page", page.toString())
        }
    }, [page])

    const params = useParams<{ groupId: string }>()

    const { data: emails, error } = useGetEmailsByEmailGroupQuery(
        {
            page: Number(page),
            email_group_id: Number(params.groupId),
        },
        { pollingInterval: 20000 },
    )

    const [groupedEmails, setGroupedEmails] = useState<IGroupedEmails[] | null>(null)

    const [prevCount, setPrevCount] = useState<number>(1)
    const [currentCount, setCurrentCount] = useState<number>(20)

    const deviceType = ClientService.getClientType()
    const isMobileDevice = ClientService.isMobileDevice(deviceType)

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
        NextPageHandler,
        PrevPageHandler,
        currentCount,
        prevCount,
        isMobileDevice,
        groupedEmails,
    }
}
