import React, { FC } from "react"
import Cross from "../../icons/plus-sm.svg?react"
import classes from "./mailbox.module.css"

interface IMailboxProps {
    mailbox: string
    deleteHandler?: () => void
}

const Mailbox: FC<IMailboxProps> = ({ mailbox, deleteHandler }) => {
    return (
        <div className={classes.badge} title={mailbox}>
            <p className={classes.mailbox}>{mailbox}</p>
            <Cross className={classes.cross} onClick={deleteHandler} />
        </div>
    )
}

export default Mailbox
