import Link from "next/link";

import s from "./Button.module.scss";
import { memo } from "react";

interface IButton {
    type?: "submit" | "button";

    theme?: "blue" | "white" | "red" | "green";

    onClick?: () => void;

    link?: string;
    href?: string;

    text?: string;
    children?: React.ReactNode;

    disabled?: boolean;

    style?: React.CSSProperties;
    _className?: string;
}

const Button: React.FC<IButton> = ({
    type,

    theme,

    onClick,

    link,
    href,

    text,
    children,

    disabled,

    style,
    _className,
}) => {
    const themeHandler = () => {
        switch (theme) {
            case "white":
                return ` ${s.white}`;

            case "red":
                return ` ${s.red}`;

            case "green":
                return ` ${s.green}`;

            case "blue":
                return "";

            default:
                return "";
        }
    };

    const buttonClassName = `${s.button}${themeHandler()}${
        disabled ? ` ${s.disabled}` : ""
    }${_className ? ` ${_className}` : ""}`;

    const buttonContent = children || text || "Button text";

    const clickHandler = (e: React.SyntheticEvent) => {
        if (e && disabled) {
            e.preventDefault();
        }

        if (!onClick) {
            return;
        }

        onClick();
    };

    if (link) {
        return (
            <Link
                href={link}
                className={buttonClassName}
                style={style}
                onClick={clickHandler}
            >
                {buttonContent}
            </Link>
        );
    }

    if (href) {
        return (
            <a
                href={href}
                target={"_blank"}
                className={buttonClassName}
                style={style}
                onClick={clickHandler}
            >
                {buttonContent}
            </a>
        );
    }

    return (
        <button
            disabled={disabled}
            className={buttonClassName}
            onClick={clickHandler}
            style={style}
            type={type}
        >
            {buttonContent}
        </button>
    );
};

export default memo(Button);
