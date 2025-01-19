import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootState } from "@/redux/store";
import { UserRoleType } from "@/types/API";
import instance from "@/axios";
import AuthService from "@/api/auth/auth.service";
import Cookie from "js-cookie";

export const fetchLoginUser = createAsyncThunk(
    "authSlice/fetchLoginUser",
    async ({ email, password }: { email: string; password: string }) => {
        const data = await AuthService.login(email, password);

        if (!data) return;

        Cookies.set("accessToken", data.accessToken);

        return data;
    }
);

export const logout = createAsyncThunk("authSlice/logout", async () => {
    try {
        const data = await AuthService.logout();

        Cookie.remove("accessToken", { expires: undefined, path: "/" });

        return data;
    } catch (e) {
        console.warn(e);
    }
});

export const fetchAuthUser = createAsyncThunk(
    "authSlice/fetchAuthUser",
    async () => {
        try {
            const data = await AuthService.authAccountMe();

            return data;
        } catch (e) {
            console.warn(e);
        }
    }
);

interface UserDataType extends APIResponse<string> {
    accountCategory: UserRoleType;
    balance: number;
    createAt: string;
    email: string;
    hasVerificaton: boolean;
    id: number;
    name: string;
    password: string;
    photo_url: string;
}

interface InitialStateType {
    data: UserDataType | null;
    isModalActive: boolean;
}

const initialState: InitialStateType = {
    data: null,
    isModalActive: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsModalActive: (state, action: PayloadAction<boolean>) => {
            state.isModalActive = action.payload;
        },
        setUserRole: (state, action) => {
            const role = action.payload.accountCategory;

            if (!state.data) {
                return;
            }

            state.data.accountCategory = role;
        },
    },
    extraReducers: (builder) => {
        // Login

        builder.addCase(fetchLoginUser.pending, (state) => {
            state.data = null;
        });
        builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
            //@ts-ignore
            state.data = action.payload;
        });
        builder.addCase(fetchLoginUser.rejected, (state) => {
            state.data = null;
        });

        // Auth user

        builder.addCase(fetchAuthUser.pending, (state) => {
            state.data = null;
        });
        builder.addCase(fetchAuthUser.fulfilled, (state, action) => {
            // @ts-ignore
            state.data = action.payload;
        });
        builder.addCase(fetchAuthUser.rejected, (state) => {
            state.data = null;
        });

        builder.addCase(logout.fulfilled, (state) => {
            state.data = null;
        });
    },
});

export const {
    setIsModalActive,

    setUserRole,
} = authSlice.actions;

export const selectIsModalActive = (store: RootState) =>
    store.auth.isModalActive;

export const selectUserData = (store: RootState) => store.auth.data;
export const selectUserDataId = (store: RootState) => store.auth.data?.id;
export const selectUserDataRole = (store: RootState) =>
    store.auth.data?.accountCategory;
export const selectUserAvatar = (store: RootState) =>
    store.auth.data?.photo_url;

export const selectIsAuth = (store: RootState) => Boolean(store.auth.data);

export default authSlice.reducer;
