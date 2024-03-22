import React, { FC } from "react"
import classes from "./headerMobile.module.css"
import Logo from "../../Logo/Logo"
import MenuItem from "./UI/MenuItem/MenuItem"
import Button from "../../Button/Button"
import { useHeaderMobile } from "./UI/useHeaderMobile"

import search from "../../../icons/search-white.svg"
import pen from "../../../icons/pencil.svg"
import mail from "../../../icons/mail-open-white.svg"
import start from "../../../icons/star-white.svg"
import sent from "../../../icons/paper-airplane-white.svg"
import DefaultUserImage from "../../DefaultUserImage/DefaultUserImage"

interface IHeaderMobile {
    onClickSendButton: () => void
}

const HeaderMobile: FC<IHeaderMobile> = ({onClickSendButton}) => {

    const {isActive, setIsActive, navigate, menuRef} = useHeaderMobile()

    return (
        <header className={classes.header_mobile} ref={menuRef}>
            <div className={classes.left_side}>
                <Logo/>

                <div>
                    <div className={classes.menu_button} onClick={() => setIsActive(prevState => !prevState)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <div className={isActive ? classes.menu__active : classes.menu}>
                        <div className={classes.menu_list}>
                            <MenuItem icon={mail} href={""} >Входящее</MenuItem>
                            <MenuItem icon={start} href={""}>Избранное</MenuItem>
                            <MenuItem icon={sent} href={""}>Отправленные</MenuItem>
                        </div>
                        <Button onClick={() => navigate("settings")} type={2}>Настройки</Button>
                    </div>
                </div>
            </div>

            <div className={classes.right_side}>
                <img src={search} alt={"search icon"} />
                <img onClick={onClickSendButton} src={pen} alt={"pen icon"} />

                <DefaultUserImage/>
            </div>
        </header>
    )
}

export default HeaderMobile