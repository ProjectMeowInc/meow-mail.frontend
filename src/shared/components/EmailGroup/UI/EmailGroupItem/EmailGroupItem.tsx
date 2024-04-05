import React, { FC } from "react"
import classes from "./emailGroupItem.module.css"

import Collection from "../../../../icons/collection.svg?react"

interface IEmailGroupItemProps {
    id: number
    name: string
    constrains: {
        from: string
        subject: string
        to: string
    }
}

const EmailGroupItem: FC<IEmailGroupItemProps> = ({name}) => {
    return (
        <div className={classes.group}>
            <Collection className={classes.icon}/>
            <p>{name}</p>
        </div>
    )
}

export default EmailGroupItem