import React from "react";

import { Title } from "@/components";

import s from "./VacationSettingsClass.module.scss";
import { nanoid } from "nanoid";
import { StarIcon } from "lucide-react";

interface IVacationSettingsClass {
    setRating: (value: number) => void;
    rating: number;
}

const items = [
    {
        uniqueId: nanoid(),
        value: 1,
    },
    {
        uniqueId: nanoid(),
        value: 2,
    },
    {
        uniqueId: nanoid(),
        value: 3,
    },
    {
        uniqueId: nanoid(),
        value: 4,
    },
    {
        uniqueId: nanoid(),
        value: 5,
    },
];

const VacationSettingsClass: React.FC<IVacationSettingsClass> = ({
    setRating,
    rating,
}) => {
    const buttonRatingHandler = (value: number) => {
        if (rating === value) {
            return setRating(value - 1);
        }

        return setRating(value);
    };

    return (
        <div className={s.class}>
            <Title type={"h2"} text={"Выберите класс отдыха"} />
            <ul className={s.classItems}>
                {items.map((item) => (
                    <li key={item.uniqueId} className={s.classItem}>
                        <button
                            onClick={() => buttonRatingHandler(item.value)}
                            className={`${s.classItemButton}${
                                rating >= item.value ? ` ${s.active}` : ""
                            }`}
                        >
                            <StarIcon color={"#fff"} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VacationSettingsClass;
