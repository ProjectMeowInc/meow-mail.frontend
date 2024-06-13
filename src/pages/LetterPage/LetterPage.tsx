import React from "react"
import { useLetterPage } from "./useLetterPage"
import classes from "./letterPage.module.css"
import { FormatterService } from "../../shared/services/FormatterService"
import { RedirectService } from "../../shared/services/RedirectService"

import Arrow from "../../shared/icons/arrow-sm-up.svg?react"
import Trash from "../../shared/icons/trash.svg?react"
import { MailboxBadge } from "../../shared/components/MailboxBadge/MailboxBadge"
import Preloader from "../../shared/components/Preloader/Preloader"
import { EmailImage } from "../../shared/components/EmailImage/EmailImage"
import FilePreview from "../../shared/components/FilePreview/FilePreview"
import { BASE_API_URL } from "../../consts"

const LetterPage = () => {
    const { mail, DeleteHandler, images, files, DownloadHandler } = useLetterPage()

    // todo: fix this later
    if (!mail) {
        return <Preloader />
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.icons}>
                <Arrow onClick={() => RedirectService.back()} className={classes.icon} />

                <div className={classes.right_side}>
                    <Trash onClick={async () => DeleteHandler()} className={classes.icon} />
                </div>
            </div>
            <h1 className={classes.email_subject}>{mail.subject}</h1>
            <div className={classes.email_info}>
                <EmailImage from={mail.from.mailbox} />
                <div>
                    <div className={classes.email_sender_info}>
                        <div className={classes.email_sender}>
                            <p>{mail.from.mailbox}</p>
                            <MailboxBadge type={mail.from.type} />
                        </div>
                        <p className={classes.email_date}>{FormatterService.formatDate(mail.date_time * 1000)}</p>
                    </div>
                    <p className={classes.recipient_letter}>Кому: {mail.to.mailbox}</p>
                </div>
            </div>
            <div
                className={classes.email_content}
                dangerouslySetInnerHTML={{
                    __html: `<style>

                                .content {
                                    word-break: break-all;
                                }
                                .content * {
                                    color: var(--white);
                                    background-color: var(--thirth);
                                    font-size: 18px;
                                }
                            </style>
                            <div class="content">${mail.content.split("&nbsp;").join("")}</div>`,
                }}
            />

            <div className={classes.images}>
                {images.map((image) => (
                    <a
                        key={image.download_key}
                        target={"_blank"}
                        href={BASE_API_URL + `v1/email/download/${image.download_key}`}
                    >
                        <img
                            className={classes.img}
                            src={BASE_API_URL + `v1/email/download/${image.download_key}`}
                            alt=""
                        />
                    </a>
                ))}
            </div>

            <div>
                {files.length > 0 && <p className={classes.caption}>Прикрепленные файлы</p>}
                <div className={classes.files}>
                    {files.map((file) => (
                        <FilePreview
                            name={file.name}
                            key={file.download_key}
                            ext={file.ext}
                            onClick={async () => await DownloadHandler(file.download_key, file.name)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LetterPage
