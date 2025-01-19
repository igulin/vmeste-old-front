import React from "react";
import CategoryItem from "./CategoryItem";
import s from "./HomePageCategories.module.scss";
import { AccessError } from "@/components";
import { nanoid } from "nanoid";

const items = [
    {
        uniqueId: nanoid(),
        name: "Покупки",
        link: "/category/buy",
    },
    {
        uniqueId: nanoid(),
        name: "Отдых",
        link: "/vacation-settings",
    },
    {
        uniqueId: nanoid(),
        name: "Соревнования",
        link: "/category/competitions",
    },
    {
        uniqueId: nanoid(),
        name: "Профсоюз",
        link: "/initiatives-settings",
    },
];

const HomePageCategories = () => {
    return (
        <ul className={s.categoriesItems}>
            {items && items.length ? (
                items.map((item) => (
                    <CategoryItem
                        key={item.uniqueId}
                        text={item.name}
                        link={item.link}
                    />
                ))
            ) : (
                <AccessError text="Категории не существует или произошла ошибка" />
            )}
        </ul>
    );
};

export default HomePageCategories;
