import React from "react"
import { useEmailImage } from "./useEmailImage"
import styles from "./emailImage.module.css"

interface IEmailImageProps {
    from: string
}

export const EmailImage: React.FC<IEmailImageProps> = ({ from }) => {
    const { color } = useEmailImage(from)

    return (
        <div style={{ backgroundColor: `#${color}` }} className={styles.image}>
            {from.charAt(0)}
        </div>
    )
}
