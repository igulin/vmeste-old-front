import React, { useState } from "react";

import { Input, Title } from "@/components";
import { Button } from "@/buttons";

import s from "./ProfileSettingsDelivery.module.scss";

const ProfileSettingsDelivery: React.FC = () => {
    const [organizationName, setOrganizationName] = useState("");
    const [shortOrganizationName, setShortOrganizationName] = useState("");
    const [lawAddress, setLawAddress] = useState("");
    const [mailAdress, setMailAddress] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [okved, setOkved] = useState("");
    const [ogrn, setOgrn] = useState("");
    const [inn, setInn] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        // TODO добавить сохранение инфы о поставщике
    };

    return (
        <>
            <Title
                text={"Детали о поставщике"}
                type={"h3"}
                style={{
                    margin: "20px 0",
                }}
            />
            <form className={s.delivery} onSubmit={submitHandler}>
                <Input
                    placeholder={"Полное наименование организации"}
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    _className={s.deliveryInput}
                />
                <Input
                    placeholder={"Сокращенное наименование организации"}
                    value={shortOrganizationName}
                    onChange={(e) => setShortOrganizationName(e.target.value)}
                    _className={s.deliveryInput}
                />
                <Input
                    placeholder={"Юридический адрес"}
                    value={lawAddress}
                    onChange={(e) => setLawAddress(e.target.value)}
                    _className={s.deliveryInput}
                />
                <Input
                    placeholder={"Почтовый адрес"}
                    value={mailAdress}
                    onChange={(e) => setMailAddress(e.target.value)}
                    _className={s.deliveryInput}
                />
                <Input
                    placeholder={"Фактический адрес, адрес доставки"}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    _className={s.deliveryInput}
                />
                <Input
                    placeholder={"ОКВЭД"}
                    value={okved}
                    onChange={(e) => setOkved(e.target.value)}
                    _className={s.deliveryInput}
                />
                <Input
                    placeholder={"ОГРН"}
                    value={ogrn}
                    onChange={(e) => setOgrn(e.target.value)}
                    _className={s.deliveryInput}
                />
                <Input
                    placeholder={"ИНН"}
                    value={inn}
                    onChange={(e) => setInn(e.target.value)}
                    _className={s.deliveryInput}
                />
                <Input
                    type={"tel"}
                    placeholder={"Контактный телефон"}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    _className={s.deliveryInput}
                />
                <Input
                    type={"email"}
                    placeholder={"Электронная почта"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    _className={s.deliveryInput}
                />
                <Button
                    text={"Сохранить"}
                    type={"submit"}
                    _className={s.deliveryButton}
                />
            </form>
        </>
    );
};

export default ProfileSettingsDelivery;
