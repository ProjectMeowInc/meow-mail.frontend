import React from "react"
import { useSentEmailsPage } from "./useSentEmailsPage"
import Preloader from "../../shared/components/Preloader/Preloader"
import Email from "../../shared/components/Email/Email"
import classes from "../LettersPage/lettersPage.module.css"
import Input from "../../shared/components/Input/Input"
import PaginationControls from "../UI/PaginationControls/PaginationControls"
import MobilePaginationControls from "../UI/MobilePaginationControls/MobilePaginationControls"

import Search from "../../shared/icons/search.svg?react"

const SentEmailsPage = () => {
    const { groupedEmails, setSubject, NextPageHandler, PrevPageHandler, prevCount, currentCount, isMobileDevice } =
        useSentEmailsPage()

    if (!groupedEmails) {
        return <Preloader />
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <Input
                    name={"subject"}
                    style={{
                        width: isMobileDevice ? "100%" : "40%",
                    }}
                    placeholder={"Начните вводить"}
                    type={"text"}
                    inputType={2}
                    icon={<Search />}
                    onChange={({ fieldValue }) => setSubject(fieldValue)}
                />

                {!isMobileDevice && (
                    <PaginationControls
                        previousValue={prevCount}
                        currentValue={currentCount}
                        goPrevPage={PrevPageHandler}
                        goNextPage={NextPageHandler}
                    />
                )}
            </div>

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

            {isMobileDevice && (
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

export default SentEmailsPage
