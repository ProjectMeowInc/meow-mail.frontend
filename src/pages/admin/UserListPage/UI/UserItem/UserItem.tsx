import React, { FC } from "react"
import { UserRoleType } from "../../../../entities/User/types/UserRoleType"
import classes from "./userItem.module.css"
import { useUserItem } from "./useUserItem"
import { IOnChangeEvent } from "../../../../shared/events/IOnChangeEvent"

interface IUserItemProps {
    id: number
    role: UserRoleType
    login: string
    mailbox?: string
    onChange: (data: IOnChangeEvent, userId: number) => void
}

const UserItem: FC<IUserItemProps> = ({ role, login, onChange, id, mailbox }) => {
    const { sortedRoleArray } = useUserItem(role)

    return (
        <div className={classes.wrapper}>
            <p className={classes.login}>{login}</p>
            <p className={classes.mailbox}>{mailbox}</p>
            <select
                className={classes.select}
                name={"role"}
                onChange={(e) =>
                    onChange(
                        {
                            fieldName: e.target.name,
                            fieldValue: e.target.value,
                        },
                        id,
                    )
                }
            >
                <option value={role}>{role}</option>
                {sortedRoleArray.map((role) => (
                    <option key={role} value={role}>
                        {role}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default UserItem
