import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/buttons";
import { ModalWrapper } from "@/modals";

import { toast } from "react-toastify";

import axios from "@/axios";
import { Input } from "@/components";

const ApplicationPageAddEvent: React.FC = () => {
    const router = useRouter();

    const { id } = router.query;

    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(false);

    const [eventName, setEventName] = useState("");

    const toggleModal = () => setIsActive(!isActive);

    const addEvent = async () => {
        try {
            setLoading(true);

            const res = await axios.post("/api/event/create", {
                name: eventName,
                quote_id: id,
            });

            if (!res.data) {
                throw Error();
            }

            setEventName("");
            setIsActive(false);
            toast.success("Событие успешно создано");
            document.body.classList.remove("_lock");
        } catch {
            toast.error("Не удалось добавить событие");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                text={"Добавить событие"}
                style={{
                    width: "100%",
                }}
                onClick={toggleModal}
            />
            <ModalWrapper
                title={"Добавить событие"}
                isActive={isActive}
                setIsActive={setIsActive}
                fit
                footer={
                    <Button
                        text={"Добавить событие"}
                        style={{
                            width: "100%",
                        }}
                        onClick={addEvent}
                    />
                }
            >
                <Input
                    placeholder={"Название события"}
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                />
            </ModalWrapper>
        </>
    );
};

export default ApplicationPageAddEvent;
