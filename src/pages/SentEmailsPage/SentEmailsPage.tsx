import React from "react"
import { useSentEmailsPage } from "./useSentEmailsPage"
import Preloader from "../../shared/components/Preloader/Preloader"
import Email from "../../shared/components/Email/Email"
import classes from "../LettersPage/lettersPage.module.css"

const SentEmailsPage = () => {
    const { emails } = useSentEmailsPage()

    if (!emails) {
        return <Preloader />
    }

    return (
        <div className={classes.wrapper}>
            {emails.map((group) => (
                <div className={classes.group} key={group.date}>
                    <p className={classes.date}>{group.date.toString()}</p>
                    {group.items.map((mail) => (
                        <Email
                            key={mail.id}
                            id={mail.id}
                            href={`${mail.id}`}
                            from={{ address: mail.from.mailbox, type: mail.from.type }}
                            isRead={mail.is_read}
                            subject={mail.subject}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default SentEmailsPage
