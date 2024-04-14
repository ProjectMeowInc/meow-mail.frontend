import React, { FC } from "react"
import Cross from "../../icons/plus-sm.svg?react"
import classes from "./emailBadge.module.css"

interface IEmailBadgeProps {
    mailbox: string
    deleteHandler?: () => void
}

const EmailBadge: FC<IEmailBadgeProps> = ({ mailbox, deleteHandler }) => {
    return (
        <div className={classes.badge} title={mailbox}>
            <p className={classes.mailbox}>{mailbox}</p>
            <Cross className={classes.cross} onClick={deleteHandler} />
        </div>
    )
}

export default EmailBadge
