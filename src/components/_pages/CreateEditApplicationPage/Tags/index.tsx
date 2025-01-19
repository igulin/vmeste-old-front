"use client";

import React, { useState } from "react";

import { Input, Title } from "@/components";

import s from "./Tags.module.scss";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/buttons";

interface ITags {
    tags: string[];
    setTags: (value: string[]) => void;
}

const Tags: React.FC<ITags> = ({ tags, setTags }) => {
    const [value, setValue] = useState("");

    const addTag = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const resValue = value.trim();

        if (!resValue || resValue.length < 5) {
            return;
        }

        if (tags.indexOf(resValue) !== -1) {
            return;
        }

        setTags([...tags, resValue]);
        setValue("");
    };

    const removeItem = (item: string) => {
        setTags([...tags.filter((tag) => tag !== item)]);
    };

    return (
        <>
            <Title type={"h3"} text={"Тэги"} />
            {tags && tags.length ? (
                <ul className={s.tagsItems}>
                    {tags.map((item, index) => (
                        <li
                            key={index}
                            className={s.tagsItem}
                            onClick={() => removeItem(item)}
                        >
                            <button className={s.tagsItemButton}>
                                <Trash2Icon width={18} height={18} />
                            </button>
                            {item}
                        </li>
                    ))}
                </ul>
            ) : (
                <></>
            )}
            <form onSubmit={addTag} className={s.tagsForm}>
                <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={"Название тэга"}
                />
                <Button
                    type={"submit"}
                    text={"Добавить тэг"}
                    disabled={value.trim().length < 5}
                />
            </form>
        </>
    );
};

export default Tags;
