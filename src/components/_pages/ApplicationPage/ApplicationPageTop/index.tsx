import React from "react";

import { Title } from "@/components";
import { Button } from "@/buttons";

import s from "./ApplicationPageTop.module.scss";

interface IApplicationPageTop {
    title: string;
    onClick: () => void;
    buttonText: string;
}

const ApplicationPageTop: React.FC<IApplicationPageTop> = ({
    title,
    onClick,
    buttonText,
}) => {
    return (
        <div className={s.top}>
            <Title text={title} type={"h2"} />
            <Button text={buttonText} onClick={onClick} />
        </div>
    );
};

export default ApplicationPageTop;
