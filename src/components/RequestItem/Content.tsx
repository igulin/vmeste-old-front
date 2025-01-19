import { FC, memo } from "react";

import Image from "next/image";

import { ReqeustItemContent } from "./types";

import s from "./RequestItem.module.scss";

const Content: FC<ReqeustItemContent> = ({
    photo_url,
    name,
    description,
    min_amount,
    status,
}) => {
    return (
        <>
            <div className={s.requestItemImage}>
                <Image src={photo_url} alt={name} width={100} height={100}/>
            </div>
            <div className={s.requestItemInfo}>
                <div className={s.requestItemInfoTop}>
                    <h4 className={s.requestItemInfoTopTitle}>{name}</h4>
                    <p
                        className={`${s.requestItemInfoTopStatus}${
                            status === "opened" ? ` ${s.opened}` : ""
                        }`}
                    >
                        {status === "opened" ? "Открыта" : "Закрыта"}
                    </p>
                </div>
                <p className={s.requestItemInfoDescription}>{description}</p>
                <p className={s.requestItemInfoPrice}>{min_amount}Р</p>
            </div>
        </>
    );
};

export default memo(Content);
