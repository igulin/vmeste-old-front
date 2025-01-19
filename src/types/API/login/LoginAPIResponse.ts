import { UserRoleType } from "..";

type LoginErrorMessageTypes = "Почта не верифицирована!";

interface LoginAPIResponse extends APIResponse<LoginErrorMessageTypes> {
    name: string;
    email: string;
    photo_url: string;
    accountCategory: UserRoleType;
    balance: number;
    createdAt: string;
}

export default LoginAPIResponse;
