"use client";

import React, { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { Button } from "@/buttons";

import s from "./ProfilePageInfo.module.scss";
import { selectIsAuth, setUserRole } from "@/redux/slices/auth/auth.slice";
import { UserRoleType } from "@/types/API";
import { userRoles } from "@/common";
import { Select } from "@/components";
import { SelectItemType } from "@/components/Select/types";
import axios from "@/axios";
import { toast } from "react-toastify";
import { useGetMyQuotes } from "@/redux/api/quote.api";
import { ModalWrapper } from "@/components/_modals";
import ProfilePageQuote from "../ProfilePageQuote/ProfilePageQuote";

interface IProfilePageInfo {
    userName: string;

    balance?: number;

    rating?: number;
    role: UserRoleType;

    isMyProfile?: boolean;

    inviteUserId?: number;
}

const ProfilePageInfo: React.FC<IProfilePageInfo> = ({
    userName,
    balance,
    rating,
    role,
    isMyProfile,
    inviteUserId,
}) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const userRole = useAppSelector(
        (state) => state.auth.data?.accountCategory
    );
    const isAuth = useAppSelector(selectIsAuth);
    //@ts-ignore
    const quotes = useGetMyQuotes();

    const balanceHandler = () => {};

    const handleInvite = () => {
        setIsActive(true);
    };

    const roleHandler = () => {
        switch (role) {
            case "USER_ADMIN":
                return "Админ";
            case "USER_DELIVERY":
                return "Поставщик";
            case "USER_MODERATOR":
                return "Модератор";
            case "USER_ORDINARY":
                return "Пользователь";
            default:
                return "Пользователь";
        }
    };

    const changeRoleHandler = useCallback(
        async (roleItem: SelectItemType<UserRoleType>) => {
            try {
                const res = await axios.post("/api/auth/update-role", {
                    new_role: roleItem.value,
                });

                if (!res || !res.data) {
                    return;
                }

                toast.success("Роль успешно изменена");

                dispatch(setUserRole(res.data));
            } catch (error) {
                toast.error("Не удалось сменить роль");
            }
        },
        [userRole]
    );
    return (
        <div className={s.info}>
            <h3 className={s.infoName}>{userName}</h3>
            {rating ? (
                <p className={s.infoText}>
                    Рейтинг: <span>{rating}</span>
                </p>
            ) : (
                <></>
            )}
            {role && (
                <p className={s.infoText}>
                    Роль: <span>{roleHandler()}</span>
                </p>
            )}
            {isMyProfile && userRole && (
                <p className={`${s.infoText} ${s.infoBlock}`}>
                    Сменить роль:
                    <Select
                        type="text"
                        currentItem={{
                            text: userRoles.filter(
                                (el) => el.value === userRole
                            )[0]?.text,
                            value: userRole,
                        }}
                        setCurrentItem={changeRoleHandler}
                        items={userRoles}
                        placeholder="Ваша роль"
                    />
                </p>
            )}
            {inviteUserId && (
                <>
                    <Button
                        text={"Пригласить в заявку"}
                        onClick={handleInvite}
                    />
                </>
            )}
            {isMyProfile && isAuth ? (
                <>
                    <p className={s.infoText}>
                        Баланс: <span>{balance}</span>
                    </p>
                    <Button text={"Пополнить"} onClick={balanceHandler} />
                </>
            ) : (
                <></>
            )}
            {isMyProfile && isAuth ? (
                <Button link={"/profile/settings"} text={"Настройки"} />
            ) : (
                <></>
            )}

            {quotes.data && (
                <ModalWrapper isActive={isActive} setIsActive={setIsActive}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {quotes.data.map((quote: any) => (
                            <ProfilePageQuote quote={quote} key={quote.id} />
                        ))}
                    </div>
                </ModalWrapper>
            )}
        </div>
    );
};

export default ProfilePageInfo;
