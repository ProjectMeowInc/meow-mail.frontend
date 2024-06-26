import React, { FC } from "react"
import classes from "./emailGroup.module.css"
import { useEmailGroup } from "./useEmailGroup"
import EmailGroupItem from "./UI/EmailGroupItem/EmailGroupItem"
import Down from "../../icons/chevron-down.svg?react"
import Filter from "../../icons/filter.svg?react"
import CreateEmailGroupModal from "./UI/CreateEmailGroupModal/CreateEmailGroupModal"
import Cross from "../../icons/plus-sm.svg?react"
import EmptyTag from "../EmptyTag/EmptyTag"

interface IProps {
    onClick?: () => void
}

const EmailGroup: FC<IProps> = ({ onClick }) => {
    const { setIsOpen, isOpen, groups, setModalIsOpen, modalIsOpen } = useEmailGroup()

    if (!groups) {
        return <EmptyTag />
    }

    return (
        <div className={classes.menu}>
            {modalIsOpen && <CreateEmailGroupModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />}
            <div className={classes.button} onClick={() => setIsOpen((prevState) => !prevState)}>
                <div className={classes.button_text}>
                    <Filter />
                    <p>Группы писем</p>
                </div>
                <Down className={isOpen ? classes.down_active : classes.down} />
            </div>

            <div className={isOpen ? classes.groups_active : classes.groups}>
                <div className={classes.create_button} onClick={() => setModalIsOpen(true)}>
                    <p>Добавить новую группу</p>
                    <Cross className={classes.icon} />
                </div>
                {groups.items.map((group) => (
                    <EmailGroupItem onClick={onClick} key={group.id} id={group.id} name={group.name} />
                ))}
            </div>
        </div>
    )
}

export default EmailGroup
