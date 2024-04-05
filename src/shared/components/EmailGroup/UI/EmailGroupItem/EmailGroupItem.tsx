import React, { FC } from "react"
import classes from "./emailGroupItem.module.css"

import Collection from "../../../../icons/collection.svg?react"
import Trash from "../../../../icons/trash.svg?react"
import { useEmailGroupItem } from "./useEmailGroupItem"

interface IEmailGroupItemProps {
    id: number
    name: string
    constrains: {
        from: string
        subject: string
        to: string
    }
}

const EmailGroupItem: FC<IEmailGroupItemProps> = ({id, constrains, name}) => {

    const {DeleteHandler} = useEmailGroupItem()

    return (
        <div className={classes.group}>
            <div>
                <Collection className={classes.icon}/>
                <p>{name}</p>
            </div>

            <Trash onClick={async () => DeleteHandler(id)}/>
        </div>
    )
}

export default EmailGroupItem