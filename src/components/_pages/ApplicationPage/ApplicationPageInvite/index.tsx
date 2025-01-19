import React, { useState } from "react";
import { Button } from "@/buttons";
import { ModalWrapper } from "@/modals";
import s from "./ApplicationPageInvite.module.scss";

const ApplicationPageInvite: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const toggleInviteModal = () => setIsActive(!isActive);

    const copyLink = async () => {
        navigator.clipboard
            .writeText(window.location.href)
            .then(() => {
                setIsCopied(true);
            })
            .catch(() => {
                setIsCopied(false);
            });
    };

    return (
        <>
            <Button
                text={"Пригласить участников"}
                onClick={toggleInviteModal}
                _className={s.inviteButton}
            />
            {isActive ? (
                <ModalWrapper
                    isActive={isActive}
                    setIsActive={setIsActive}
                    title={"Пригласить участников"}
                    fit
                    footer={
                        <Button
                            text={
                                !isCopied
                                    ? "Скопировать ссылку"
                                    : "Успешно скопировано!"
                            }
                            onClick={copyLink}
                            style={{
                                width: "100%",
                            }}
                        />
                    }
                >
                    <p className={s.inviteText}>
                        Нажмите на кнопку ниже, чтобы скопировать ссылку и
                        отправить Вашему контакту.
                        <br />
                        <br />
                        После того, как он примет заявку на вступление, то сразу
                        появится в списке участников.
                    </p>
                </ModalWrapper>
            ) : (
                <></>
            )}
        </>
    );
};

export default ApplicationPageInvite;
