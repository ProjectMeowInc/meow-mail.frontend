import {StyleSheet, Text, View} from "react-native";
import {useServerStatus} from "./useServerStatus";
import {COLORS} from "../../../../consts/COLORS";

export const ServerStatus = () => {
    const {serverState} = useServerStatus()

    const getFriendlyStatusText = (): string => {
        switch (serverState) {
            case "Ok":
                return "Ок"
            case "InCheck":
                return "Загрузка..."
            case "Error":
                return "Ошибка"
        }
    }

    return (
        <View>
            <Text style={styles.text}>
                Статус сервера: {getFriendlyStatusText()}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        color: COLORS.white
    }
})