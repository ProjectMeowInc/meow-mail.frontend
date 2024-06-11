export type DmarcReportStatus = "Any" | "Pending" | "Resolve"

export interface IGetDmarcReportsResponse {
    items: {
        content: string
        date_time: number
        from: string
        id: number
        status: DmarcReportStatus
        attachments: {
            id: string
        }[]
    }[]
}
