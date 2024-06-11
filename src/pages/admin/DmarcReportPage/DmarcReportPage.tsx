import React from "react"
import classes from "./dmarcReportPage.module.css"
import { useDmarcReportPage } from "./useDmarcReportPage"
import Preloader from "../../../shared/components/Preloader/Preloader"
import EmptyInboxPlaceholder from "../../UI/EmptyInboxPlaceholder/EmptyInboxPlaceholder"
import DmarcItem from "./UI/DmarcItem/DmarcItem"

const DmarcReportPage = () => {
    const { data } = useDmarcReportPage()

    if (!data) {
        return <Preloader />
    }

    return (
        <div className={classes.dmarcs}>
            {data.items.length === 0 && <EmptyInboxPlaceholder />}

            {data.items.toReversed().map((report) => (
                <DmarcItem
                    key={report.id}
                    content={report.content}
                    date_time={report.date_time}
                    from={report.from}
                    id={report.id}
                    status={report.status}
                    attachments={report.attachments}
                />
            ))}
        </div>
    )
}

export default DmarcReportPage
