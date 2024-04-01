import React from "react"
import { useLettersPage } from "./useLettersPage"
import Email from "../../shared/components/Email/Email"
import classes from "./lettersPage.module.css"
import Preloader from "../../shared/components/Preloader/Preloader"

const LettersPage = () => {
    const { storeMails, isLoading } = useLettersPage()

    // todo: change this
    if (isLoading) {
        return <Preloader/>
    }

    return (
        <div className={classes.wrapper}>
            {storeMails.map((mail) => (
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
    )
}

export default LettersPage
