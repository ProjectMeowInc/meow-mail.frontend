import React from "react"
import classes from "./emailGroup.module.css"

import Down from "../../icons/chevron-down.svg?react"
import Filter from "../../icons/filter.svg?react"

const EmailGroup = () => {


    return (
        <div className={classes.menu}>
            <div className={classes.button}>
                <div className={classes.button_text}>
                    <Filter/>
                    <p>Группы писем</p>
                </div>
                <Down/>
            </div>

            <div>

            </div>
        </div>
    )
}

export default EmailGroup