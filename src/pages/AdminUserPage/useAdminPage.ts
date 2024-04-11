import { useGetUserListQuery, useUpdateUserRoleByIdMutation } from "../../entities/User/api/userApi"
import { useEffect, useState } from "react"
import { AlertService } from "../../shared/services/AlertService"
import { useSearchParamsWrapper } from "../../shared/hooks/useSearchParamsWrapper"
import { LogService } from "../../shared/services/LogService"
import { UserRoleType } from "../../entities/User/types/UserRoleType"
import { IOnChangeEvent } from "../../shared/events/IOnChangeEvent"

const DefaultPage = "1"

export const useAdminPage = () => {
    const { setSearchParams, getParamExcept } = useSearchParamsWrapper()
    const pageStr = getParamExcept("page", ["0"]).unwrapOrElse(() => {
        LogService.log(`Error get page STR. Use default value: ${DefaultPage}`, "ERROR")
        return DefaultPage
    })
    const [pageNumber] = useState<number>(Number(pageStr))

    useEffect(() => {
        if (!pageNumber) {
            return setSearchParams("page", pageNumber.toString())
        }
    }, [pageNumber])

    const [updateUserRole, { isSuccess: isUpdateRoleSuccess, error: updateRoleError }] = useUpdateUserRoleByIdMutation()
    const { data: users, error: getUserError } = useGetUserListQuery(pageNumber, {
        pollingInterval: 20000,
    })

    useEffect(() => {
        if (getUserError && "data" in getUserError) {
            return AlertService.error(getUserError.data.message)
        }
    }, [getUserError])

    useEffect(() => {
        if (isUpdateRoleSuccess) {
            return AlertService.success("Роль пользователя успешно обновлена")
        }
    }, [isUpdateRoleSuccess])

    useEffect(() => {
        if (getUserError && "data" in getUserError) {
            return AlertService.error(getUserError.data.message)
        }
    }, [getUserError])

    useEffect(() => {
        if (updateRoleError && "data" in updateRoleError) {
            return AlertService.error(updateRoleError.data.message)
        }
    }, [updateRoleError])

    const ChangeHandler = async ({ fieldValue }: IOnChangeEvent, userId: number) => {
        console.log({
            role: fieldValue as UserRoleType,
            target: userId,
        })
        updateUserRole({
            role: fieldValue as UserRoleType,
            target: userId,
        })
    }

    return {
        users,
        ChangeHandler,
    }
}
