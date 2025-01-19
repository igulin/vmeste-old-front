import api from ".";
import { CityItemType } from "@/types/API/cities";

const citiesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCities: builder.query<CityItemType[], void>({
            query: () => "/cities",
        }),
    }),
});

export const useGetCities = citiesApi.endpoints.getCities.useQuery;
