import InviteApi from "@/api/invites/invite-api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMyInvites = createAsyncThunk("invite/GET_MY_INVITES", async () => {
    try {
        const data = await InviteApi.getMyInvites();

        console.log(data);

        return data;
    } catch (e) {
        console.warn(e);
    }
});
