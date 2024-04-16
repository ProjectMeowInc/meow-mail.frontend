import React from "react"
import { useSentEmailsPage } from "./useSentEmailsPage"
import Preloader from "../../shared/components/Preloader/Preloader"
import Email from "../../shared/components/Email/Email"

const SentEmailsPage = () => {
    const { emails } = useSentEmailsPage()

    if (!emails) {
        return <Preloader />
    }

    return (
        <div>
            {emails.items.map((email) => (
                <Email
                    key={email.id}
                    id={email.id}
                    isRead={email.is_read}
                    subject={email.subject}
                    from={{
                        address: email.from.mailbox,
                        type: email.from.type,
                    }}
                    href={`/my/${email.id}`}
                />
            ))}
        </div>
    )
}

export default SentEmailsPage
