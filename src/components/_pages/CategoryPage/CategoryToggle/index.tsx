import { Toggle } from "@/components";

import s from "./CategoryToggle.module.scss";

interface ICategoryToggle {
    otherView: boolean;
    setOtherView: (value: boolean) => void;
}

const CategoryToggle: React.FC<ICategoryToggle> = ({
    otherView,
    setOtherView,
}) => {
    return (
        <>
            <Toggle
                text={"Альтернативный вид"}
                value={otherView}
                onClick={() => setOtherView(!otherView)}
                _className={s.toggle}
            />
            <div
                style={{
                    margin: "10px 0",
                }}
            />
        </>
    );
};

export default CategoryToggle;
