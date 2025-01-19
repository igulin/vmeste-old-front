import { Button } from "@/buttons";

import s from "./HomePageCheckbox.module.scss";

const HomePageCheckbox = () => {
    return (
        <div className={s.checkbox}>
            <div
                style={{
                    margin: "10px 0",
                }}
            />
            <Button
                href={"https://vmestesila.ru/"}
                text={"О нас"}
                style={{
                    margin: "10px 0 0 0",
                }}
            />
        </div>
    );
};

export default HomePageCheckbox;
