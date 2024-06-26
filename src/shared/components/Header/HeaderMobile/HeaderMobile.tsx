import React, { FC } from "react"
import classes from "./headerMobile.module.css"
import Logo from "../../Logo/Logo"
import MenuItem from "./UI/MenuItem/MenuItem"
import Button from "../../Button/Button"
import { useHeaderMobile } from "./useHeaderMobile"

import pen from "../../../icons/pencil.svg"
import mail from "../../../icons/mail-open-white.svg"
import sent from "../../../icons/paper-airplane-white.svg"
import AdminDropDownMenu from "../HeaderDesktop/UI/AdminDropDownMenu/AdminDropDownMenu"
import EmailGroup from "../../EmailGroup/EmailGroup"

interface IHeaderMobile {
    onClickSendButton: () => void
}

const HeaderMobile: FC<IHeaderMobile> = ({ onClickSendButton }) => {
    const { isActive, setIsActive, navigate, menuRef, user, QuitHandler } = useHeaderMobile()

    return (
        <header className={classes.header_mobile} ref={menuRef}>
            <div className={classes.left_side}>
                <Logo />

                <div>
                    <div className={classes.menu_button} onClick={() => setIsActive((prevState) => !prevState)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <div className={isActive ? classes.menu__active : classes.menu}>
                        <div className={classes.menu_list}>
                            <MenuItem
                                icon={mail}
                                href={"/my?page=1&is_received=true"}
                                onClick={() => setIsActive(false)}
                            >
                                Входящее
                            </MenuItem>
                            <MenuItem
                                icon={sent}
                                href={"sent?page=1&is_received=false"}
                                onClick={() => setIsActive(false)}
                            >
                                Отправленные
                            </MenuItem>

                            {user?.role === "Root" || user?.role === "Administrator" ? (
                                <AdminDropDownMenu onClick={() => setIsActive(false)} />
                            ) : (
                                <></>
                            )}

                            <EmailGroup />
                        </div>
                        <Button onClick={() => navigate("settings")} type={2}>
                            Настройки
                        </Button>
                    </div>
                </div>
            </div>

            <div className={classes.right_side}>
                <img onClick={onClickSendButton} src={pen} alt={"pen icon"} />

                <p onClick={QuitHandler}>Выйти</p>
            </div>
        </header>
    )
}

export default HeaderMobile
