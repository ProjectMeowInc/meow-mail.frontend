import React, { FC } from "react"
import classes from "./sendEmailForm.module.css"
import { Editor } from "react-draft-wysiwyg"
import Close from "../../icons/plus-sm.svg?react"
import Input from "../Input/Input"
import Button from "../Button/Button"
import { useSendEmailForm } from "./useSendEmailForm"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

interface ISendEmailFormProps {
    closeForm: () => void
}

const SendEmailForm: FC<ISendEmailFormProps> = ({ closeForm }) => {
    const { SubmitHandler, ChangeHandler, setContent, content } = useSendEmailForm(closeForm)

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

                    <Editor
                        editorState={content}
                        onEditorStateChange={setContent}
                        placeholder={"Начните вводить"}
                        toolbar={{
                            options: ["inline", "fontSize", "list", "textAlign", "history"],
                        }}
                        wrapperClassName={classes.editor_wrapper}
                        toolbarClassName="toolbarClassName"
                        editorStyle={{
                            overflowY: "hidden",
                        }}
                    />
                </div>

                <Button styles={{ width: "40%" }} type={1}>
                    Отправить
                </Button>
            </form>
        </div>
    )
}

export default SendEmailForm
