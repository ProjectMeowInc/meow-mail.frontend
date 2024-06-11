import React, { FC } from "react"
import { MailboxBadge } from "../../../../../shared/components/MailboxBadge/MailboxBadge"
import { EmailImage } from "../../../../../shared/components/EmailImage/EmailImage"
import { DmarcReportStatus } from "../../../../../entities/Admin/models/responses/IGetDmarcReportsResponse"
import classes from "./dmarcItem.module.css"
import { FormatterService } from "../../../../../shared/services/FormatterService"
import { useDmarcItem } from "./useDmarcItem"

interface IProps {
    content: string
    date_time: number
    from: string
    id: number
    status: DmarcReportStatus
    attachments: {
        id: string
    }[]
}

const DmarcItem: FC<IProps> = ({ content, status, date_time, from, attachments }) => {
    const { isOpen, setIsOpen, DownloadFileHandler } = useDmarcItem()

    return (
        <div className={classes.dmarc} onClick={() => setIsOpen((prev) => !prev)}>
            <div className={classes.caption}>
                <div className={classes.caption_item}>
                    <EmailImage from={from} />
                    <p>{from}</p>
                    <MailboxBadge type={"DmarcRecordReceiver"} />
                    <p>{FormatterService.formatDate(date_time * 1000)}</p>
                </div>
                <p>{status}</p>
            </div>
            <div>
                <div className={isOpen ? classes.content_active : classes.content}>
                    {content.length > 0 || attachments.length > 0 ? (
                        <div>
                            <p>{content}</p>
                            {attachments.map((attachment, index) => (
                                <p key={attachment.id} onClick={() => DownloadFileHandler(attachment.id)}>
                                    {index + 1} прикрепленный файл
                                </p>
                            ))}
                        </div>
                    ) : (
                        "Здесь ничего нет"
                    )}
                </div>
            </div>
        </div>
    )
}

export default DmarcItem
