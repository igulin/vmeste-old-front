import { FC, useState } from "react";
import { Input } from "@/components";
import { ModalWrapper } from "@/modals";
import { ModalWrapperShowType } from "@/components/_modals/ModalWrapper/types";
import { useRouter } from "next/router";
import s from "./ApplicationChatInput.module.scss";
import { Button } from "@/components/_buttons";
import OptionItem from "./OptionItem";
import { OptionItemType } from "@/components/ChatComponents/MessageItem/types";
import { nanoid } from "nanoid";

import { toast } from "react-toastify";

import axios from "@/axios";
import useAppDispatch from "@/hooks/useAppDispatch";
import { setQuizData } from "@/redux/slices/message/message.slice";

interface IAddVoteModal extends ModalWrapperShowType {
}

const limit = 5;

const AddVoteModal: FC<IAddVoteModal> = ({ isActive, setIsActive }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { id } = router.query;

    const [loading, setLoading] = useState(false);

    const [question, setQuestion] = useState("");

    const [options, setOptions] = useState<OptionItemType[]>([
        {
            uniqueId: nanoid(),
            text: "",
            value: "",
        },
    ]);

    const addVote = async () => {
        if (!question.trim()) {
            return toast.error("Введите вопрос");
        }

        if (!options || !options.length) {
            return toast.error("Нет вариантов ответа");
        }

        for (let i = 0; i < options.length; i++) {
            const option = options[i];

            if (!option.text.trim()) {
                return toast.error("Не все варианты ответа содержат ответ");
            }
        }

        try {
            let result = [] as string[];
            setLoading(true);

            options.map(option => {
                result.push(option.text);
            });
            const res = await axios.post("/api/message/create-quiz-message", {
                question,
                answers: result.join("; "),
                quote_id: id,
            });

            if (!res.data) {
                throw new Error();
            }

            dispatch(setQuizData(res.data));

            setIsActive(false);
        } catch {
            toast.error("Не удалось создать опрос");
        } finally {
            setLoading(false);
        }

        setIsActive(false);
        document.body.classList.remove("_lock");
    };

    const addNewOption = () => {
        if (options && options.length >= limit) {
            return;
        }

        setOptions([...options, { text: "", value: "", uniqueId: nanoid() }]);
    };

    return (
        <ModalWrapper
            isActive={isActive}
            setIsActive={setIsActive}
            title={"Создать опрос"}
            fit
            footer={
                <Button
                    onClick={addVote}
                    text={"Создать опрос"}
                    style={{
                        width: "100%",
                    }}
                    disabled={loading}
                />
            }
        >
            <div className={s.inputAddModal}>
                <Input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder={"Вопрос"}
                    bordered
                />
                {options && options.length ? (
                    <>
                        <h5 className={s.inputAddOptionsTitle}>
                            Варианты ответа
                        </h5>
                        <div className={s.inputAddOptionsItems}>
                            {options.map((item, index) => (
                                <OptionItem
                                    key={item.uniqueId}
                                    value={item.text}
                                    setValue={(value: string) =>
                                        setOptions([
                                            ...options.slice(0, index),
                                            { ...options[index], text: value },
                                            ...options.slice(index + 1),
                                        ])
                                    }
                                    deleteOption={() =>
                                        setOptions([
                                            ...options.filter(
                                                (option) =>
                                                    option.uniqueId !==
                                                    item.uniqueId,
                                            ),
                                        ])
                                    }
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <></>
                )}
                <Button
                    disabled={(options && options.length >= limit) || loading}
                    onClick={addNewOption}
                    text={"Новый вариант"}
                    style={{
                        width: "100%",
                        margin: "25px 0 0 0",
                    }}
                />
            </div>
        </ModalWrapper>
    );
};

export default AddVoteModal;
