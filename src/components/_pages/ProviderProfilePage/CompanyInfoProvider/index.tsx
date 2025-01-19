import { useState } from "react";

import s from "./CompanyInfoProvider.module.scss";
import { ModalWrapper } from "@/components/_modals";
import DetailItem, { IDetailItem } from "./DetailItem";

const details: IDetailItem[] = [
    {
        title: "Полное наименование организации (в соответствии с уставом)",
        text: "Общество с ограниченной ответственностью  «Целевики»",
    },
    {
        title: "Сокращенное наименование организации",
        text: "ООО «Целевики »",
    },
    {
        title: "Юридический адрес",
        text: "420057 , РТ, г. Казань, ул. Вересаева д10 корп1 помещ2",
    },
    {
        title: "Почтовый адрес",
        text: "420057 , РТ, г. Казань, ул. Вересаева д10 корп1 помещ2",
    },
    {
        title: "Фактический адрес, адрес доставки",
        text: "420057 , РТ, г. Казань, ул. Обнорского 24",
    },
    {
        title: "ОКВЭД",
        text: "82.99 ОКПО 55336612 ОКАТО 92401363000 ОКТМО 92701000001 ОКФС 16  Частная собственность ОКОГУ 4210014",
    },
    {
        title: "ОГРН",
        text: "1211600052454",
    },
    {
        title: "ИНН / КПП",
        text: "1661070305 / 166101001",
    },
    {
        title: "Контактные телефоны",
        text: "89270391847",
    },
    {
        title: "Электронная почта",
        text: "letotyt@bk.ru",
    },
];

const CompanyInfoProvider: React.FC = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <>
            <button
                className={s.companyButton}
                onClick={() => setIsActive(true)}
            >
                Детальная информация о поставщике
            </button>
            {isActive ? (
                <ModalWrapper
                    isActive={isActive}
                    setIsActive={setIsActive}
                    title={"Детали о поставщике"}
                    fit
                >
                    {details.map((item, index) => (
                        <DetailItem
                            key={index}
                            title={item.title}
                            text={item.text}
                        />
                    ))}
                </ModalWrapper>
            ) : (
                <></>
            )}
        </>
    );
};

export default CompanyInfoProvider;
