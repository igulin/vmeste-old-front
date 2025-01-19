import { UserDataType } from '@/api/types'
import { StaticImageData } from "next/image";

export type MessageItemTypes = "TYPE_TEXT" | "TYPE_QUIZ";

export type MessageItemThemeType = "black" | "white";

export interface OptionItemType {
    id?: number
    quizId?: number
    uniqueId?: string;
    text: string;
    value: string;
    votes?: VotesType[]
}

export interface VotesType {
    id: number
    userId: number
    answerId: number
}

export interface MessageItemType {
    uniqueId?: string;

    userId: number;
    userImage: StaticImageData | string;
    userName: string;

    type: MessageItemTypes;

    messageText?: string;

    optionTitle?: string;
    options?: OptionItemType[];
    optionsVotes?: number;
}

export interface MessageItemProps extends MessageItemType {
    yourId: number;
    theme?: MessageItemThemeType;
}

export interface IMessageItem {
    id: number
    categoryId: number
    creater: UserDataType
    createrId: number
    quiz: any
    type: MessageItemTypes
    text: string
}