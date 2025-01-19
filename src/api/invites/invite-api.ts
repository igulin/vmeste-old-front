import instance from "@/axios";
import { CreateInviteResponse, TDeleteInvite, Response } from "../types";

const InviteApi = {
    async getMyInvites() {
        const { data } = await instance.get("/api/invite/get-my-invites");

        return data;
    },
    async create(payload: CreateInviteResponse) {
        const data = await instance.post<CreateInviteResponse>(
            `/api/invite/create`,
            {
                description: payload.description,
                userId: payload.userId,
                quoteId: payload.quoteId,
            }
        );

        return data;
    },
    async getInviteById(id: number): Promise<Response<{ id: number }>> {
        const { data } = await instance.get(
            `/api/invite/get-invite-by-id/${id}`
        );

        return data;
    },
    async delete(payload: TDeleteInvite): Promise<Response<TDeleteInvite>> {
        const data = await instance.delete<TDeleteInvite>(
            `/api/invite/delete?userId=${payload.userId}&inviteId=${payload.inviteId}`
        );

        return data;
    },
};
export default InviteApi;
