import QuoteApi from "@/api/quote/quote-api";
import api from ".";
import { getAccessToken } from "@/axios/helper";

interface ParamsType {
    categoryId?: string | string[];
    type: string | null;
    rating: string | null;
}

const quoteApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMyQuotes: builder.query({
            query: () => {
                return `/api/quote`
            },
        }),
        getQuotesByCategory: builder.query({
            query: ({ categoryId, type, rating }: ParamsType) => {
                if (!categoryId) {
                    return "";
                }

                return `/api/category/get-quotes-by-category?id=${categoryId}${
                    type ? `&type=${type}` : ""
                }${rating ? `&rating=${rating}` : ""}`;
            },
        }),

        getQuoteDetails: builder.query({
            query: (quoteId: string | string[] | undefined) => {
                if (!quoteId) {
                    return "";
                }

                return `/api/quote/get-details-quote/${quoteId}`;
            },
            keepUnusedDataFor: 120,
        }),

        getOrganizerQuote: builder.query({
            query: (createrId: number) => {
                if (!createrId) {
                    return "";
                }

                return `/api/quote/get-organizer-by-id/${createrId}`;
            },
        }),
        getQuotesById: builder.query({
            query: (userId: number) => {
                if (!userId) {
                    return "";
                }

                return `/api/quote/get-quotes-by-id/${userId}`;
            },
        }),
        getQuotesByUserOnQuotes: builder.query({
            query: (userId: number) => {
                if (!userId) {
                    return "";
                }

                return `api/quote/get-quotes-by-user-on-quotes/${userId}`;
            },
        }),
    }),
});

export default quoteApi;

export const useGetQuotesByCategory =
    quoteApi.endpoints.getQuotesByCategory.useQuery;
export const useGetQuoteDetails = quoteApi.endpoints.getQuoteDetails.useQuery;

export const useGetOrganizerQuote =
    quoteApi.endpoints.getOrganizerQuote.useQuery;

export const useGetQuotesById = quoteApi.endpoints.getQuotesById.useQuery;

export const useGetQuotesByUserOnQuotes =
    quoteApi.endpoints.getQuotesByUserOnQuotes.useQuery;

export const useGetMyQuotes = quoteApi.endpoints.getMyQuotes.useQuery;
