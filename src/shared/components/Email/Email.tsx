import React, { FC } from "react"
import classes from "./email.module.css"

import {ReactComponent as Star} from "../../icons/star.svg"
import {ReactComponent as Trash} from "../../icons/trash.svg"
import {ReactComponent as Check} from "../../icons/check.svg"
import { Link } from "react-router-dom"

interface IEmailProps {
    id: number
    isRead: boolean
    subject: string
    from: string
    href: string
}

const Email: FC<IEmailProps> = ({id, subject, isRead, from, href}) => {
    return (
        <Link to={href} className={classes.email}>
            <div className={classes.left_side}>
                <Star className={classes.icon}/>

                <div className={classes.email_from_image}>

                </div>

                <div className={classes.email_info}>
                    <p className={`${classes.email_from}} ${isRead && classes.is_read}`}>{from}</p>
                    <p className={classes.email_subject}>{subject}</p>
                </div>

            </div>
            <div className={classes.right_side}>
                <Trash className={classes.icon}/>
                <Check className={classes.icon}/>
            </div>
        </Link>
    )
}

export default Email