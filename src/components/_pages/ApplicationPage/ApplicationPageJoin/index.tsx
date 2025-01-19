import { FC, memo } from "react";
import { Button } from "@/buttons";

import s from "./ApplicationPageJoin.module.scss";
import { toast } from "react-toastify";
import QuoteApi from "@/api/quote/quote-api";

interface OwnProps {
    quoteId: number;
}

const ApplicationPageJoin: FC<OwnProps> = ({ quoteId }) => {
    const joinApplcation = async () => {
        try {
            const res = await QuoteApi.connectUserOnQuote(quoteId);

            if (!res) {
                return toast.error(
                    "Возникла ошибка при попытке входа в заявку, возможно заявка остановлена"
                );
            }

            toast.success("Вы успешно вошли в заявку");
        } catch (err) {
            console.warn(err);
        }
    };

    return (
        <Button
            theme="blue"
            text={"Зайти"}
            onClick={joinApplcation}
            _className={s.join}
        />
    );
};

export default memo(ApplicationPageJoin);
