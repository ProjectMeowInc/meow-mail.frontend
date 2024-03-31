import { EMAIL_COLORS } from "../../../consts"

export const useEmailImage = (from: string) => {
    const getColor = (): string => {
        const hash = createHashFromString(from)
        const hashIndex = hash % EMAIL_COLORS.length
        const color = EMAIL_COLORS[hashIndex]
        return color
    }

    const createHashFromString = (str: string): number => {
        let hash = 0
        let i = 0
        let chr

        if (str.length === 0) {
            return hash
        }

        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i)
            hash = (hash << 5) - hash + chr
            hash |= 0
        }

        if (hash < 0) {
            return -hash
        }

        return hash
    }

    const color = getColor()

    return {
        color,
    }
}
