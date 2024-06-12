import React, { FC } from "react"
import classes from "./filePreview.module.css"

interface IFilePreviewProps {
    name: string
    onClick?: () => void
    ext: string | null
}

const FilePreview: FC<IFilePreviewProps> = ({ name, onClick, ext }) => {
    return (
        <div className={classes.document} onClick={onClick}>
            <div className={classes.caption}>
                <p className={classes.name}>{name}</p>
            </div>
            <div className={classes.extension_wrapper}>
                <p className={classes.extension}>.{ext}</p>
            </div>
        </div>
    )
}

export default FilePreview
