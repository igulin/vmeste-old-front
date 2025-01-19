import React from "react";

import s from "./InputWrapper.module.scss";

interface IInputWrapper {
    children: React.ReactNode;
}

const InputWrapper: React.FC<IInputWrapper> = ({ children }) => {
    return <div className={s.wrapper}>{children}</div>;
};

export default InputWrapper;
