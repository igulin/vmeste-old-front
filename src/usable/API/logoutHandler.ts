import axios from "@/axios";
import Cookie from "js-cookie"
import { toast } from "react-toastify";

const logoutHandler = async () => {
    try {
        const res = await axios.post("/logout");

        if (!res.data) {
            return toast.error("Не удалось выйти из аккаунта");
        }

        Cookie.remove('accessToken', {expires: undefined, path: '/'})
    } catch (error) {
        toast.error("Не удалось выйти из аккаунта");
    }
};

export default logoutHandler;
