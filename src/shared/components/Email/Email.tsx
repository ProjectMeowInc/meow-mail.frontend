import React, { FC } from "react"
import classes from "./email.module.css"
import { Link } from "react-router-dom"
import { useEmail } from "./useEmail"
import { EmailImage } from "../EmailImage/EmailImage"
import { MailboxBadge } from "../MailboxBadge/MailboxBadge"
import { MailboxType } from "../../../entities/Email/models/type/MailboxRole"

import Star from "../../icons/star.svg?react"
import Trash from "../../icons/trash.svg?react"
import Check from "../../icons/check.svg?react"

interface IEmailProps {
    id: number
    isRead: boolean
    subject: string
    from: { address: string; type: MailboxType }
    href: string
}

const Email: FC<IEmailProps> = ({ id, subject, isRead, from, href }) => {
    const { CheckHandler, DeleteHandler } = useEmail()

    return (
        <div className={classes.email}>
            <div className={classes.left_side}>
                <Star className={classes.icon} />

                <EmailImage from={from.address} />

                <Link to={href} className={classes.email_info}>
                    <div className={`${classes.email_from} ${isRead && classes.is_read}`}>
                        {from.address}
                        <MailboxBadge type={from.type} />
                    </div>
                    <p className={classes.email_subject}>{subject}</p>
                </Link>
            </div>
            <div className={classes.right_side}>
                <Trash className={classes.icon} onClick={async () => DeleteHandler(id)} />
                <Check className={classes.icon} onClick={() => CheckHandler(id, isRead)} />
            </div>
        </div>
    )
}

export default Email
