import React from "react"
import { useEmailGroupPage } from "./useEmailGroupPage"
import Preloader from "../../shared/components/Preloader/Preloader"
import Email from "../../shared/components/Email/Email"
import PaginationControls from "../UI/PaginationControls/PaginationControls"
import MobilePaginationControls from "../UI/MobilePaginationControls/MobilePaginationControls"
import classes from "./emailGroupPage.module.css"
import Cat from "../UI/Cat/Cat"

const EmailGroupPage = () => {
    const { groupedEmails, PrevPageHandler, NextPageHandler, prevCount, currentCount, isMobileDevice } =
        useEmailGroupPage()

    if (!groupedEmails) {
        return <Preloader />
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.controls}>
                {!isMobileDevice && groupedEmails.length !== 0 && (
                    <PaginationControls
                        previousValue={prevCount}
                        currentValue={currentCount}
                        goPrevPage={PrevPageHandler}
                        goNextPage={NextPageHandler}
                    />
                )}
            </div>

            {groupedEmails.length === 0 && <Cat />}

            {groupedEmails.map((group) => (
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

            {isMobileDevice && groupedEmails.length !== 0 && (
                <MobilePaginationControls
                    currentValue={currentCount}
                    goPrevPage={PrevPageHandler}
                    goNextPage={NextPageHandler}
                    previousValue={prevCount}
                />
            )}
        </div>
    )
}

export default EmailGroupPage
