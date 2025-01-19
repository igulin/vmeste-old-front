import React from "react";
import { Button } from "../_buttons";
import { useAppDispatch } from "@/hooks";
import { setIsModalActive } from "@/redux/slices/auth/auth.slice";

const AuthComponent: React.FC = () => {
    const dispatch = useAppDispatch();

    const toggleModal = () => {
        dispatch(setIsModalActive(true));
    };

    return (
        <>
            <Button text={"Войти"} onClick={toggleModal} />
        </>
    );
};

export default AuthComponent;
