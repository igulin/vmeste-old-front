import React from "react";

import s from "./TabsComponent.module.scss";
import { TabItemType } from "./types";
import { Button } from "@/buttons";

interface ITabsComponent {
    items: TabItemType[];

    category: "vacation" | "initiatives";
    rating?: number;

    _className?: string;
}

const TabsComponent: React.FC<ITabsComponent> = ({
                                                     items,

                                                     category,
                                                     rating,

                                                     _className,
                                                 }) => {
    if (!items || !items.length) {
        return <></>;
    }

    return (
        <ul className={`${s.tabs}${_className ? ` ${_className}` : ""}`}>
            {items.map((item) => {
                const switcher = category === "initiatives" ?
                    `/category/${category}?type=${item.value}`
                    : rating
                        ? `/category/${category}?type=${item.value}${
                    rating ? `&rating=${rating}` 
                        : ""
                }` : `/category/${category}`;

                return (
                    <li key={item.uniqueId} className={s.tabsItem}>
                        <Button
                            disabled={category === 'vacation' && !rating}
                            text={item.text}
                            style={{
                                width: "100%",
                            }}
                            link={switcher}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default TabsComponent;
