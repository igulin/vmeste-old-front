import { FC, useEffect, useState } from "react";

import { MessageItemThemeType, OptionItemType } from "./types";

import { toast } from "react-toastify";

import axios from "@/axios";

import s from "./MessageItem.module.scss";
import { useAppSelector } from "@/hooks";
import { selectUserDataId } from "@/redux/slices/auth/auth.slice";
import { useRouter } from "next/router";
import { SocketApi } from "@/api/socket-api";

interface IMessageOptions {
    optionTitle?: string;
    options?: OptionItemType[];
    optionsVotes?: number;
    isFromMe: boolean;
    theme?: MessageItemThemeType;
}

const MessageOptions: FC<IMessageOptions> = ({
                                                 optionTitle,
                                                 options,
                                                 optionsVotes,

                                                 isFromMe,

                                                 theme,
                                             }) => {
    const router = useRouter();
    const userId = useAppSelector(selectUserDataId);
    const [selectedVote, setSelectedVote] = useState<number | null>(null);

    const selectVote = async (item: OptionItemType) => {
        if (!item.id) return null;

        if (selectedVote === item.id) {
            return;
        }

        try {
            const res = await axios.post(`/api/vote/create`, {
                answer_id: item.id,
            });

            if (!res.data) {
                throw Error();
            }

            SocketApi.createConnection(String(router.query.id));
            SocketApi.socket?.emit("message:fetch-update", Number(router.query.id));
        } catch {
            toast.error("Не удалось проголосовать");
        }
        setSelectedVote(item.id);
    };

    useEffect(() => {
        options?.map(option => {
            option.votes && option.votes?.map(vote => {
                if (vote.userId === userId) {
                    setSelectedVote(vote.answerId);
                }
            });
        });
    }, [options]);

    if (!options || !options.length) {
        return <></>;
    }

    return (
        <div className={s.messageContentOption}>
            <h5 className={s.messageContentOptionTitle}>{optionTitle}</h5>
            <div className={s.messageContentOptionItems}>
                {options.map((item) => (
                    <button
                        key={item.text}
                        className={`${s.messageContentOptionItem}${
                            theme === "white" && !isFromMe ? ` ${s.white}` : ""
                        }`}
                        onClick={() => selectVote(item)}
                    >
                        <div
                            className={`${s.messageContentOptionItemCircle}${
                                selectedVote === item.id
                                    ? ` ${s.active}`
                                    : ""
                            }`}
                        />
                        <p className={s.messageContentOptionItemTitle}>
                            {item.text}
                        </p>
                    </button>
                ))}
            </div>
            <p className={s.messageContentOptionVotes}>
                Голосов: <span>{optionsVotes}</span>
            </p>
        </div>
    );
};

export default MessageOptions;
