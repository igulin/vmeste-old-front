import { Input } from "@/components";
import ModalWrapper from "@/components/_modals/ModalWrapper";
import React, { FC, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import s from "./Stop.module.scss";
import { Button } from "@/components/_buttons";
import QuoteApi from "@/api/quote/quote-api";

interface IStopModal {
    isActive: boolean;
    closeModal: () => void;
    setIsActive: () => void;
    quoteId: number;
    organizerId: number;
}

const StopModal: FC<IStopModal> = ({
    isActive,
    closeModal,
    setIsActive,
    quoteId,
    organizerId,
}) => {
    const [value, setValue] = useState<number>(1);

    useEffect(() => {
        if (value > 4 || value < 1) {
            toast.error("Введите % от 1 до 4");
            setValue(1);
        }
    }, [value]);

    const handleStopSumma = useCallback(async () => {
        await QuoteApi.stopSumma(quoteId, organizerId);

        toast.success("Вы остановили заявку");
        closeModal();
        document.body.classList.remove("_lock");
    }, []);

    return (
        <>
            <ModalWrapper
                isActive={isActive}
                setIsActive={() => setIsActive}
                title="Стоп-сумма"
                footer={
                    <Button
                        onClick={handleStopSumma}
                        text="Остановить"
                        disabled={value < 1 || value > 4}
                    />
                }
            >
                <div className={s.title}>
                    Введите процент коммисии от 1 до 4
                </div>
                <Input
                    type="number"
                    placeholder="Введите % коммисии от 1 до 4"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                />
            </ModalWrapper>
        </>
    );
};

export default StopModal;
