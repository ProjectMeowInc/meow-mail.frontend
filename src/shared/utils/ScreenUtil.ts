import {Dimensions} from "react-native";

export class ScreenUtil {
    public static calculateWindowHeightPercent(percent: number): number {
        if (percent > 100 || percent < 0) {
            throw new Error("Невалидный процент")
        }

        return Dimensions.get("window").height / 100 * percent
    }
}