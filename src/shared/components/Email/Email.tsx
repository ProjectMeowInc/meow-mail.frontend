import React, { FC } from "react"
import classes from "./email.module.css"
import { Link } from "react-router-dom"
import { useEmail } from "./useEmail"

import {ReactComponent as Star} from "../../icons/star.svg"
import {ReactComponent as Trash} from "../../icons/trash.svg"
import {ReactComponent as Check} from "../../icons/check.svg"

interface IEmailProps {
    id: number
    isRead: boolean
    subject: string
    from: string
    href: string
}

const Email: FC<IEmailProps> = ({id, subject, isRead, from, href}) => {

    const {CheckHandler, DeleteHandler} = useEmail()

    return (
        <div className={classes.email}>
            <div className={classes.left_side}>
                <Star className={classes.icon}/>

                <div className={classes.email_from_image}>

                </div>

                <Link to={href} className={classes.email_info}>
                    <p className={`${classes.email_from} ${isRead && classes.is_read}`}>{from}</p>
                    <p className={classes.email_subject}>{subject}</p>
                </Link>

            </div>
            <div className={classes.right_side}>
                <Trash className={classes.icon} onClick={ async () => DeleteHandler(id)}/>
                <Check className={classes.icon} onClick={() => CheckHandler(id, isRead)}/>
            </div>
        </div>
    )
}

export default Email