import React, { useState } from "react";

import ChatModal from "./ChatModal";

import { MessageCircleIcon } from "lucide-react";

import s from "./CategoryPageChat.module.scss";

const CategoryPageChat: React.FC = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleChat = () => setIsActive(!isActive);

    return (
        <>
            <button className={s.chatButton} onClick={toggleChat}>
                <MessageCircleIcon />
            </button>
            {isActive ? (
                <ChatModal isActive={isActive} setIsActive={setIsActive} />
            ) : (
                <></>
            )}
        </>
    );
};

export default CategoryPageChat;
