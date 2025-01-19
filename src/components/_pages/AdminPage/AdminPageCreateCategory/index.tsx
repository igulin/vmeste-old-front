import { useState } from "react";
import { Button } from "@/buttons";
import { ModalWrapper } from "@/modals";
import { Input } from "@/components";

import axios from "@/axios";
import { toast } from "react-toastify";

const AdminPageCreateCategory: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    const toggleModal = () => setIsActive(!isActive);

    const addCategory = async () => {
        if (!categoryName.trim()) {
            return setCategoryName("");
        }

        try {
            setLoading(true);
            const res = await axios.post("/category/create");

            if (!res.data) {
                throw Error();
            }

            toast.success("Категория успешно создана");
            setCategoryName("");
            setIsActive(false);
        } catch {
            toast.error("Не удалось создать категорию");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                text={"Добавить категорию"}
                onClick={toggleModal}
                disabled={loading}
            />
            <ModalWrapper
                isActive={isActive}
                setIsActive={setIsActive}
                title={"Добавить категорию"}
                fit
                footer={
                    <Button
                        text={"Добавить категорию"}
                        onClick={addCategory}
                        style={{
                            width: "100%",
                        }}
                    />
                }
            >
                <Input
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder={"Название категории"}
                />
            </ModalWrapper>
        </>
    );
};

export default AdminPageCreateCategory;
