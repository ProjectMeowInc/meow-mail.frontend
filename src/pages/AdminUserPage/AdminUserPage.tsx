import React from "react"
import { useAdminUserPage } from "./useAdminUserPage"
import Preloader from "../../shared/components/Preloader/Preloader"
import UserItem from "./UI/UserItem/UserItem"
import classes from "./adminUserPage.module.css"
import PaginationControls from "../UI/PaginationControls/PaginationControls"
import MobilePaginationControls from "../UI/MobilePaginationControls/MobilePaginationControls"
import Cat from "../UI/Cat/Cat"

const AdminUserPage = () => {
    const { users, ChangeHandler, PrevPageHandler, NextPageHandler, prevCount, currentCount, isMobileDevice } =
        useAdminUserPage()

    if (!users) {
        return <Preloader />
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                {!isMobileDevice && users.items.length !== 0 && (
                    <PaginationControls
                        previousValue={prevCount}
                        currentValue={currentCount}
                        goPrevPage={PrevPageHandler}
                        goNextPage={NextPageHandler}
                    />
                )}
            </div>

            <div className={classes.users}>
                {users.items.map((user) => (
                    <UserItem key={user.id} id={user.id} onChange={ChangeHandler} role={user.role} login={user.login} />
                ))}
            </div>

            {users.items.length === 0 && <Cat />}

            {isMobileDevice && users.items.length !== 0 && (
                <MobilePaginationControls
                    currentValue={currentCount}
                    goPrevPage={PrevPageHandler}
                    goNextPage={NextPageHandler}
                    previousValue={prevCount}
                />
            )}
        </div>
    )
}

export default AdminUserPage
