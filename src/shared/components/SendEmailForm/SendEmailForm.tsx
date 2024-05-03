import React, { FC } from "react"
import classes from "./sendEmailForm.module.css"

import Close from "../../icons/plus-sm.svg?react"
import Input from "../Input/Input"
import Button from "../Button/Button"
import { useSendEmailForm } from "./useSendEmailForm"
import { Editor } from "mate-ts"

interface ISendEmailFormProps {
    closeForm: () => void
}

const SendEmailForm: FC<ISendEmailFormProps> = ({ closeForm }) => {
    const { SubmitHandler, ChangeHandler } = useSendEmailForm(closeForm)

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <h1 className={classes.caption}>Новое письмо</h1>
                <Close className={classes.icon} onClick={closeForm} />
            </div>

            <form className={classes.form} onSubmit={SubmitHandler}>
                <div className={classes.fields}>
                    <Input
                        type={"email"}
                        name={"to"}
                        inputType={3}
                        placeholder={"Введите почту"}
                        fieldName={"Кому"}
                        onChange={ChangeHandler}
                    />

                    <Input
                        type={"text"}
                        name={"subject"}
                        inputType={3}
                        placeholder={"Введите тему"}
                        fieldName={"Тема"}
                        onChange={ChangeHandler}
                    />

                    <Editor submitHandler={() => {}} />
                </div>

                <Button styles={{ width: "40%" }} type={1}>
                    Отправить
                </Button>
            </form>
        </div>
    )
}

export default SendEmailForm
