import React from "react";

import { TabsComponent } from "@/components";

import { TabItemType } from "@/components/TabsComponent/types";
import { nanoid } from "nanoid";

import s from "./InitiativesSettingsType.module.scss";

const items: TabItemType[] = [
    {
        uniqueId: nanoid(),
        text: "Совместные иски",
        value: "lawsuits",
    },
    {
        uniqueId: nanoid(),
        text: "Претензии",
        value: "claims",
    },
    {
        uniqueId: nanoid(),
        text: "Кооперативы",
        value: "cooperatives",
    },
    {
        uniqueId: nanoid(),
        text: "Совместный найм",
        value: "hiring",
    },
];

const InitiativesSettingsType: React.FC = () => {
    return (
        <TabsComponent
            items={items}
            category={"initiatives"}
            _className={s.typeTabs}
        />
    );
};

export default InitiativesSettingsType;
