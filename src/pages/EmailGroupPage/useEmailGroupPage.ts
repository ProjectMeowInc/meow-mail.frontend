import { useSearchParamsWrapper } from "../../shared/hooks/useSearchParamsWrapper"
import { useEffect, useState } from "react"
import { LogService } from "../../shared/services/LogService"
import { useParams } from "react-router"
import { AlertService } from "../../shared/services/AlertService"
import { useGetEmailsByEmailGroupQuery } from "../../entities/Email/api/emailApi"
import { isCorrectError } from "../../shared/utils/hasData"

const DefaultPage = "1"

export const useEmailGroupPage = () => {
    const { setSearchParams, getParamExcept } = useSearchParamsWrapper()
    const pageStr = getParamExcept("page", ["0"]).unwrapOrElse(() => {
        LogService.log(`Error get page STR. Use default value: ${DefaultPage}`, "ERROR")
        return DefaultPage
    })

    const [pageNumber] = useState<number>(Number(pageStr))

    useEffect(() => {
        if (!pageNumber) {
            return setSearchParams("page", pageNumber.toString())
        }
    }, [pageNumber])

    const params = useParams<{ groupId: string }>()

    const { data: mails, error } = useGetEmailsByEmailGroupQuery(
        {
            page: Number(pageNumber),
            email_group_id: Number(params.groupId),
        },
        { pollingInterval: 20000 },
    )

    useEffect(() => {
        if (isCorrectError(error)) {
            return AlertService.error(error.data.message)
        }
    }, [error])

    return {
        mails,
    }
}
