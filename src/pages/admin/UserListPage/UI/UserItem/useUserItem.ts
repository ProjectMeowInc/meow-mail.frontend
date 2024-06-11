import { UserRoleType } from "../../../../../entities/User/types/UserRoleType"

export const useUserItem = (userRole: UserRoleType) => {
    const roleArray: UserRoleType[] = ["NonActive", "User", "Administrator", "Root"]
    const sortedRoleArray = roleArray.filter((role) => role !== userRole)

    return {
        sortedRoleArray,
    }
}
