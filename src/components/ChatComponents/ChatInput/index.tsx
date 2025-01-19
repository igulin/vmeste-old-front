import React, { ChangeEvent, useCallback, useState } from "react";

import { Input } from "@/components";

import s from "./ChatInput.module.scss";
import { Loader, MessageCircleIcon } from "lucide-react";
import { SocketApi } from "@/api/socket-api";
import useAppSelector from "@/hooks/useAppSelector";
import { selectIsAuth } from "@/redux/slices/auth/auth.slice";
import { toast } from "react-toastify";

interface IChatInput {
    onSubmit: (value: string) => void;
    loading: boolean;
}

const ChatInput: React.FC<IChatInput> = ({ onSubmit, loading }) => {
    const isAuth = useAppSelector(selectIsAuth);
    const [value, setValue] = useState("");

    const sendMessage = async (e: React.FormEvent) => {
        try {
            e.preventDefault();

            if (!isAuth) {
                toast.error("Вы не авторизованы");
                setValue("")
                return;
            }

            if (loading) {
                return;
            }

            if (!value.trim()) {
                return setValue("");
            }

            onSubmit(value);

            setValue("");
        } catch {
        }
    };

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }, []);

    return (
        <form className={s.form} onSubmit={sendMessage}>
            <Input
                disabled={!isAuth}
                value={value}
                onChange={handleChange}
                placeholder={isAuth ? "Введите ваше сообщение" : "Вы не авторизованы"}
            />
            <button type="submit" className={s.formButton} disabled={loading || !isAuth}>
                {loading ? <Loader /> : <MessageCircleIcon />}
            </button>
        </form>
    );
};

export default ChatInput;
