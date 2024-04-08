import React, { FC } from "react"
import classes from "./emailGroupItem.module.css"

import Collection from "../../../../icons/collection.svg?react"
import Trash from "../../../../icons/trash.svg?react"
import { useEmailGroupItem } from "./useEmailGroupItem"
import { Link } from "react-router-dom"

interface IEmailGroupItemProps {
    id: number
    name: string
    constrains: {
        from: string
        subject: string
        to: string
    }
}

const EmailGroupItem: FC<IEmailGroupItemProps> = ({id, name}) => {

    const {DeleteHandler} = useEmailGroupItem()

    return (
        <div className={classes.group}>
            <Link to={`email-group/${id}?page=1`} className={classes.caption}>
                <Collection className={classes.icon}/>
                <p>{name}</p>
            </Link>

            <Trash className={classes.icon} onClick={async () => DeleteHandler(id)}/>
        </div>
    )
}

export default EmailGroupItem