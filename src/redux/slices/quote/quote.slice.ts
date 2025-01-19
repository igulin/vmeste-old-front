import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {fetchAllQuotes} from "@/redux/slices/quote/quote.actions";

const initialState = {
  data: undefined,
  status: 'never'
};

export const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllQuotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllQuotes.fulfilled, (state, action) => {
        state.status = 'loaded';
        //@ts-ignore
        state.data = action.payload;
      })
      .addCase(fetchAllQuotes.rejected, (state) => {
        state.status = 'error';
      })
  },
});
