import { getAccessToken } from "@/axios/helper";
import { publicUrl } from "@/utils/publicUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: publicUrl(),
        credentials: "include",
        prepareHeaders: (headers) => {
            const token = getAccessToken();

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: () => ({}),
});

export default api;
