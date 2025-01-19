import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { authSlice, inviteSlice, messageSlice } from "./slices";
import api from "./api";

const preloadedState = {};

const reducers = combineReducers({
    [api.reducerPath]: api.reducer,
    auth: authSlice,
    message: messageSlice,
    invite: inviteSlice
});

const store = configureStore({
    reducer: reducers,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
