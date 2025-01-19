import { useState } from "react";

import {
    VacationSettingsClass,
    VacationSettingsType,
} from "@/pages/VacationSettingsPage";
import { Title } from "@/components";

const Content = () => {
    const [rating, setRating] = useState(0);

    return (
        <>
            <Title type={"h1"} text={"Отдых"} />
            <VacationSettingsClass rating={rating} setRating={setRating} />
            <VacationSettingsType rating={rating} />
        </>
    );
};

export default Content;
