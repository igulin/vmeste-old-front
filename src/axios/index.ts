import axios from "axios";
import { errorCatch, getAccessToken } from "@/axios/helper";
import { publicUrl } from "@/utils/publicUrl";

const instance = axios.create({
    baseURL: publicUrl(),
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});
instance.interceptors.request.use(async (config) => {
    const accessToken = getAccessToken();

    if (config.headers && accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
});

instance.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;

        if (
            (error.response?.status === 401 ||
                errorCatch(error) === "jwt expired" ||
                errorCatch(error) === "jwt must be provided") &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;

            try {
                return instance.request(originalRequest);
            } catch (err) {
                if (errorCatch(err) === "jwt expired") {
                    //
                }
            }
            throw error;
        }
    }
);

export default instance;
