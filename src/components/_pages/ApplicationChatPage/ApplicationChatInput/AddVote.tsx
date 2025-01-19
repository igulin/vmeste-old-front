import { useState, FC, useCallback } from "react";
import { FileQuestion } from "lucide-react";
import s from "./ApplicationChatInput.module.scss";
import AddVoteModal from "./AddVoteModal";
import useAppSelector from "@/hooks/useAppSelector";
import { selectIsAuth } from "@/redux/slices/auth/auth.slice";

const AddVote: FC = () => {
    const isAuth = useAppSelector(selectIsAuth)
    const [isActive, setIsActive] = useState(false);
    const questionTitle: string = !isAuth ? 'Авторизируйтесь, чтобы создать опрос' : 'Создать опрос'
    const handleClick = useCallback(() => {
        if (!isAuth) {
            setIsActive(false)
            return
        }
        setIsActive(true)
    }, [])

    return (
        <>
            <button disabled={!isAuth} className={s.inputAdd} onClick={handleClick} title={questionTitle}>
                <FileQuestion />
            </button>
            {isActive && <AddVoteModal isActive={isActive} setIsActive={setIsActive} />}
        </>
    );
};

export default AddVote;
