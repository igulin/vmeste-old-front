import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "@/axios";


export const fetchAllQuotes = createAsyncThunk(
    "quote/fetcgAllQuotes",
    async () => {

        return await axios.get(
            "/api/quote"
        );
    }
);