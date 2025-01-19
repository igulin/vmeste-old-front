import React, {useCallback} from "react";

import {Button} from "@/buttons";

import {logoutHandler} from "@/usable/API";

import s from "./ProfilePageLogout.module.scss";
import {useAppDispatch} from "@/hooks";
import {logout} from "@/redux/slices/auth/auth.slice";

const ProfilePageLogout: React.FC = () => {
    const dispatch = useAppDispatch()

    const logoutHandler = useCallback(() => {
        dispatch(logout())
    }, [])
    return (
        <Button
            theme={"red"}
            text={"Выйти"}
            onClick={logoutHandler}
            _className={s.button}
        />
    );
};

export default ProfilePageLogout;
