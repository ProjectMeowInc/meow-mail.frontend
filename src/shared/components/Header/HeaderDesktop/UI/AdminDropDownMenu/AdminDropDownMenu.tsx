import React, { FC, useState } from "react"
import classes from "./adminDropDownMenu.module.css"

import Chevron from "../../../../../icons/chevron-down.svg?react"
import Light from "../../../../../icons/light.svg?react"
import AdminDropDownMenuItem from "./UI/AdminDropDownMenuItem/AdminDropDownMenuItem"

interface IProps {
    onClick?: () => void
}

const AdminDropDownMenu: FC<IProps> = ({ onClick }) => {
    const [isActive, setIsActive] = useState<boolean>(false)

    return (
        <div className={classes.wrapper}>
            <div className={classes.button} onClick={() => setIsActive((prevState) => !prevState)}>
                <div className={classes.caption}>
                    <Light />
                    <p>Админ панель</p>
                </div>
                <Chevron className={isActive ? classes.icon_active : classes.icon} />
            </div>

            <div className={isActive ? classes.menu_active : classes.menu}>
                <AdminDropDownMenuItem href={"admin/users?page=1"} onClick={onClick}>
                    Пользователи
                </AdminDropDownMenuItem>

                <AdminDropDownMenuItem href={"admin/dmarc-reports"}>Репорты Dmarc</AdminDropDownMenuItem>
            </div>
        </div>
    )
}

export default AdminDropDownMenu
