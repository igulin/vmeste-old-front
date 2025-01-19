import React, { useState } from "react";

import { useRouter } from "next/router";

import s from "./CreateRequestForm.module.scss";
import { Input, Select } from "@/components";
import { Button } from "@/components/_buttons";
import { nanoid } from "nanoid";
import { SelectItemType } from "@/components/Select/types";
import { useCitiesItems } from "@/hooks";

import axios from "@/axios";
import { toast } from "react-toastify";

const categories: SelectItemType<string>[] = [
    {
        uniqueId: nanoid(),
        text: "Покупки",
        value: "buy",
    },
    {
        uniqueId: nanoid(),
        text: "Активный отдых",
        value: "active-vacation",
    },
    {
        uniqueId: nanoid(),
        text: "Кафе",
        value: "cafe",
    },
    {
        uniqueId: nanoid(),
        text: "Курорты",
        value: "ru",
    },
    {
        uniqueId: nanoid(),
        text: "Соревнования",
        value: "competitions",
    },
    {
        uniqueId: nanoid(),
        text: "Совместные иски",
        value: "lawsuits",
    },
    {
        uniqueId: nanoid(),
        text: "Претензии",
        value: "select2",
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

interface ICreateRequestForm {
    id?: string | string[];
}
/* 
const countries: SelectItemType<string>[] = [
    {
        uniqueId: nanoid(),
        text: "Россия",
        value: "Россия",
    },
];
 */
const CreateRequestForm: React.FC<ICreateRequestForm> = ({ id }) => {
    const router = useRouter();

    const cities = useCitiesItems();

    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState<SelectItemType<string> | null>(
        null
    );
    /*  const [country, setCountry] = useState<SelectItemType<string> | null>(
        null
    ); */
    const [city, setCity] = useState<SelectItemType<string> | null>(null);

    const deleteRequest = async () => {
        if (!id) {
            return;
        }

        if (!window.confirm("Вы действительно хотите удалить запрос?")) {
            return;
        }

        try {
            setLoading(true);

            const res = await axios.delete(`/api/quote/delete?id=${id}`);

            if (!res.data) {
                throw Error();
            }

            toast.success("Запрос успешно удален");

            router.push("/");
        } catch {
            toast.error("Не удалось удалить запрос");
        } finally {
            setLoading(false);
        }
    };

    const createRequest = async () => {
        if (name.trim().length < 5) {
            return toast.error("Название должно быть больше 5 символов");
        }

        if (!Number(amount)) {
            return toast.error("Введите количество товара");
        }

        if (!category) {
            return toast.error("Выберите категорию");
        }

        if (!date) {
            return toast.error("Выберите дату доставки");
        }

        const body = {
            name,
            count_products: amount,
            city: city?.text,
            category_id: 1,
            receipt_period: date,
        };

        if (id) {
            try {
                setLoading(true);

                console.log(body);
                const res = await axios.put("/api/request-app/update", body);

                if (!res.data) {
                    throw Error();
                }

                router.push("/profile");

                toast.success("Запрос успешно обновлен");
            } catch (error) {
                toast.error("Не удалось обновить запрос");
            } finally {
                setLoading(false);
            }

            return;
        }

        try {
            setLoading(true);

            const res = await axios.post("/api/request-app/create", body);

            if (!res.data) {
                throw Error();
            }

            router.push("/profile");

            toast.success("Запрос успешно создан");
        } catch (error) {
            toast.error("Не удалось создать запрос");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={s.requestInputs}>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={"Название запроса"}
                />
                <Input
                    type={"number"}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={"Количество товара"}
                />
                <Input
                    type={"date"}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder={"Срок доставки"}
                />
                <Select
                    currentItem={category}
                    setCurrentItem={setCategory}
                    placeholder={"Категория"}
                    items={categories}
                />
                {/* <Select
                    currentItem={country}
                    setCurrentItem={setCountry}
                    placeholder={"Страна"}
                    items={countries}
                /> */}
                {cities && cities.length ? (
                    <Select
                        currentItem={city}
                        setCurrentItem={setCity}
                        placeholder={"Город"}
                        items={cities}
                    />
                ) : (
                    <></>
                )}
            </div>
            {id ? (
                <Button
                    text={"Удалить запрос"}
                    onClick={deleteRequest}
                    theme={"red"}
                    _className={s.requestButton}
                    style={{ margin: "auto 0 10px 0" }}
                    disabled={loading}
                />
            ) : (
                <></>
            )}
            <Button
                disabled={name.length < 5 || !category || !date || loading}
                text={id ? "Редактировать запрос" : "Создать запрос"}
                onClick={createRequest}
                _className={s.requestButton}
            />
        </>
    );
};

export default CreateRequestForm;
