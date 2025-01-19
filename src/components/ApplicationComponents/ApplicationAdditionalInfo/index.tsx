import React from "react";

import s from "./ApplicationAdditionalInfo.module.scss";
import { Line } from "@/components";

interface IApplicationAdditionalInfo {
    createDate: string;
    city: string;
    price: number;
}

const ApplicationAdditionalInfo: React.FC<IApplicationAdditionalInfo> = ({
    createDate,
    city,
    price,
}) => {
    return (
        <>
            <Line />
            <div className={s.additionalInfo}>
                <div className={s.additionalInfoGroup}>
                    <p className={s.additionalInfoDate}>
                        Создана: <span>{createDate}</span>
                    </p>
                    <p className={s.additionalInfoLocation}>{city}</p>
                </div>
                <p className={s.additionalInfoPrice}>
                    Взнос: <span>{price}Р</span>
                </p>
            </div>
            <Line />
        </>
    );
};

export default ApplicationAdditionalInfo;
