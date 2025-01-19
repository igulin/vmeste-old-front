import s from "./Toggle.module.scss";

interface IToggle {
    text?: string;

    value: boolean;
    onClick: () => void;

    theme?: "white" | "black";

    _className?: string;
}

const Toggle: React.FC<IToggle> = ({
    text,

    value,
    onClick,

    theme,

    _className,
}) => {
    return (
        <label
            className={`${s.toggle}${_className ? ` ${_className}` : ""}`}
            onClick={onClick}
        >
            {text ? <p className={s.toggleText}>{text}</p> : <></>}
            <div className={`${s.toggleBox}${value ? ` ${s.active}` : ""}`} />
        </label>
    );
};

export default Toggle;
