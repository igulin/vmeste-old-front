import api from ".";

const categoryApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<any[], void>({
            query: () => "/category",
        }),
        getProvidersByCategory: builder.query({
            query: (categoryId: string) => {
                if (!categoryId) {
                    return "";
                }
                return `/category/get-provider-by-category/${categoryId}`;
            },
        }),
    }),
});

export const useGetCategories = categoryApi.endpoints.getCategories.useQuery;

export const useGetProvidersByCategory =
    categoryApi.endpoints.getProvidersByCategory.useQuery;
