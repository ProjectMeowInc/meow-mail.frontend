import React from "react"
import classes from "./cat.module.css"

import CatImage from "../../../shared/images/cat.png"

const Cat = () => {
    return (
        <div className={classes.cat__wrapper}>
            <img src={CatImage} className={classes.cat} alt={"cool cat"} />
            <p>Здесь пока ничего нет</p>
        </div>
    )
}

export default Cat
