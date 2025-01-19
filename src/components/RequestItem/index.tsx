"use client";
import React, { FC, useState } from "react";

import Content from "./Content";
import { ModalInvite } from "@/modals";

import { RequestItemType } from "./types";

import s from "./RequestItem.module.scss";
import Link from "next/link";

const RequestItem: FC<RequestItemType> = ({
    invite,
    id,
    name,
    description,
    photo_url,
    status,
    min_amount,
    isInvite,
    _className,
}) => {
    const [isActive, setIsActive] = useState(false);

    const className = `${s.requestItemLink}${
        _className ? ` ${_className}` : ""
    }`;

    if (isInvite) {
        return (
            <>
                <button className={className} onClick={() => setIsActive(true)}>
                    <Content
                        id={id}
                        photo_url={photo_url}
                        name={name}
                        description={description}
                        min_amount={min_amount}
                        status={status}
                    />
                </button>
                {isActive ? (
                    <ModalInvite
                        invite={invite}
                        id={id}
                        isActive={isActive}
                        setIsActive={setIsActive}
                    />
                ) : (
                    <></>
                )}
            </>
        );
    }

    return (
        <Link
            href={status === "opened" ? `/application/${id}` : `#`}
            className={className}
        >
            <Content
                id={id}
                photo_url={photo_url}
                name={name}
                description={description}
                min_amount={min_amount}
                status={status}
            />
        </Link>
    );
};

export default RequestItem;
