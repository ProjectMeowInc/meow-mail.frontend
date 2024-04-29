import React from "react"
import { useLettersPage } from "./useLettersPage"
import Email from "../../shared/components/Email/Email"
import classes from "./lettersPage.module.css"

const LettersPage = () => {
    const { storeMails } = useLettersPage()

    return (
        <div className={classes.wrapper}>
            {storeMails.map((group) => (
                <div className={classes.group} key={group.date}>
                    <p className={classes.date}>{group.date}</p>
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

export default LettersPage
