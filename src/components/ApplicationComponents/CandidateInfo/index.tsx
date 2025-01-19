import React, { memo } from "react";

import { Title, UserCard } from "@/components";
import { userImage } from "@/images";

import s from "./CandidateInfo.module.scss";

interface ICandidateInfo {
    titleColor?: string;
    user?: any // TODO refactor this interface
}

const CandidateInfo: React.FC<ICandidateInfo> = ({ titleColor, user }) => {
    return (
        <>
            <Title
                type={"h4"}
                text={"Организатор"}
                _className={s.title}
                style={{
                    color: titleColor,
                }}
            />
            <UserCard
                name={user?.name}
                image={user?.photo_url}
                description={"Отправил приглашение"}
            />
        </>
    );
};

export default memo(CandidateInfo);
