import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useGetEmailWithFilterQuery } from "../../entities/Email/api/emailApi"
import { AlertService } from "../../shared/services/AlertService"
import { useAppDispatch, useAppSelector } from "../../store"
import { setEmails } from "../../entities/Email/slices/emailSlice"

export const useLettersPage = () => {
    const [searchParams] = useSearchParams()
    const [pageNumber, setPageNumber] = useState<number>(Number(searchParams.get("page")) ?? 1)

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
        if (!searchParams.get("page")) {
            return searchParams.set("page", pageNumber.toString())
        }

        setPageNumber(Number(searchParams.get("page")))
    }, [pageNumber])

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
        isLoading,
        storeMails,
    }
}
