import React from "react"
import { useAdminUserPage } from "./useAdminUserPage"
import Preloader from "../../shared/components/Preloader/Preloader"
import UserItem from "./UI/UserItem/UserItem"

const AdminUserPage = () => {
    const { users, ChangeHandler } = useAdminUserPage()

    if (!users) {
        return <Preloader />
    }

    return (
        <div>
            {users.items.map((user) => (
                <UserItem key={user.id} id={user.id} onChange={ChangeHandler} role={user.role} login={user.login} />
            ))}
        </div>
    )
}

export default AdminUserPage
