import { Bounce, toast } from "react-toastify"

export class AlertService {
    public static error(message: string) {
        toast.error(message, {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Bounce,
        })
    }

    public static success(message: string) {
        toast.success(message, {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Bounce,
        })
    }
}
