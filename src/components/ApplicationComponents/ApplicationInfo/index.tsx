import React from "react";

import { Title } from "@/components";

import s from "./ApplicationInfo.module.scss";

interface IApplicationInfo {
    totalPrice: number;
    minimalPrice: number;
    endDate: string;
    description: string;

    titleColor?: string;
}

const ApplicationInfo: React.FC<IApplicationInfo> = ({
    totalPrice,
    minimalPrice,

    endDate,
    description,

    titleColor,
}) => {
    return (
        <div className={s.infoDetails}>
            <Title
                text={"Детали"}
                type={"h4"}
                _className={s.infoDetailsTitle}
                style={{
                    color: titleColor,
                }}
            />
            <p className={s.infoDetailsDescription}>{description}</p>
            <div className={s.infoDetailsOther}>
                <p className={s.inviteDetailsOtherText}>
                    Общая сумма: <span>{totalPrice}Р</span>
                </p>
                <p className={s.infoDetailsOtherText}>
                    Минимальная сумма взноса: <span>{minimalPrice}Р</span>
                </p>
                <p className={s.infoDetailsOtherText}>
                    Срок реализации: <span>{endDate}</span>
                </p>
            </div>
        </div>
    );
};

export default ApplicationInfo;
