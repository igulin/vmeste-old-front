import React from "react";

import s from "./ProfilePageInfoWrapper.module.scss";

interface IProfilePageInfoWrapper {
    children: React.ReactNode;
}

const ProfilePageInfoWrapper: React.FC<IProfilePageInfoWrapper> = ({
    children,
}) => {
    return <div className={s.wrapper}>{children}</div>;
};

export default ProfilePageInfoWrapper;
