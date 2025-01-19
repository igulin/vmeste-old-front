import React from "react";

import s from "./Container.module.scss";

interface IContainer {
    children: React.ReactNode;
    _className?: string;
}

const Container: React.FC<IContainer> = ({ children, _className }) => {
    return (
        <div className={`${s.container}${_className ? ` ${_className}` : ""}`}>
            {children}
        </div>
    );
};

export default Container;
