import { useDeleteEmailByIdMutation, useUpdateEmailStatusMutation } from "../../../entities/Email/api/emailApi"
import { useEffect, useState } from "react"
import { AlertService } from "../../services/AlertService"
import { ClientService } from "../../services/ClientService"
import { TouchEvent } from "react"
import { hasDataInError } from "../../utils/hasData"

export const useEmail = () => {
    const [updateEmailStatus, { error }] = useUpdateEmailStatusMutation()
    const [deleteEmailById, { error: deleteEmailByIdError }] = useDeleteEmailByIdMutation()
    const isDesktopDevice = ClientService.isDesktopDevice(ClientService.getClientType())

    const [touchStart, setTouchStart] = useState<number>(0)
    const [moveToucheX, setMoveToucheX] = useState<number>(0)

    useEffect(() => {
        if (hasDataInError(error)) {
            return AlertService.error(error.data.message)
        }
    }, [error])

    useEffect(() => {
        if (hasDataInError(deleteEmailByIdError)) {
            return AlertService.error(deleteEmailByIdError.data.message)
        }
    }, [deleteEmailByIdError])

    const CheckHandler = async (mailId: number, readStatus: boolean) => {
        await updateEmailStatus({
            mail_id: mailId,
            is_read: !readStatus,
        })
    }

    const DeleteHandler = async (emailId: number) => {
        await deleteEmailById(emailId)
    }

    const TouchStartHandler = (event: TouchEvent<HTMLDivElement>) => {
        setTouchStart(event.changedTouches[0].clientX)
    }

    const TouchMoveHandler = (event: TouchEvent<HTMLDivElement>) => {
        if (event.changedTouches[0].clientX > event.changedTouches[0].clientX - screen.width * 0.3) {
            return
        }

        setMoveToucheX(event.targetTouches[0].clientX)
    }

    const TouchEndHandler = (event: TouchEvent<HTMLDivElement>) => {
        const touchEnd = event.changedTouches[0].clientX

        if (Math.abs(touchStart - touchEnd) < screen.width * 0.2) {
            setMoveToucheX(0)
            return
        }

        if (touchStart > touchEnd) {
            setMoveToucheX(-screen.width * 0.15)
        } else {
            setMoveToucheX(screen.width * 0.15)
        }
    }

    return {
        CheckHandler,
        DeleteHandler,
        isDesktopDevice,
        TouchStartHandler,
        TouchMoveHandler,
        TouchEndHandler,
        moveToucheX,
    }
}
