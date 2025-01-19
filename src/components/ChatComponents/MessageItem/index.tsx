import UserAvatar from "./UserAvatar";
import MessageContent from "./MessageContent";
import MessageTitle from "./MessageTitle";
import MessageOptions from "./MessageOptions";

import { MessageItemProps } from "./types";

import s from "./MessageItem.module.scss";
import { FC } from "react";
import Link from "next/link";

const MessageItem: FC<MessageItemProps> = ({
    userId,
    userImage,
    userName,

    yourId,

    messageText,

    optionTitle,
    options,

    type,

    theme,
}) => {
    const isFromMe = userId === yourId;
    const className = `${s.message}${isFromMe ? ` ${s.fromMe}` : ""}`;

    if (type === "TYPE_QUIZ") {
        let result = 0;
        options?.map((option) => {
            result += option.votes ? option.votes.length : 0;
        });

        return (
            <>
                <div className={className}>
                    <UserAvatar
                        userId={userId}
                        userName={userName}
                        userImage={userImage}
                        yourId={yourId}
                    />
                    <MessageContent
                        theme={theme}
                        userId={userId}
                        yourId={yourId}
                    >
                        <MessageTitle title={userName} />
                        <MessageOptions
                            optionTitle={optionTitle}
                            options={options}
                            optionsVotes={result}
                            isFromMe={isFromMe}
                            theme={theme}
                        />
                    </MessageContent>
                </div>
            </>
        );
    }

    return (
        <>
            <div className={className}>
                <UserAvatar
                    userId={userId}
                    userName={userName}
                    userImage={userImage}
                    yourId={yourId}
                />
                <MessageContent theme={theme} userId={userId} yourId={yourId}>
                    <MessageTitle title={userName} />
                    {messageText?.includes("http://") ||
                    messageText?.includes("https://") ? (
                        <Link
                            className={s.messageContentTextLink}
                            href={messageText}
                        >
                            {messageText}
                        </Link>
                    ) : (
                        <p className={s.messageContentText}>{messageText}</p>
                    )}
                </MessageContent>
            </div>
        </>
    );
};

export default MessageItem;
