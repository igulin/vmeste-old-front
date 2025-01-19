import React from "react";

import s from "./Checkbox.module.scss";
import { Check } from "lucide-react";

interface ICheckbox {
    value: boolean;
    setValue: (value: boolean) => void;

    text?: string;

    children?: React.ReactNode;

    theme?: "black" | "white";
}

const Checkbox: React.FC<ICheckbox> = ({
    value,
    setValue,

    text,
    children,

    theme,
}) => {
    return (
        <label className={s.checkbox} onClick={() => setValue(!value)}>
            <div className={`${s.checkboxBox}${value ? ` ${s.active}` : ""}`}>
                <Check
                    width={16}
                    height={16}
                    style={{ color: theme === "white" ? "#fff" : "" }}
                />
            </div>
            {text ? (
                <p className={s.checkboxText}>{text}</p>
            ) : children ? (
                children
            ) : (
                <></>
            )}
        </label>
    );
};

export default Checkbox;
