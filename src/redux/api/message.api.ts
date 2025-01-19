import api from ".";

interface ParamsType {
    categoryId?: string | string[];
    type: string | null;
    rating: string | null;
}

const MessageApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMessagesByQuote: builder.query({
            query: (quoteId: number) => {
                if (!quoteId) {
                    return "";
                }

                return `/api/message/get-messages-by-quote/${quoteId}`;
            },
        }),
    }),
});

export default MessageApi;

export const useGetMessagesByQuote =
    MessageApi.endpoints.getMessagesByQuote.useQuery;