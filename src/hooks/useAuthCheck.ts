import { useAppSelector } from ".";
import { selectIsAuth, selectUserDataRole } from "@/redux/slices/auth/auth.slice";
import { UserRoleType } from "@/types/API";
import { useEffect, useState } from "react";

const useAuthCheck = (role?: UserRoleType) => {
    const isAuth = useAppSelector(selectIsAuth);
    const userRole = useAppSelector(selectUserDataRole);

    const [isAvailable, setIsAvailable] = useState(false);

    console.log(userRole, role);

    const availableHandler = () => {
        if (role) {
            return setIsAvailable(isAuth && userRole === role);
        }

        setIsAvailable(isAuth);
    };

    useEffect(() => {
        availableHandler();
    }, [isAuth, userRole]);

    return isAvailable;
};

export default useAuthCheck;
