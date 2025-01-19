import React from "react";

import { TabsComponent, Title } from "@/components";

import { TabItemType } from "../../../TabsComponent/types";

import { nanoid } from "nanoid";

import s from "./VacationSettingsType.module.scss";

interface IVacationSettingsType {
    rating: number;
}

const items: TabItemType[] = [
    {
        uniqueId: nanoid(),
        text: "Активный отдых",
        value: "active-recreation",
    },
    {
        uniqueId: nanoid(),
        text: "Кафе",
        value: "cafe",
    },
    {
        uniqueId: nanoid(),
        text: "Курорты",
        value: "resorts",
    },
];

const VacationSettingsType: React.FC<IVacationSettingsType> = ({ rating }) => {
    return (
        <div className={s.type}>
            <Title text={"Тип отдыха"} type={"h2"} />
            <TabsComponent
                category={"vacation"}
                items={items}
                rating={rating}
                _className={s.typeTabs}
            />
        </div>
    );
};

export default VacationSettingsType;
