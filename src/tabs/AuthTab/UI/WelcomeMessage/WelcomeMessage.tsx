import {StyleSheet, Text} from "react-native";
import {COLORS} from "../../../../consts/COLORS";
import {RALEWAY} from "../../../../consts/RALEWAY";
import {HEADERS} from "../../../../consts/HEADERS";

export const WelcomeMessage = () => {
    return (
        <Text style={styles.text}>
            Добро пожаловать!
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        color: COLORS.white,
        fontSize: HEADERS.h1,
        fontFamily: RALEWAY.Raleway_400Regular
    }
})