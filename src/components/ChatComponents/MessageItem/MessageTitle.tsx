import React from "react";

import s from "./MessageItem.module.scss";

interface IMessageTitle {
    title: string;
}

const MessageTitle: React.FC<IMessageTitle> = ({ title }) => {
    return <h5 className={s.messageContentName}>{title}</h5>;
};

export default MessageTitle;
