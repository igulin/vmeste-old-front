import { FC, forwardRef, HTMLAttributes, ReactNode, RefObject } from "react";

import s from "./ApplicationChatWrapper.module.scss";

interface IApplicationChatWrapper extends HTMLAttributes<HTMLDivElement>{
    children: ReactNode;
}

const ApplicationChatWrapper: FC<IApplicationChatWrapper> = ({children}) => {
    return <div className={s.wrapper}>{children}</div>
}

export default ApplicationChatWrapper;
