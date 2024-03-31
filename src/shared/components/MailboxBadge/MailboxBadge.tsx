import { FC } from "react"
import { MailboxType } from "../../../entities/Email/models/type/MailboxRole"

import AlertBadge from "../../icons/alert-mailbox-badge.svg?react"

interface IMailboxBadgeProps {
    type: MailboxType
}

export const MailboxBadge: FC<IMailboxBadgeProps> = ({ type }) => {
    switch (type) {
        case "Default":
            return <></>
        case "TechnicalAlert":
            return <AlertBadge />
    }
}
