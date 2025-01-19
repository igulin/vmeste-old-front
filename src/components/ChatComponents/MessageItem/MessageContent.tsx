import React from "react";
import { MessageItemThemeType } from "./types";

import s from "./MessageItem.module.scss";

interface IMessageContent {
    children: React.ReactNode;
    userId: number;
    yourId: number;
    theme?: MessageItemThemeType;
}

const MessageContent: React.FC<IMessageContent> = ({
    children,

    userId,
    yourId,

    theme,
}) => {
    return (
        <div
            className={`${s.messageContent}${
                theme === "white" && userId !== yourId ? ` ${s.white}` : ""
            }`}
        >
            {children}
        </div>
    );
};

export default MessageContent;
