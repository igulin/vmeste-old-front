"use client";
import { FC, memo, useEffect, useRef, useState } from "react";

import s from "./ApplicationChatMessages.module.scss";
import { MessageItem } from "@/components/ChatComponents";
import { AccessError } from "@/components";
import { useRouter } from "next/router";
import { SocketApi } from "@/api/socket-api";
import useAppSelector from "@/hooks/useAppSelector";
import { selectMessageData } from "@/redux/slices/message/message.slice";

interface IChatMessages {
    userId?: number,
}

const ChatMessages: FC<IChatMessages> = ({ userId }) => {
    // Сделаете интерфейс для сообщений, вместо any[]
    const [messages, setMessages] = useState<any[]>([]);
    const message: any = useAppSelector(selectMessageData);
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        ref.current && window.scrollBy(0, ref.current.scrollHeight);
    }, [messages]);

    useEffect(() => {
        if (router.isReady) {
            if (message) {
                setMessages((prev) => [...prev, message]);
                setTimeout(() => {
                    ref.current && window.scrollBy(0, ref.current.scrollHeight);
                }, 30);
            }
            SocketApi.createConnection(String(router.query.id));
            SocketApi.socket?.emit("message:fetch-update", Number(router.query.id));
            SocketApi.socket?.on("message:update", (data) => {
                setMessages([...data]);
            });
        }

        return () => {
            SocketApi.socket?.off("message:fetch-update");
            SocketApi.socket?.off("message:update");
        };
    }, [router, message]);

    return (
        <div className={s.messages} ref={ref}>
            {messages.length > 0 ? messages.map((item) => (
                <>
                    <MessageItem
                        key={item?.id}
                        userId={item?.createrId}
                        userName={item?.creater?.name}
                        userImage={item?.creater?.photo_url}
                        messageText={item?.text}
                        optionTitle={item?.quiz?.text}
                        options={item?.quiz?.answers}
                        yourId={userId ? userId : 0}
                        type={item?.type}
                        theme={"white"}
                    />
                </>
            )) : <><AccessError text="Напишите первое сообщение..." /> </>}
        </div>
    );
};

export default memo(ChatMessages);
