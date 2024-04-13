import { useEffect, useState } from "react"
import { useGetEmailWithFilterQuery } from "../../entities/Email/api/emailApi"
import { AlertService } from "../../shared/services/AlertService"
import { useAppDispatch, useAppSelector } from "../../store"
import { setEmails } from "../../entities/Email/slices/emailSlice"
import { useSearchParamsWrapper } from "../../shared/hooks/useSearchParamsWrapper"
import { LogService } from "../../shared/services/LogService"
import { hasDataInError } from "../../shared/utils/hasData"

const DefaultPage = "1"

export const useLettersPage = () => {
    const { setSearchParams, getParamExcept } = useSearchParamsWrapper()
    const pageStr = getParamExcept("page", ["0"]).unwrapOrElse(() => {
        LogService.log(`Error get page STR. Use default value: ${DefaultPage}`, "ERROR")
        return DefaultPage
    })

    const [pageNumber] = useState<number>(Number(pageStr))

    const {
        data: mails,
        error,
        isLoading,
    } = useGetEmailWithFilterQuery(
        {
            pageNumber,
            is_received: true,
        },
        {
            pollingInterval: 20000,
        },
    )

    const dispatch = useAppDispatch()
    const storeMails = useAppSelector((state) => state.emailSlice)

    useEffect(() => {
        if (!pageNumber) {
            return setSearchParams("page", pageNumber.toString())
        }
    }, [pageNumber])

    useEffect(() => {
        if (mails) {
            dispatch(setEmails(mails.items))
        }
    }, [mails])

    useEffect(() => {
        if (hasDataInError(error)) {
            return AlertService.error(error.data.message)
        }
    }, [error])

    return {
        isLoading,
        storeMails,
    }
}
