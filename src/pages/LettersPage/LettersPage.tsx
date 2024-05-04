import React from "react"
import { useLettersPage } from "./useLettersPage"
import Email from "../../shared/components/Email/Email"
import classes from "./lettersPage.module.css"
import Input from "../../shared/components/Input/Input"
import Search from "../../shared/icons/search.svg?react"
import Preloader from "../../shared/components/Preloader/Preloader"
import PaginationControls from "../UI/PaginationControls/PaginationControls"
import MobilePaginationControls from "../UI/MobilePaginationControls/MobilePaginationControls"
import Cat from "../UI/Cat/Cat"

const LettersPage = () => {
    const { groupedEmails, PrevPageHandler, NextPageHandler, prevCount, currentCount, isMobileDevice, setSubject } =
        useLettersPage()

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

export default LettersPage
