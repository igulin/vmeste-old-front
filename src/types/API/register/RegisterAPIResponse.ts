import { UserRoleType } from "..";

type RegisterErrorMessageType =
    "Пользователь с такой почтой существует в системе";

interface RegisterAPIResponse extends APIResponse<RegisterErrorMessageType> {
    name: string;
    email: string;
    photo_url: string;
    accountCategory: UserRoleType;
    balance: number;
    createdAt: string;
}

export default RegisterAPIResponse;
