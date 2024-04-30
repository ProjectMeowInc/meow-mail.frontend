import { useGetUserListQuery, useUpdateUserRoleByIdMutation } from "../../entities/User/api/userApi"
import { useEffect, useState } from "react"
import { AlertService } from "../../shared/services/AlertService"
import { useSearchParamsWrapper } from "../../shared/hooks/useSearchParamsWrapper"
import { LogService } from "../../shared/services/LogService"
import { UserRoleType } from "../../entities/User/types/UserRoleType"
import { IOnChangeEvent } from "../../shared/events/IOnChangeEvent"
import { isCorrectError } from "../../shared/utils/hasData"
import { ClientService } from "../../shared/services/ClientService"

const DefaultPage = "1"

export const useAdminUserPage = () => {
    const { setSearchParams, getParamExcept } = useSearchParamsWrapper()
    const pageStr = getParamExcept("page", ["0"]).unwrapOrElse(() => {
        LogService.log(`Error get page STR. Use default value: ${DefaultPage}`, "ERROR")
        return DefaultPage
    })
    const [page, setPage] = useState<number>(Number(pageStr))

    useEffect(() => {
        if (!page) {
            return setSearchParams("page", page.toString())
        }
    }, [page])

    const [updateUserRole, { isSuccess: isUpdateRoleSuccess, error: updateRoleError }] = useUpdateUserRoleByIdMutation()
    const { data: users, error: getUserError } = useGetUserListQuery(page, {
        pollingInterval: 20000,
    })

    const [prevCount, setPrevCount] = useState<number>(1)
    const [currentCount, setCurrentCount] = useState<number>(20)

    const deviceType = ClientService.getClientType()
    const isMobileDevice = ClientService.isMobileDevice(deviceType)

    useEffect(() => {
        if (isCorrectError(getUserError)) {
            return AlertService.error(getUserError.data.message)
        }
    }, [getUserError])

    useEffect(() => {
        if (isUpdateRoleSuccess) {
            return AlertService.success("Роль пользователя успешно обновлена")
        }
    }, [isUpdateRoleSuccess])

    useEffect(() => {
        if (isCorrectError(getUserError)) {
            return AlertService.error(getUserError.data.message)
        }
    }, [getUserError])

    useEffect(() => {
        if (isCorrectError(updateRoleError)) {
            return AlertService.error(updateRoleError.data.message)
        }
    }, [updateRoleError])

    const ChangeHandler = async ({ fieldValue }: IOnChangeEvent, userId: number) => {
        updateUserRole({
            role: fieldValue as UserRoleType,
            target: userId,
        })
    }

    const NextPageHandler = () => {
        if (users && users.count === 20 && users.pages > page) {
            setPage((prevPage) => prevPage + 1)
            setCurrentCount((prevState) => prevState + 20)
            setPrevCount((prevState) => prevState + 20)
        }
    }

    const PrevPageHandler = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1)
            setCurrentCount((prevState) => prevState - 20)
            setPrevCount((prevState) => prevState - 20)
        }
    }

    return {
        users,
        ChangeHandler,
        NextPageHandler,
        PrevPageHandler,
        isMobileDevice,
        prevCount,
        currentCount,
    }
}
