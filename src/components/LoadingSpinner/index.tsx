import React from "react";

import s from "./LoadingSpinner.module.scss";

const LoadingSpinner: React.FC = () => {
    return (
        <div className={s.loading}>
            <div className={s.loadingCircle} />
        </div>
    );
};

export default LoadingSpinner;
