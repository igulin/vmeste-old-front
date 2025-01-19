import React from "react";

import { userImage, blankAvatar } from "@/images";

import Image from "next/image";

import s from "./ProfilePageAvatar.module.scss";

interface IProfilePageAvatar {
    image: string;
    userName?: string;
}

const ProfilePageAvatar: React.FC<IProfilePageAvatar> = ({
    image,
    userName,
}) => {
    return (
        <div className={s.avatar}>
            <Image
                src={image || blankAvatar}
                alt={userName || "Avatar image"}
                priority={false}
                className={s.avatarImage}
                width={150}
                height={150}
            />
        </div>
    );
};

export default ProfilePageAvatar;
