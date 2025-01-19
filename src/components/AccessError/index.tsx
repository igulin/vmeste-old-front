import s from "./AccessError.module.scss";
import {FC, memo} from "react";

interface IAccessError {
    loading?: boolean;
    text?: string;
}

const AccessError: FC<IAccessError> = ({ loading, text }) => {
    return (
        <p className={s.text}>
            {loading ? (
                "Загрузка"
            ) : (
                <>{text || "Вам не доступна данная страница"}</>
            )}
        </p>
    );
};

export default memo(AccessError);
