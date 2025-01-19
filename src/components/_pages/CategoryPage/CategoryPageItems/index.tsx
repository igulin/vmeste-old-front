import React from "react";

import { RequestItemType } from "@/components/RequestItem/types";
import { AccessError, GridComponent, RequestItem } from "@/components";

import { CategoryPageSearch } from "..";

interface ICategoryPageItems {
    items: RequestItemType[];
}

const CategoryPageItems: React.FC<ICategoryPageItems> = ({ items }) => {
    if (!items || !items.length) {
        return <AccessError text="Заявок в этом категории не существует"/>
    }

    return (
        <>
            <CategoryPageSearch />
            <GridComponent>
                {items.map((item) => (
                    <RequestItem
                        key={item.id}
                        id={item.id}
                        photo_url={item.photo_url}
                        name={item.name}
                        description={item.description}
                        status={item.status}
                        min_amount={item.min_amount}
                    />
                ))}
            </GridComponent>
        </>
    );
};

export default CategoryPageItems;
