import React from "react"
import { useEmailGroupPage } from "./useEmailGroupPage"
import Preloader from "../../shared/components/Preloader/Preloader"
import Email from "../../shared/components/Email/Email"

const EmailGroupPage = () => {

    const {mails} = useEmailGroupPage()

    if (!mails) {
        return <Preloader/>
    }

    return (
        <div>
            {mails.items.map(mail => (
                <Email
                    key={mail.id}
                    id={mail.id}
                    isRead={mail.is_read}
                    subject={mail.subject}
                    from={{address: mail.from.mailbox, type: mail.from.type}}
                    href={`/my/${mail.id}`}
                />
            ))}
        </div>
    )
}

export default EmailGroupPage