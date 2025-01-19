import React from "react";

import s from "./GridComponent.module.scss";

interface IGridComponent {
    children: React.ReactNode;
    _className?: string;
}

const GridComponent: React.FC<IGridComponent> = ({ children, _className }) => {
    return (
        <div className={`${s.grid}${_className ? ` ${_className}` : ""}`}>
            {children}
        </div>
    );
};

export default GridComponent;
