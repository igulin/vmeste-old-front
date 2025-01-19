"use client";
import { FC, memo, useCallback, useState } from "react";
import s from "./Header.module.scss";
import NotificationApi from "@/api/notification/notification-api";
import { Bell } from "lucide-react";
import Link from "next/link";
import { AccessError } from "..";

interface OwnProps {
    isOpen: boolean;
    setIsOpen: () => void;
    notifications: any[];
    isNewNotifications: boolean;
}

const HeaderNotification: FC<OwnProps> = ({
    isOpen,
    setIsOpen,
    notifications,
    isNewNotifications,
}) => {
    const handleReadNotification = async (id: number) => {
        await NotificationApi.read(id);
    };

    const handleReadAll = async () => {
        await NotificationApi.readAll();
    };

    return (
        <div className={s.notificationRoot}>
            {isNewNotifications && <span className={s.notificationIsRead} />}
            <Bell
                size={25}
                absoluteStrokeWidth
                strokeWidth={1}
                onClick={setIsOpen}
            />
            {isOpen && (
                <div className={`${s.headerContent} ${s.notification}`}>
                    <div
                        className={s.notificationReadAll}
                        onClick={handleReadAll}
                    >
                        Прочитать все сообщения
                    </div>
                    {notifications ? (
                        notifications.map((notification) => (
                            <>
                                <div
                                    className={s.notificationBlock}
                                    key={notification.id}
                                >
                                    {!notification.hasView && (
                                        <span
                                            title="прочитать"
                                            className={s.notificationUnread}
                                            onClick={() =>
                                                handleReadNotification(
                                                    notification.id
                                                )
                                            }
                                        />
                                    )}
                                    <div
                                        key={notification.id}
                                        className={s.notificationContent}
                                    >
                                        {notification.title}

                                        {notification.quote && (
                                            <Link
                                                className={s.link}
                                                href={`/application/${notification.quote.id}`}
                                                onClick={() =>
                                                    handleReadNotification(
                                                        notification.id
                                                    )
                                                }
                                            >
                                                Вступить
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </>
                        ))
                    ) : (
                        <AccessError text="Уведомлений нет" />
                    )}
                </div>
            )}
        </div>
    );
};

export default memo(HeaderNotification);
