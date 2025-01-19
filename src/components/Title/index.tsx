import React from "react";

import s from "./Title.module.scss";

interface ITitle {
    text: string;

    type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

    _className?: string;

    style?: React.CSSProperties;
}

const Title: React.FC<ITitle> = ({
    text,
    type,

    _className,
    style,
}) => {
    const titleClassName = `${s.title}${_className ? ` ${_className}` : ""}`;

    switch (type) {
        case "h1":
            return (
                <h1 className={titleClassName} style={style}>
                    {text}
                </h1>
            );

        case "h2":
            return (
                <h2 className={titleClassName} style={style}>
                    {text}
                </h2>
            );

        case "h3":
            return (
                <h3 className={titleClassName} style={style}>
                    {text}
                </h3>
            );

        case "h4":
            return (
                <h4 className={titleClassName} style={style}>
                    {text}
                </h4>
            );

        case "h5":
            return (
                <h5 className={titleClassName} style={style}>
                    {text}
                </h5>
            );

        case "h6":
            return (
                <h6 className={titleClassName} style={style}>
                    {text}
                </h6>
            );

        default:
            return (
                <h2 className={titleClassName} style={style}>
                    {text}
                </h2>
            );
    }
};

export default Title;
