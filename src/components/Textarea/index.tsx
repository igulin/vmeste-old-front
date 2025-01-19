import { memo, FC, HTMLAttributes, useCallback, ChangeEvent, useState } from "react";

interface OwnProps extends HTMLAttributes<HTMLTextAreaElement> {
    name?: string;
    cols?: number;
    rows?: number;
}

import s from "./Textarea.module.scss";

const Textarea: FC<OwnProps> = ({ onChange, id, className, rows, name, cols, placeholder }) => {
    const [height, setHeight] = useState(100);
    const handleInput = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.scrollHeight >= 100) {
            setHeight(e.target.scrollHeight);
        }
    }, [height]);

    return (
        <textarea
            onChange={onChange}
            style={{ height: `${height}px` }}
            onInput={handleInput} name={name} id={id} cols={cols} rows={rows} placeholder={placeholder}
            className={`${s.textarea}`} />
    );
};

export default memo(Textarea);