import React from "react";
import Image, { StaticImageData } from "next/image";

import s from "./MessageItem.module.scss";
import Link from "next/link";

interface IUserAvatar {
    userImage: StaticImageData | string;
    userId: number;
    userName: string;
    yourId: number;
}

const UserAvatar: React.FC<IUserAvatar> = ({
    userImage,
    userId,
    userName,
    yourId,
}) => {
    if (userId === yourId) {
        return <></>;
    }

    return (
        <Link href={`/profile/${userId}`} className={s.messageImage}>
            <Image src={userImage} alt={userName} width={50} height={50}/>
        </Link>
    );
};

export default UserAvatar;
