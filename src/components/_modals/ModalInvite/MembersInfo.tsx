import React, { FC } from "react";

import { AccessError, GridComponent, Title, UserCard } from "@/components";

import s from "./ModalInvite.module.scss";
import formatDate from "@/utils/formatDate";

interface IMembers {
    users: any[];
}

const MembersInfo: FC<IMembers> = ({ users }) => {
    return (
        <>
            <Title
                text={"Участники"}
                type={"h4"}
                _className={s.inviteTitle}
                style={{ color: "rgb(255, 255, 255)" }}
            />
            <GridComponent>
                {users.length > 0 ? (
                    users.map((data) => (
                        <UserCard
                            key={data.user.id}
                            name={"User"}
                            image={data.user.photo_url}
                            description={`На сайте с ${formatDate(
                                data.user.createAt,
                                "dd.MM.yyyy"
                            )}`}
                        />
                    ))
                ) : (
                    <AccessError text="Участников нет" />
                )}
            </GridComponent>
        </>
    );
};

export default MembersInfo;
