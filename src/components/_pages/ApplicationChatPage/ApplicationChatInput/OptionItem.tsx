import React from "react";

import { Input } from "@/components";

import s from "./ApplicationChatInput.module.scss";
import { TrashIcon } from "lucide-react";

interface IOptionItem {
    value: string;
    setValue: (value: string) => void;
    deleteOption: () => void;
}

const OptionItem: React.FC<IOptionItem> = ({
    value,
    setValue,
    deleteOption,
}) => {
    return (
        <div className={s.inputAddOptionsItem}>
            <Input
                placeholder={"Вариант ответа"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                bordered
            />
            <button
                className={s.inputAddOptionsItemButton}
                onClick={deleteOption}
            >
                <TrashIcon width={20} height={20} />
            </button>
        </div>
    );
};

export default OptionItem;
