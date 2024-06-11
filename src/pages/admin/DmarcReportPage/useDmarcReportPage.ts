import { useGetDmarcReportsQuery } from "../../../entities/Admin/api/adminApi"

export const useDmarcReportPage = () => {
    const { data } = useGetDmarcReportsQuery(undefined, {
        pollingInterval: 10000,
    })

    return {
        data,
    }
}
