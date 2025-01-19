import React from "react";

import s from "./Input.module.scss";

interface IInputTextarea {
    placeholder: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    _className?: string;
}

const InputTextarea: React.FC<IInputTextarea> = ({
    placeholder,
    value,
    onChange,
    _className,
}) => {
    return (
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${s.input} ${s.inputTextarea}${
                _className ? ` ${_className}` : ""
            }`}
        />
    );
};

export default InputTextarea;
