import React from "react"
import { useLetterPage } from "./useLetterPage"
import DefaultUserImage from "../../shared/components/DefaultUserImage/DefaultUserImage"
import classes from "./letterPage.module.css"
import { FormatterService } from "../../shared/services/FormatterService"

import {ReactComponent as Arrow} from "../../shared/icons/arrow-sm-up.svg"
import {ReactComponent as Trash} from "../../shared/icons/trash.svg"
import {ReactComponent as Star} from "../../shared/icons/star.svg"
import { RedirectService } from "../../shared/services/RedirectService"

const LetterPage = () => {

    const {mail, DeleteHandler} = useLetterPage()

    // todo: fix this later
    if (!mail) {
        return <>Loading...</>
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.icons}>
                <Arrow onClick={() => RedirectService.back()} className={classes.icon}/>

                <div className={classes.right_side}>
                    <Trash onClick={async () => DeleteHandler()} className={classes.icon}/>
                    <Star className={classes.icon}/>
                </div>
            </div>
            <h1 className={classes.email_subject}>{mail.subject}</h1>
            <div className={classes.email_info}>
                <DefaultUserImage/>
                <div>
                    <div className={classes.email_sender_info}>
                        <p className={classes.email_sender}>{mail.from.mailbox}</p>
                        <p className={classes.email_date}>{FormatterService.formatDate(mail.date_time * 1000)}</p>
                    </div>
                    <p className={classes.recipient_letter}>Кому: {mail.to.mailbox}</p>
                </div>
            </div>
            <div className={classes.email_content} dangerouslySetInnerHTML={{__html: mail.content}} />
        </div>
    )
}

export default LetterPage