import axios from "axios";
import {Alert} from "react-native";

export const useAuthTab = () => {

    const ClickHandler = () => {
        axios.get("http://localhost:5000/").then(response => {
            Alert.alert(response.data)
        }).catch(error => {
            Alert.alert(error.message)
        })
    }

    return {
        ClickHandler
    }
}