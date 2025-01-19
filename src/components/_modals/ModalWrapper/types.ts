import { ReactNode } from "react";

export interface ModalWrapperShowType {
    isActive: boolean;
    setIsActive: (value: boolean) => void;
}

export interface ModalWrapperType extends ModalWrapperShowType {
    footer?: ReactNode;
    title?: string;
    fit?: boolean;
}
