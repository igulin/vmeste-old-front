import s from "./CompanyInfoProvider.module.scss";

export interface IDetailItem {
    title: string;
    text: string;
}

const DetailItem: React.FC<IDetailItem> = ({ title, text }) => {
    return (
        <div className={s.companyDetail}>
            <h5 className={s.companyDetailTitle}>{title}</h5>
            <p className={s.companyDetailText}>{text}</p>
        </div>
    );
};

export default DetailItem;
