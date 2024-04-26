import React, { FC } from "react"
import Button from "../../Button/Button"
import MenuItem from "./UI/MenuItem/MenuItem"
import classes from "./headerDesktop.module.css"

import Mail from "../../../icons/mail-open.svg?react"
import Star from "../../../icons/star.svg?react"
import AirPlane from "../../../icons/paper-airplane.svg?react"
import EmailGroup from "../../EmailGroup/EmailGroup"
import AdminDropDownMenu from "./UI/AdminDropDownMenu/AdminDropDownMenu"
import { useHeaderDesktop } from "./useHeaderDesktop"

interface IHeaderDesktopProps {
    onClickSendButton: () => void
}

const HeaderDesktop: FC<IHeaderDesktopProps> = ({ onClickSendButton }) => {
    const { user, navigate } = useHeaderDesktop()

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
                        <MenuItem href={"/my?page=1?is_received=true"}>
                            <Mail />
                            <p>Входящие</p>
                        </MenuItem>

                        <MenuItem href={"sent?page=1?is_received=false"}>
                            <AirPlane />
                            <p>Отправленные</p>
                        </MenuItem>

                        {user?.role === "Root" || user?.role === "Administrator" ? <AdminDropDownMenu /> : <></>}
                    </div>

                    <EmailGroup />
                </div>

                <Button onClick={() => navigate("settings")} type={2}>
                    Настройки почты
                </Button>
            </div>
        </header>
    )
}

export default HeaderDesktop
