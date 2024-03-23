import React from "react"
import { useLettersPage } from "./useLettersPage"
import Email from "../../shared/components/Email/Email"
import classes from "./letterPage.module.css"

const LetterPage = () => {

    const {storeMails, isLoading} = useLettersPage()

    // todo: change this
    if (isLoading) {
        return <>Loading...</>
    }

    return (
        <div className={classes.wrapper}>
            {storeMails.map(mail => (
                <Email
                    key={mail.id}
                    id={mail.id}
                    href={`${mail.id}`}
                    from={mail.from.mailbox}
                    isRead={mail.is_read}
                    subject={mail.subject}
                />
            ))}
        </div>
    )
}

export default LetterPage