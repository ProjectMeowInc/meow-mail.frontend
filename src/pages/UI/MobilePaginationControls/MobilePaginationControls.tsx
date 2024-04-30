import React, { FC } from "react"
import classes from "./mobilePaginationControls.module.css"

import Left from "../../../shared/icons/chevron-left.svg?react"
import Right from "../../../shared/icons/chevron-right.svg?react"

interface IProps {
    currentValue: number
    previousValue: number
    goNextPage?: () => void
    goPrevPage?: () => void
}

const MobilePaginationControls: FC<IProps> = ({ currentValue, previousValue, goPrevPage, goNextPage }) => {
    return (
        <div className={classes.controls_mobile}>
            <div className={classes.prev_page_button} onClick={goPrevPage}>
                <Left className={classes.icon} />
                <p>Назад</p>
            </div>
            <p className={classes.page}>
                {previousValue} - {currentValue}
            </p>
            <div className={classes.next_page_button} onClick={goNextPage}>
                <p>Вперед</p>
                <Right className={classes.icon} />
            </div>
        </div>
    )
}

export default MobilePaginationControls
