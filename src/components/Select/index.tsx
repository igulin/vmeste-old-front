"use client";

import React, { useState, useRef } from "react";

import { ChevronDown } from "lucide-react";

import { SelectItemType, SelectProps } from "./types";

import s from "./Select.module.scss";
import { useOnClickOutside } from "usehooks-ts";

const Select: React.FC<SelectProps<any>> = ({
    items,
    type,
    currentItem,
    setCurrentItem,

    placeholder,
}) => {
    const [isActive, setIsActive] = useState(false);

    const itemsRef = useRef<HTMLDivElement | null>(null);

    const closeHandler = () => setIsActive(false);

    const selectItem = (item: SelectItemType<any>) => {
        setCurrentItem(item);
        closeHandler();
    };

    useOnClickOutside(itemsRef, closeHandler);

    return (
        <div className={s.select}>
            <div
                className={`${s.selectCurrent}${
                    isActive ? ` ${s.active}` : ""
                }${type === "text" ? ` ${s.selectTypeText}` : ""}`}
                onClick={() => setIsActive(!isActive)}
            >
                <p
                    className={`${s.selectCurrentText} ${
                        type === "text" ? ` ${s.selectTypeTextParagraph}` : ""
                    }`}
                >
                    {currentItem ? currentItem.text : placeholder}
                </p>
                <ChevronDown />ss
            </div>
            {isActive && items && items.length ? (
                <div
                    className={`${s.selectItems} ${
                        type === "text" && s.selectItemsText
                    }`}
                    ref={itemsRef}
                >
                    {items.map((item, key) => (
                        <button
                            key={item.uniqueId || key}
                            onClick={() => selectItem(item)}
                            className={`${s.selectButton}${
                                currentItem && currentItem.value === item.value
                                    ? ` ${s.active}`
                                    : ""
                            }`}
                        >
                            {item.text}
                        </button>
                    ))}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Select;
