import React from "react";

import { Button } from "@/buttons";

import s from "./HomePageCategories.module.scss";

interface ICategoryItem {
    text: string;
    link: string;
}

const CategoryItem: React.FC<ICategoryItem> = ({ text, link }) => {
    return (
        <li className={s.categoriesItem}>
            <Button
                link={link}
                text={text}
                style={{
                    width: "100%",
                }}
            />
        </li>
    );
};

export default CategoryItem;
