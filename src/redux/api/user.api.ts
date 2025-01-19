import api from ".";

const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserById: builder.query({
            query: (userId?: string | string[]) => {
                if (!userId) {
                    return "";
                }
                return `/get-user-by-id/${userId}`;
            },
        }),
        getMyInvites: builder.query({
            query: () => {
                return `/api/invite/get-my-invites`;
            },
        }),
    }),
});

export const useGetUserById = userApi.endpoints.getUserById.useQuery;

export const useGetMyInvites = userApi.endpoints.getMyInvites.useQuery;