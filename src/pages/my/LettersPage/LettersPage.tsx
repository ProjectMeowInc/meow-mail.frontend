import React from "react"
import { useAppSelector } from "../../../store"

const LettersPage = () => {

    const userData = useAppSelector(state => state.user.data)

    console.log(userData)

    return (
        <div>
            <p>{userData && userData.login}</p>
            <p>asdasd </p>
        </div>
    )
}

export default LettersPage