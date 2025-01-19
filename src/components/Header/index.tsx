"use client";

import { FC, useEffect, useState } from "react";
import { useAppSelector } from "@/hooks";
import Link from "next/link";

import HeaderContent from "./HeaderContent";
import AuthComponent from "./AuthComponent";

import { selectIsAuth, selectUserDataId } from "@/redux/slices/auth/auth.slice";

import s from "./Header.module.scss";
import HeaderNotification from "./HeaderNotification";
import { SocketApi } from "@/api/socket-api";
import { getAccessToken } from "@/axios/helper";

const Header: FC = () => {
    const token = getAccessToken();
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [notifications, setNotifications] = useState([]);
    const userId = useAppSelector(selectUserDataId);
    const isAuth = useAppSelector(selectIsAuth);

    const handleOpenMenu = () => {
        if (isActive) {
            setIsActive(false);
        }
        setIsOpened((prev) => !prev);
    };

    const handleOpenNotifications = () => {
        if (isOpened) {
            setIsOpened(false);
        }
        setIsActive((prev) => !prev);
    };

    useEffect(() => {
        if (!userId) return;
        SocketApi.createConnection(String(userId));
        SocketApi.socket?.emit("notifications:get-notifications", {
            userId: userId,
        });
        SocketApi.socket?.on("notifications:send-get-notifications", (data) => {
            setNotifications(data);
        });
        setInterval(() => {
            SocketApi.socket?.emit("notifications:get-notifications", {
                userId: userId,
            });
            SocketApi.socket?.on(
                "notifications:send-get-notifications",
                (data) => {
                    setNotifications(data);
                }
            );
        }, 3000);
    }, [isAuth]);

    return (
        <>
            <header className={s.header}>
                <div className={s.headerLogotype}>
                    <Link href="/" className={s.headerTitle}>
                        Вместе
                    </Link>
                    <span>Бета</span>
                </div>
                {isAuth ? (
                    <div className={s.headerAction}>
                        <HeaderNotification
                            notifications={notifications}
                            isNewNotifications={
                                notifications.filter(
                                    ({ hasView }) => hasView === false
                                ).length > 0
                            }
                            isOpen={isActive}
                            setIsOpen={handleOpenNotifications}
                        />
                        <button
                            className={`${s.headerButton}${
                                isOpened ? ` ${s.opened}` : ""
                            }`}
                            onClick={handleOpenMenu}
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                        <HeaderContent
                            isOpened={isOpened}
                            setIsOpened={() => setIsOpened}
                        />
                    </div>
                ) : (
                    <AuthComponent />
                )}
            </header>
            <div className={s.headerBlock} />
        </>
    );
};

export default Header;
