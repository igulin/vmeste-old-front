import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { getMyInvites } from './invite.action'

const initialState = {
    data: undefined,
    status: "never",
};

export const inviteSlice = createSlice({
    name: "invite",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMyInvites.pending, (state) => {
					state.status = 'loading'
				}),
				 builder.addCase(getMyInvites.fulfilled, (state, action) => {
					state.status = 'loaded'	
					state.data = action.payload
				}),
				 builder.addCase(getMyInvites.rejected, (state) => {
					state.status = 'error'
				});
    },
});

export const selectUserInvites = (state: RootState) => state.invite.data;
export const selectInviteStatus = (state: RootState) => state.invite.status;

export default inviteSlice.reducer;
