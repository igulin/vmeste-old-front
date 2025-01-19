import React from "react";

import s from "./PageWrapper.module.scss";

interface IPageWrapper {
    children: React.ReactNode;
}

const PageWrapper: React.FC<IPageWrapper> = ({ children }) => {
    return <div className={`${s.wrapper} ${s.font}`}>{children}</div>;
};

export default PageWrapper;
