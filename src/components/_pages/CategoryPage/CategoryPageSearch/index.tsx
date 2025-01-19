import { useState } from "react";

import { Input } from "@/components";

import s from "./CategoryPageSearch.module.scss";

const CategoryPageSearch: React.FC = () => {
    const [value, setValue] = useState("");

    return (
        <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Поиск"}
            _className={s.search}
        />
    );
};

export default CategoryPageSearch;
