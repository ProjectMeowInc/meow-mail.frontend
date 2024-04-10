import React, { useState } from "react"
import classes from "./adminDropDownMenu.module.css"

import Chevron from "../../../../../icons/chevron-down.svg?react"
import Light from "../../../../../icons/light.svg?react"
import AdminDropDownMenuItem from "./UI/AdminDropDownMenuItem/AdminDropDownMenuItem"

const AdminDropDownMenu = () => {
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
                <AdminDropDownMenuItem href={"/admin/users"}>Пользователи</AdminDropDownMenuItem>
            </div>
        </div>
    )
}

export default AdminDropDownMenu
