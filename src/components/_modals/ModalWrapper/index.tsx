import { FC, PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from 'react-dom'

import { Title } from "@/components";

import { ModalWrapperType } from "./types";

import s from "./ModalWrapper.module.scss";

const ModalWrapper: FC<PropsWithChildren<ModalWrapperType>> = ({
    isActive,
    setIsActive,
    children,
    footer,
    title,
    fit,
}) => {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const closeModal = () => {
        setIsOpened(false);

        setTimeout(() => {
            setIsActive(false);
        }, 500);

        document.body.classList.remove("_lock");
    };

    useEffect(() => {
        if (isActive) {
            document.body.classList.add("_lock");
            setTimeout(() => {
                setIsOpened(isActive);
            }, 500);
        }
    }, [isActive]);

    if (typeof window !== "object" || (!isOpened && !isActive)) {
        return null;
    }

    return createPortal(
        <div
            className={`${s.modal}${
                isOpened && isActive ? ` ${s.active}` : ""
            }`}
        >
            <div className={`${s.modalContent}${fit ? ` ${s.fit}` : ""}`}>
                <button className={s.modalContentClose} onClick={closeModal}>
                    <span />
                    <span />
                </button>
                {title ? (
                    <div className={s.modalContentTitle}>
                        <Title
                            type={"h3"}
                            text={title}
                            _className={s.modalContentTitleCurrent}
                        />
                    </div>
                ) : (
                    <></>
                )}
                <div className={s.modalContentWrapper}>{children}</div>
                {footer ? (
                    <div className={s.modalContentFooter}>{footer}</div>
                ) : (
                    <></>
                )}
            </div>
            <div className={s.modalBg} onClick={closeModal} />
        </div>,
        document.body
    );
};

export default ModalWrapper;
