import React, { FC } from "react"
import classes from "./paginationControls.module.css"

import Left from "../../../shared/icons/chevron-left.svg?react"
import Right from "../../../shared/icons/chevron-right.svg?react"

interface IProps {
    currentValue: number
    previousValue: number
    goNextPage?: () => void
    goPrevPage?: () => void
}

const PaginationControls: FC<IProps> = ({ currentValue, previousValue, goPrevPage, goNextPage }) => {
    return (
        <div className={classes.wrapper}>
            <Left className={classes.icons} onClick={goPrevPage} />
            <p>
                {previousValue} - {currentValue}
            </p>
            <Right className={classes.icons} onClick={goNextPage} />
        </div>
    )
}

export default PaginationControls
