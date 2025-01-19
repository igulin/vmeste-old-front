import React from "react";
import Image, { StaticImageData } from "next/image";

import s from "./UserCard.module.scss";

interface IUserCard {
    name: string;
    image: StaticImageData | string;
    description?: string;
    big?: boolean;
    rating?: number;
}

const UserCard: React.FC<IUserCard> = ({
    name,
    image,
    description,
    big,
    rating,
}) => {
    const bigClassName = big ? ` ${s.big}` : "";

    return (
        <div className={s.user}>
            <div className={`${s.userImage}${bigClassName}`}>
                <Image src={image} alt={name} width={100} height={100}/>
            </div>
            <div className={s.userInfo}>
                <h4 className={s.userInfoName}>{name}</h4>
                <p className={s.userInfoText}>{description}</p>
                {rating ? (
                    <p className={s.userInfoText}>
                        Рейтинг: <span>{rating}</span>
                    </p>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default UserCard;
