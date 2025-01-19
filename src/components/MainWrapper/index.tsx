import React from "react";

import { Header } from "..";

import s from "./MainWrapper.module.scss";

interface IMainWrapper {
    children: React.ReactNode;
}

const MainWrapper: React.FC<IMainWrapper> = ({ children }) => {
    return (
        <>
            <Header />
            <main className={s.wrapper}>{children}</main>
        </>
    );
};

export default MainWrapper;
