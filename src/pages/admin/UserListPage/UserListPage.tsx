import { useUserListPage } from "./useUserListPage"
import UserItem from "./UI/UserItem/UserItem"
import classes from "./userListPage.module.css"
import Preloader from "../../../shared/components/Preloader/Preloader"
import PaginationControls from "../../UI/PaginationControls/PaginationControls"
import EmptyInboxPlaceholder from "../../UI/EmptyInboxPlaceholder/EmptyInboxPlaceholder"
import MobilePaginationControls from "../../UI/MobilePaginationControls/MobilePaginationControls"

const UserListPage = () => {
    const { users, ChangeHandler, PrevPageHandler, NextPageHandler, prevCount, currentCount, isMobileDevice } =
        useUserListPage()

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
                    <UserItem
                        key={user.id}
                        id={user.id}
                        onChange={ChangeHandler}
                        role={user.role}
                        login={user.login}
                        mailbox={user.mailbox?.address}
                    />
                ))}
            </div>

            {users.items.length === 0 && <EmptyInboxPlaceholder />}

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

export default UserListPage
