import { SelectItemType } from "@/components/Select/types";
import { UserRoleType } from "@/types/API";
import { nanoid } from "nanoid";

export interface UserRoleItemType extends SelectItemType<UserRoleType> {}

const userRoles: UserRoleItemType[] = [
    {
        uniqueId: nanoid(),
        text: "Обычный пользователь",
        value: "USER_ORDINARY",
    },
    {
        uniqueId: nanoid(),
        text: "Поставщик",
        value: "USER_DELIVERY",
    },
    {
        uniqueId: nanoid(),
        text: "Организатор",
        value: "USER_MODERATOR",
    },
];

export default userRoles;
