import type { AppProps } from "next/app";

import { Provider } from "react-redux";

import "../styles/index.scss";
import "react-toastify/dist/ReactToastify.css";
import store from "@/redux/store";
import { ToastContainer } from "react-toastify";
import { ModalAuth } from "@/components/_modals";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
    fetchAuthUser,
    selectUserDataId,
} from "@/redux/slices/auth/auth.slice";
import { SocketApi } from "@/api/socket-api";

const AuthUserComponent = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAuthUser());
    }, [dispatch]);

    return <></>;
};

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <AuthUserComponent />
            <Component {...pageProps} />
            <ToastContainer />
            <ModalAuth />
        </Provider>
    );
}
