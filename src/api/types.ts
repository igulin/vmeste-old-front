import UserRoleType from "@/types/API/UserRoleType";

export interface IEvent {
    id: number;
    name: string;
    quoteId: number;
    createdAt: Date;
}

export interface IQuoteUser {
    name: string;
    createAt: Date;
    photo_url: string;
}

export interface IUserOnQuotes {
    assignedAt: Date;
    quoteId: number;
    user: IQuoteUser;
    userId: number;
}

export interface UserDataType extends APIResponse<string> {
    accountCategory: UserRoleType;
    balance: number;
    createAt: string;
    email: string;
    hasVerificaton: boolean;
    id: number;
    name: string;
    password: string;
    photo_url: string;
}

export interface ISupportPayload {
    email: string;
    text: string;
}

export interface IResetPassword {
    hash: string;
    token: string;
    newPassword: string;
    againPassword: string;
}

export type UserSupportType = {
    email: string;
    text: string;
};

export type PropsWithAccessToken<T = unknown> = T & { accessToken: string };

export type UploadImageResponse = {
    url: string;
    size: number;
};

export type CreateInviteResponse = {
    description: string;
    userId: number;
    quoteId: number;
};

export type TDeleteInvite = {
    userId: number;
    inviteId: string;
};

export type Response<T> = {
    data: T;
};
