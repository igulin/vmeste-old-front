import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

const initialState = {
  data: undefined,
  status: 'never'
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
      setMessageData(state, action){
          state.status = 'loaded'
          state.data = action.payload
      },
      setQuizData(state, action) {
          state.status = 'loaded'
          state.data = action.payload
      },
      getMessage(state, action) {
          state.status = 'loaded'
      }
  },
});


export const {
    setMessageData,
    setQuizData
} = messageSlice.actions;

export const selectMessageData = (state: RootState) => state.message.data

export default messageSlice.reducer