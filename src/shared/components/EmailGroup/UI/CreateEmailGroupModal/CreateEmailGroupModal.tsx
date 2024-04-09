import React, { FC } from "react"
import classes from "./createEmailGroupModal.module.css"
import Input from "../../../Input/Input"
import Button from "../../../Button/Button"
import { useCreateEmailGroupModal } from "./useCreateEmailGroupModal"

import Cross from "../../../../icons/plus-sm.svg?react"

interface ICreateEmailGroupModal {
    modalIsOpen: boolean
    setModalIsOpen: (value: boolean) => void
}

const CreateEmailGroupModal: FC<ICreateEmailGroupModal> = ({setModalIsOpen, modalIsOpen}) => {

    const {ref, SubmitHandler, ChangeHandler} = useCreateEmailGroupModal(modalIsOpen, setModalIsOpen)

    return (
        <div className={classes.wrapper}>
            <div className={classes.modal} ref={ref}>
                <div className={classes.caption}>
                    <h1>Создание группы</h1>
                    <Cross className={classes.cross}/>
                </div>
                <form className={classes.form} onSubmit={SubmitHandler}>
                    <Input
                        name={"name"}
                        placeholder={"Введите название группы"}
                        style={{
                            width: "100p%"
                        }}
                        onChange={ChangeHandler}
                    />
                    <Input
                        name={"from"}
                        placeholder={"Введите от кого письмо"}
                        style={{
                            width: "100p%"
                        }}
                        onChange={ChangeHandler}
                    />

                    <Input
                        name={"subject"}
                        placeholder={"Введите тему письма"}
                        style={{
                            width: "100p%"
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