"use client";
import { MonitorStop } from "lucide-react";
import React, { FC, useState } from "react";
import s from "./Stop.module.scss";
import { ModalWrapper } from "@/components/_modals";
import StopModal from "./StopModal";

interface IStop {
    quoteId: number;
    organizerId: number;
}

const Stop: FC<IStop> = ({ quoteId, organizerId }) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    return (
        <>
            <button
                className={s.block}
                title="Стоп-сумма"
                onClick={() => setIsActive((prev) => !prev)}
            >
                <MonitorStop size={25} />
            </button>
            {isActive && (
                <StopModal
                    setIsActive={() => setIsActive}
                    quoteId={quoteId}
                    organizerId={organizerId}
                    isActive={isActive}
                    closeModal={() => setIsActive(false)}
                />
            )}
        </>
    );
};

export default Stop;
