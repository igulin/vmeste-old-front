import { useState, memo, FC, useEffect } from "react";
import { useRouter } from "next/router";

import { Container } from "@/components";
import { ChatInput } from "@/components/ChatComponents";
import AddVote from "./AddVote";
import { toast } from "react-toastify";

import s from "./ApplicationChatInput.module.scss";
import { SocketApi } from "@/api/socket-api";
import { useAppSelector } from "@/hooks";
import { selectUserDataId } from "@/redux/slices/auth/auth.slice";
import { setMessageData } from "@/redux/slices/message/message.slice";
import useAppDispatch from "@/hooks/useAppDispatch";
import { MonitorStop } from "lucide-react";
import Stop from "./Stop";

interface IApplicationChatInput {
    createrId: number;
}

const ApplicationChatInput: FC<IApplicationChatInput> = ({ createrId }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const userId = useAppSelector(selectUserDataId);
    const { id } = router.query;
    const organizerId = userId && createrId === userId;

    const [loading, setLoading] = useState(false);

    const submitHandler = async (text: string) => {
        try {
            setLoading(true);

            SocketApi?.createConnection(String(router.query.id));
            SocketApi.socket?.emit("message:create-message", {
                text,
                quote_id: Number(id),
                userId: userId,
            });
            SocketApi.socket?.on("message:get-message", (data) => {
                dispatch(setMessageData(data));
            });
        } catch {
            toast.error("Не удалось отправить сообщение");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={s.inputBlock} />
            <div className={s.input}>
                <Container _className={s.inputContainer}>
                    <AddVote />
                    <ChatInput onSubmit={submitHandler} loading={loading} />
                    {organizerId && (
                        <Stop
                            organizerId={organizerId && createrId}
                            quoteId={Number(router.query.id)}
                        />
                    )}
                </Container>
            </div>
        </>
    );
};

export default memo(ApplicationChatInput);
