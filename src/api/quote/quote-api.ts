import instance from "@/axios";
import { UploadImageResponse } from "../types";

const QuoteApi = {
    async getQuoteById(id: number) {
        const { data } = await instance.get(
            `api/quote/get-all-quotes-with-category/${id}`
        );

        return data;
    },
    async getQuoteDetails(id: number) {
        const { data } = await instance.get(
            `api/quote/get-details-quote/${id}`
        );

        return data;
    },
    async getOrganizerQuote(id: number) {
        const { data } = await instance.get(
            `api/quote/get-organizer-by-id/${id}`
        );

        return data;
    },
    async connectUserOnQuote(quoteId: number) {
        const data = await instance.post(
            "/api/quote/add-current-user-to-quote",
            {
                quote_id: String(quoteId),
            }
        );
        return data;
    },
    async getQuotesByUserOnQuotes() {
        const { data } = await instance.get(
            `api/quote/get-quotes-by-user-on-quotes`
        );

        return data;
    },
    async leaveUserQuote(quoteId: number) {
        const data = await instance.get(
            `/api/quote/exit-from-quote?quote_id=${quoteId}`
        );

        return data;
    },
    async stopSumma(quoteId: number, organizerId: number) {
        const data = await instance.post("/api/quote/stop-summa", {
            organizerId: organizerId,
            quoteId: quoteId,
        });

        return data;
    },
    async uploadImage(image: File) {
        let formData = new FormData();
        formData.append("avatar", image);
        const data = await instance.post<UploadImageResponse>(
            "/api/quote/upload-quote-avatar",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return data;
    },
    async getProviderByCategory(slug: string) {
        const data = await instance.get(
            `category/get-provider-by-category/${slug}`
        );

        return data;
    },
};

export default QuoteApi;
