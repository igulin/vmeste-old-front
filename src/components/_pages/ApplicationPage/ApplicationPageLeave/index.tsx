import { Button } from "@/buttons";

import s from "./ApplicationPageLeave.module.scss";
import QuoteApi from "@/api/quote/quote-api";
import { FC } from "react";
import { toast } from "react-toastify";

interface OwnProps {
    quoteId: number;
}

const ApplicationPageLeave: FC<OwnProps> = ({ quoteId }) => {
    const leaveApplication = async () => {
        const data = await QuoteApi.leaveUserQuote(quoteId);

        if (!data) {
            toast.error("Ошибка при выходе из заявки");
            return;
        }

        toast.success("Вы успешно вышли с заявки");
    };

    return (
        <Button
            theme={"red"}
            text={"Выйти"}
            onClick={leaveApplication}
            _className={s.leave}
        />
    );
};

export default ApplicationPageLeave;
