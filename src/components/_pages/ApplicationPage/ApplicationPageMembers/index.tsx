"use client";
import { FC, memo, useEffect, useState } from "react";

import { ApplicationPageTop } from "..";
import { AccessError, GridComponent, UserCard } from "@/components";

import s from "./ApplicationPageMembers.module.scss";
import formatDate from "@/utils/formatDate";
import { IUserOnQuotes } from "@/api/types";

interface OwnProps {
    users: IUserOnQuotes[]; // добавите типизацию для юзера
}

const ApplicationPageMembers: FC<OwnProps> = ({ users }) => {
    const [isActive, setIsActive] = useState(false);

    const toggleActive = () => setIsActive(!isActive);

    const _className = `${s.membersItems} ${s.membersCenter}`

    return (
        <div className={s.members}>
            <ApplicationPageTop
                title={"Участники"}
                onClick={toggleActive}
                buttonText={isActive ? "Скрыть" : users.length > 10 ? "+10" : String(users.length)}
            />
            {isActive ? (
                <GridComponent _className={users.length >= 1  ? s.membersItems : _className} >
                    {
                        users.length >= 1 ? users.map(el => (
                            <UserCard
                                key={el.user.name}
                                name={el.user.name}
                                image={el.user.photo_url}
                                description={`На сайте с ${formatDate(el.user.createAt, "dd.MM.yyyy")}`}
                            />
                        )) : <AccessError text="Участников нет" />
                    }
                </GridComponent>
            ) : (
                <></>
            )}
        </div>
    );
};

export default memo(ApplicationPageMembers);
