import {StyleSheet, Text, View} from "react-native";
import {COLORS} from "../../../../consts/COLORS";

export const WelcomeMessage = () => {
    return (
        <View>
            <Text style={styles.text}>
                Hello!
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: COLORS.white,
        fontSize: 30
    }
})