import React, { FC } from "react"
import classes from "./createEmailGroupModal.module.css"
import Input from "../../../Input/Input"
import Button from "../../../Button/Button"
import { useCreateEmailGroupModal } from "./useCreateEmailGroupModal"

import Cross from "../../../../icons/plus-sm.svg?react"
import EmailBadge from "../../../EmailBadge/EmailBadge"

interface ICreateEmailGroupModal {
    modalIsOpen: boolean
    setModalIsOpen: (value: boolean) => void
}

const CreateEmailGroupModal: FC<ICreateEmailGroupModal> = ({ setModalIsOpen, modalIsOpen }) => {
    const { SubmitHandler, ChangeHandler, emails, DeleteEmailHandler } = useCreateEmailGroupModal(
        modalIsOpen,
        setModalIsOpen,
    )

    return (
        <div className={classes.wrapper}>
            <div className={classes.modal}>
                <div className={classes.caption}>
                    <h1>Создание группы</h1>
                    <Cross
                        className={classes.cross}
                        onClick={() => {
                            setModalIsOpen(false)
                        }}
                    />
                </div>
                <form className={classes.form} onSubmit={SubmitHandler}>
                    <Input
                        name={"name"}
                        placeholder={"Введите название группы"}
                        style={{
                            width: "100p%",
                        }}
                        onChange={ChangeHandler}
                    />

                    <div className={classes.emails}>
                        {emails.map((email, index) => (
                            <EmailBadge key={index} mailbox={email} deleteHandler={() => DeleteEmailHandler(email)} />
                        ))}
                    </div>

                    <Input
                        name={"from"}
                        placeholder={"Введите от кого письмо"}
                        style={{
                            width: "100p%",
                        }}
                        onChange={ChangeHandler}
                    />

                    <Input
                        name={"subject"}
                        placeholder={"Введите тему письма"}
                        style={{
                            width: "100p%",
                        }}
                        onChange={ChangeHandler}
                    />

                    <Button>Создать</Button>
                </form>
            </div>
        </div>
    )
}

export default CreateEmailGroupModal
