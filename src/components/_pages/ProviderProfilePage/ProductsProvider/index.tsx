import { GridComponent, RequestItem, Title } from "@/components";
import { RequestItemType } from "@/components/RequestItem/types";

import s from "./ProductsProvider.module.scss";
import { nanoid } from "nanoid";
import { userImage } from "@/images";

const items: RequestItemType[] = [
    {
        id: 1,
        photo_url: userImage,
        name: "Заявка 1",
        description: "Описание в несколько строк....",
        status: "opened",
        min_amount: 1000,
    },
    {
        id: 2,
        photo_url: userImage,
        name: "Заявка 2",
        description: "Описание в несколько строк....",
        status: "opened",
        min_amount: 1000,
    },
    {
        id: 3,
        photo_url: userImage,
        name: "Заявка 3",
        description: "Описание в несколько строк....",
        status: "opened",
        min_amount: 1000,
    },
    {
        id: 4,
        photo_url: userImage,
        name: "Заявка 4",
        description: "Описание в несколько строк....",
        status: "closed",
        min_amount: 1000,
    },
];

interface IProductsProvider {
    products: any[];
}

const ProductsProvider: React.FC<IProductsProvider> = ({ products }) => {
    if (!products || !products.length) {
        return <></>;
    }

    return (
        <div className={s.products}>
            <Title type={"h2"} text={"Товары"} />
            <GridComponent _className={s.productsItems}>
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
        </div>
    );
};

export default ProductsProvider;
