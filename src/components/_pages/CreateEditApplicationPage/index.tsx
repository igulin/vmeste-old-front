"use client";
import React, { useState, useEffect } from "react";

import {
    Container,
    Input,
    InputTextarea,
    PhotoLoader,
    Select,
    Title,
} from "../..";
import InputWrapper from "./InputWrapper";
import { SelectItemType } from "../../Select/types";
import { nanoid } from "nanoid";
import { Button } from "@/buttons";
import { useRouter } from "next/navigation";
import { useGetCities } from "@/redux/api/cities.api";
import { replaceToSelectHandler, uniqueIdHandler } from "@/usable";
import Tags from "./Tags";

import { toast } from "react-toastify";
import axios from "@/axios";
import { useCitiesItems } from "@/hooks";
import QuoteApi from "@/api/quote/quote-api";

interface ICreateEditApplicationPage {
    id?: string | string[];
}

const categories: SelectItemType<string>[] = [
    {
        uniqueId: nanoid(),
        text: "Покупки",
        value: "buy",
    },
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

const COMISSION_NUMBER = [
    {
        uniqueId: nanoid(),
        text: "1%",
        value: 1,
    },
    {
        uniqueId: nanoid(),
        text: "2%",
        value: 2,
    },
    {
        uniqueId: nanoid(),
        text: "3%",
        value: 3,
    },
    {
        uniqueId: nanoid(),
        text: "4%",
        value: 4,
    },
];

const CreateEditApplicationPage: React.FC<ICreateEditApplicationPage> = ({
    id,
}) => {
    const router = useRouter();

    const cities = useCitiesItems();

    const [image, setImage] = useState<string>("");

    const [name, setName] = useState("");
    const [realizationPeriod, setRealizationPeriod] = useState("");
    const [category, setCategory] = useState<SelectItemType<string> | null>(
        null
    );
    const [country, setCountry] = useState<SelectItemType<string> | null>(null);
    const [city, setCity] = useState<SelectItemType<string> | null>(null);
    const [comission, setComission] = useState<SelectItemType<number> | null>(
        null
    );
    const [price, setPrice] = useState<number>(0);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [countStar, setCountStart] = useState<number>(0);
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState<string[]>([""]);

    const getQuoteDetails = async () => {
        if (!id) {
            return;
        }

        try {
            const res = await axios.get(
                `/api/quote/get-details-quote?id=${id}`
            );

            if (!res.data) {
                throw Error();
            }

            // TODO сделать initial state для существующей заявки
        } catch {
            toast.error("Не удалось найти заявку");
            router.push("/");
        }
    };

    const loadPhotoHandler = async (file: File) => {
        const { data } = await QuoteApi.uploadImage(file);

        !image && setImage(data.url);
    };

    const createEditApplication = async () => {
        if (name.trim().length <= 5) {
            return toast.error("Название должно быть больше 5 символов");
        }

        if (!description.trim()) {
            return toast.error("Введите описание");
        }

        if (!city) {
            return toast.error("Выберите город");
        }

        if (!price) {
            return toast.error("Введите цену");
        }

        if (!minPrice) {
            return toast.error("Введите минимальную цену");
        }

        if (minPrice > price) {
            return toast.error("Мин. сумма не может быть больше обычной цены");
        }

        if (!category) {
            return toast.error("Выберите категорию");
        }

        if (countStar < 1 || countStar > 5) {
            return toast.error("Выберите количество зведз от 1 до 5");
        }

        const body = {
            name,
            realization_period: realizationPeriod,
            status: "string",
            tags: tags.reduce((acc, el, index, arr) => {
                if (index + 1 === arr.length) {
                    return (acc += ` ${el}`);
                }

                return (acc += `${el},`);
            }, ""),
            description,
            photo: image,
            city_name: city.text,
            category_id: category.value,
            price: price,
            min_amount: minPrice,
            countStar: countStar,
            comission: (price * comission?.value) / 100,
        };

        if (id) {
            try {
                const res = await axios.put(`/api/quote/update?id=${id}`, body);

                if (!res.data) {
                    throw Error();
                }

                toast.success("Заявка успешно отредактирована");
                router.push("/profile");
            } catch {
                toast.error("Не удалось отредактировать заявку");
            }

            return;
        }

        try {
            const res = await axios.post("/api/quote/create", body);

            if (!res.data) {
                throw Error();
            }

            toast.success("Заявка успешно создана");
            router.push("/profile");
        } catch {
            toast.error("Не удалось отредактировать заявку");
        }
    };

    const deleteApplication = async () => {
        if (!id) {
            return;
        }

        if (!window.confirm("Вы точно хотите удалить даннрую заявку?")) {
            return;
        }

        try {
            const res = await axios.delete(`/api/quote/delete?id=${id}`);

            if (!res.data) {
                throw Error();
            }

            toast.success("Заявка успешно удалена");

            router.push("/profile");
        } catch {
            toast.error("Не удалось удалить заявку");
        }
    };

    useEffect(() => {
        setCity(null);
    }, [country]);

    useEffect(() => {
        getQuoteDetails();
    }, [id]);

    return (
        <Container>
            <Title
                type={"h1"}
                text={id ? "Редактирование заявки" : "Создание заявки"}
            />
            <InputWrapper>
                <PhotoLoader callback={loadPhotoHandler} />
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={"Название"}
                />
                <Input
                    type={"date"}
                    value={realizationPeriod}
                    onChange={(e) => setRealizationPeriod(e.target.value)}
                    placeholder={"Дата"}
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
                <Input
                    type={"text"}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder={"Сумма"}
                />
                <Input
                    type={"text"}
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    placeholder={"Мин. сумма"}
                />
                <Select
                    currentItem={comission}
                    setCurrentItem={setComission}
                    items={COMISSION_NUMBER}
                    placeholder={"Комиссия от 1 до 4%"}
                />
                <Input
                    type={"text"}
                    value={countStar}
                    onChange={(e) => setCountStart(Number(e.target.value))}
                    placeholder={"Звезде заявки"}
                />

                <InputTextarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={"Описание"}
                />
                <Tags tags={tags} setTags={setTags} />
            </InputWrapper>
            {id ? (
                <Button
                    onClick={deleteApplication}
                    text={"Удалить заявку"}
                    style={{
                        width: "100%",
                        margin: "auto 0 10px 0",
                    }}
                    theme={"red"}
                />
            ) : (
                <></>
            )}
            <Button
                onClick={createEditApplication}
                text={id ? "Редактировать заявку" : "Создать заявку"}
                style={{
                    width: "100%",
                    margin: "auto 0 0 0",
                }}
            />
        </Container>
    );
};

export default CreateEditApplicationPage;
