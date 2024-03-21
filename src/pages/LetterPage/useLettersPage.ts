import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useGetAllEmailQuery } from "../../entities/Email/api/emailApi"
import { AlertService } from "../../shared/services/AlertService"

export const useLettersPage = () => {

    const [searchParams] = useSearchParams()
    const [pageNumber, setPageNumber] = useState<number>(Number(searchParams.get("page")) ?? 1)
    const {data: mails, error, isLoading} = useGetAllEmailQuery(pageNumber)

    useEffect(() => {

        if (!searchParams.get("page")) {
            return searchParams.set("page", pageNumber.toString())
        }

        setPageNumber(Number(searchParams.get("page")))

    }, [pageNumber])

    useEffect(() => {
        if (error && "data" in error) {
            return AlertService.error(error.data.message)
        }
    }, [error])

    return {
        mails,
        isLoading
    }
}