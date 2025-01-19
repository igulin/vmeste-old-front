import { SelectItemType } from "@/components/Select/types";
import { useGetCities } from "@/redux/api/cities.api";
import { replaceToSelectHandler, uniqueIdHandler } from "@/usable";
import { useState, useEffect } from "react";

const useCitiesItems = () => {
    const citiesData = useGetCities();

    const [cities, setCities] = useState<SelectItemType<string>[]>([]);

    const citiesHandler = () => {
        if (citiesData.isError || !citiesData.data || !citiesData.data.length) {
            return setCities([]);
        }

        setCities(
            replaceToSelectHandler({
                textKey: "city",
                valueKey: "region",
                array: uniqueIdHandler(citiesData.data),
            })
        );
    };

    useEffect(() => {
        citiesHandler();
    }, [citiesData]);

    return cities;
};

export default useCitiesItems;
