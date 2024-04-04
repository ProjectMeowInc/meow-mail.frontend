import React, { FC } from "react"
import Button from "../../Button/Button"
import { useAppSelector } from "../../../../store"
import MenuItem from "./UI/MenuItem/MenuItem"
import classes from "./headerDesktop.module.css"

import Mail from "../../../icons/mail-open.svg?react"
import Star from "../../../icons/star.svg?react"
import AirPlane from "../../../icons/paper-airplane.svg?react"
import EmailGroup from "../../EmailGroup/EmailGroup";

interface IHeaderDesktopProps {
    onClickSendButton: () => void
}

const HeaderDesktop: FC<IHeaderDesktopProps> = ({ onClickSendButton }) => {
    const user = useAppSelector((state) => state.user.data)

    return (
        <header className={classes.header}>
            <div className={classes.menu}>
                <div className={classes.menu_items}>
                    <Button type={1} onClick={onClickSendButton}>
                        Написать письмо
                    </Button>
                    <div className={classes.current_mail_info}>
                        <p>Текущая почта</p>
                        <p title={`${user?.login}@projectmeow.ru`} className={classes.current_mail}>
                            {user?.login}@projectmeow.ru
                        </p>
                    </div>

                    <div className={classes.menu_list}>
                        <MenuItem href={"/my"}>
                            <Mail />
                            <p>Входящие</p>
                        </MenuItem>

                        <MenuItem href={"/favorites"}>
                            <Star />
                            <p>Избранные</p>
                        </MenuItem>

                        <MenuItem href={"/sent"}>
                            <AirPlane />
                            <p>Отправленные</p>
                        </MenuItem>
                    </div>

                    <EmailGroup/>
                </div>

                <Button type={2}>Настройки почты</Button>
            </div>
        </header>
    )
}

export default HeaderDesktop
