import React from "react"
import classes from "./emailGroup.module.css"
import { useEmailGroup } from "./useEmailGroup"
import EmailGroupItem from "./UI/EmailGroupItem/EmailGroupItem"

import Down from "../../icons/chevron-down.svg?react"
import Filter from "../../icons/filter.svg?react"
import Preloader from "../Preloader/Preloader"

const EmailGroup = () => {

    const {setIsOpen, isOpen, groups} = useEmailGroup()

    if (!groups) {
        return <Preloader/>
    }

    return (
        <div className={classes.menu}>
            <div className={classes.button} onClick={() => setIsOpen(prevState => !prevState)}>
                <div className={classes.button_text}>
                    <Filter/>
                    <p>Группы писем</p>
                </div>
                <Down className={isOpen ? classes.down_active : classes.down}/>
            </div>

            <div className={isOpen ? classes.groups_active : classes.groups}>
                <div className={classes.create_button}>
                    <p>Добавить новую группу</p>
                </div>
                {groups.items.map(group => (
                    <EmailGroupItem
                        key={group.id}
                        id={group.id}
                        name={group.name}
                        constrains={group.constrains}
                    />
                ))}
            </div>
        </div>
    )
}

export default EmailGroup