import { Title } from "@/components";
import s from "./HomePageInfo.module.scss";

const HomePageInfo = () => {
    return (
        <div className={s.info}>
            <Title
                type={"h2"}
                text={"Сервис организации совместных действий."}
            />
            <p className={s.infoText}>Делим расходы - умножаем выгоду.</p>
        </div>
    );
};

export default HomePageInfo;
