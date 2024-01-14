import {useFirstLoadingAsync} from "../../../../shared/hooks/useFirstLoading";
import axios from "axios";
import {ApiUrl} from "../../../../consts/VARS";
import {useState} from "react";

type ServerStatusType = "Ok" | "InCheck" | "Error"

export const useServerStatus = () => {
    const [serverState, setServerState] = useState<ServerStatusType>("InCheck")


    useFirstLoadingAsync(async () => {
        // todo: change to health check
        try {
            const response = await axios.get(ApiUrl)
            setServerState("Ok")
        }
        catch (err) {
            setServerState("Error")
        }
    })

    return {
        serverState
    }
}