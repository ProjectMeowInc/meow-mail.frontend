import React, { FC } from "react"
import classes from "./email.module.css"
import { Link } from "react-router-dom"
import { useEmail } from "./useEmail"
import { EmailImage } from "../EmailImage/EmailImage"
import { MailboxBadge } from "../MailboxBadge/MailboxBadge"
import { MailboxType } from "../../../entities/Email/models/type/MailboxType"

import Star from "../../icons/star.svg?react"
import Trash from "../../icons/trash.svg?react"
import Eye from "../../icons/eye.svg?react"
import EyeOff from "../../icons/eye-off.svg?react"

interface IEmailProps {
    id: number
    isRead: boolean
    subject: string
    from: { address: string; type: MailboxType }
    href: string
}

const Email: FC<IEmailProps> = ({ id, subject, isRead, from, href }) => {
    const {
        CheckHandler,
        DeleteHandler,
        isDesktopDevice,
        TouchEndHandler,
        TouchStartHandler,
        moveToucheX,
        TouchMoveHandler,
    } = useEmail()

    return (
        <div className={classes.email_wrapper}>
            <div className={classes.block}>
                <Star className={classes.email_icon_wrapper} />
                <Trash className={classes.email_icon_wrapper} onClick={async () => DeleteHandler(id)} />
            </div>
            <div
                style={{
                    transform: `translateX(${moveToucheX}px)`,
                }}
                className={classes.email}
                onTouchStart={TouchStartHandler}
                onTouchMove={TouchMoveHandler}
                onTouchEnd={TouchEndHandler}
            >
                <div className={classes.left_side}>
                    {isDesktopDevice && <Star className={classes.icon} />}

                    <EmailImage from={from.address} />

                    <Link to={href} className={classes.email_info}>
                        <div className={`${classes.email_from} ${isRead && classes.is_read}`}>
                            <p>{from.address}</p>
                            <MailboxBadge type={from.type} />
                        </div>
                        <p className={classes.email_subject}>{subject}</p>
                    </Link>
                </div>
                <div className={classes.right_side}>
                    {isDesktopDevice && <Trash className={classes.icon} onClick={async () => DeleteHandler(id)} />}
                    {isRead ? (
                        <EyeOff className={classes.icon} onClick={() => CheckHandler(id, isRead)} />
                    ) : (
                        <Eye className={classes.icon} onClick={() => CheckHandler(id, isRead)} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Email
