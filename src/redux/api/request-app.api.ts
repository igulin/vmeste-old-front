import api from ".";

const requestAppApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRequestAppItems: builder.query<any, void>({
            query: () => ({
                url: `/api/request-app`,
                method: "GET",
                credentials: "include",
            }),
        }),
        getRequestAppItemsById: builder.query({
            query: (userId: number) => {
                if (!userId) {
                    return ""
                }

                return `/api/request-app/get-requests-by-id/${userId}`;
            },
        }),
    }),
});

export default requestAppApi;

export const useGetRequestAppItems =
    requestAppApi.endpoints.getRequestAppItems.useQuery;

export const useGetRequestAppItemsById = requestAppApi.endpoints.getRequestAppItemsById.useQuery;
