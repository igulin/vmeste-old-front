import {memo, FC, useCallback} from "react";
import Link from "next/link";

import { nanoid } from "nanoid";

import s from "./Header.module.scss";
import {useAppDispatch} from "@/hooks";
import {logout} from "@/redux/slices/auth/auth.slice";

interface IHeaderContent {
    isOpened: boolean;
    setIsOpened: () => void
}

const items = [
    {
        uniqueId: nanoid(),
        text: "Профиль",
        link: "/profile",
    },
    {
        uniqueId: nanoid(),
        text: "Создать заявку",
        link: "/create",
    },
];

const HeaderContent: FC<IHeaderContent> = ({ isOpened }) => {
    const dispatch = useAppDispatch()
    if (!isOpened) {
        return <></>;
    }

    const logoutHandler = useCallback(() => {
        dispatch(logout())
    }, [])

    return (
        <div className={s.headerContent}>
            {items.map((item) => (
                <Link
                    href={item.link}
                    key={item.uniqueId}
                    className={s.headerContentLink}
                    title={item.text}
                >
                    {item.text}
                </Link>
            ))}
            <button className={s.headerContentLink} onClick={logoutHandler}>
                Выйти
            </button>
        </div>
    );
};

export default memo(HeaderContent);
