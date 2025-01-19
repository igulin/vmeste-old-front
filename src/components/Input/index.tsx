import React, { HTMLInputTypeAttribute } from "react";

import s from "./Input.module.scss";

interface IInput {
    type?: HTMLInputTypeAttribute;
    placeholder: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean

    bordered?: boolean;

    _className?: string;
}

const Input: React.FC<IInput> = ({
    type,
    disabled,
    placeholder,
    value,
    onChange,

    bordered,

    _className,
}) => {
    return (
        <div
            className={`${s.inputWrapper}${_className ? ` ${_className}` : ""}`}
        >
            <input
                disabled={disabled}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`${s.input}${bordered ? ` ${s.bordered}` : ""}`}
            />
            {!value ? (
                <p className={s.inputPlaceholder}>{placeholder}</p>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Input;
