import { ModalWrapper } from "@/modals";

import { userImage } from "@/images";

import { nanoid } from "nanoid";

import { MessageItem } from "@/components/ChatComponents";
import { MessageItemType } from "@/components/ChatComponents/MessageItem/types";
import CreateRequestButton from "../CreateRequestButton";

interface IChatModal {
    isActive: boolean;
    setIsActive: (value: boolean) => void;
}

const yourId = 4;

const items: MessageItemType[] = [
    {
        uniqueId: nanoid(),
        userId: 1,
        userImage: userImage,
        userName: "UserName",
        messageText: "Ищу телевизор или ноутбук",
        type: "TYPE_TEXT",
    },
    {
        uniqueId: nanoid(),
        userId: 1,
        userImage: userImage,
        userName: "UserName",
        messageText: "Ищу телевизор или ноутбук",
        type: "TYPE_TEXT",
    },
    {
        uniqueId: nanoid(),
        userId: 1,
        userImage: userImage,
        userName: "UserName",
        messageText: "Ищу телевизор или ноутбук",
        type: "TYPE_TEXT",
    },
    {
        uniqueId: nanoid(),
        userId: 4,
        userImage: userImage,
        userName: "UserName",
        messageText: "Ищу телевизор или ноутбук",
        type: "TYPE_TEXT",
    },
    {
        uniqueId: nanoid(),
        userId: 1,
        userImage: userImage,
        userName: "UserName",
        type: "TYPE_QUIZ",
        optionTitle: "Первый опрос",
        options: [
            {
                text: "Вариант1",
                value: "1",
            },
            {
                text: "Вариант3",
                value: "2",
            },
            {
                text: "Вариант3",
                value: "3",
            },
        ],
    },
    {
        uniqueId: nanoid(),
        userId: 4,
        userImage: userImage,
        userName: "UserName",
        type: "TYPE_QUIZ",
        optionTitle: "Первый опрос",
        options: [
            {
                text: "Вариант1",
                value: "1",
            },
            {
                text: "Вариант3",
                value: "2",
            },
            {
                text: "Вариант3",
                value: "3",
            },
        ],
    },
];

const ChatModal: React.FC<IChatModal> = ({ isActive, setIsActive }) => {
    return (
        <ModalWrapper
            isActive={isActive}
            setIsActive={setIsActive}
            footer={<CreateRequestButton />}
        >
            {items.map((item) => (
                <MessageItem
                    key={item.uniqueId}
                    userId={item.userId}
                    userName={item.userName}
                    userImage={item.userImage}
                    messageText={item.messageText}
                    yourId={yourId}
                    type={item.type}
                    theme={"black"}
                />
            ))}
        </ModalWrapper>
    );
};

export default ChatModal;
