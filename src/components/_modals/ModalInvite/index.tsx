import { ModalWrapper } from "..";
import { Button } from "@/buttons";
import { Line } from "@/components";
import {
    CandidateInfo,
    ApplicationInfo,
    ApplicationAdditionalInfo,
} from "@/components/ApplicationComponents";
import MembersInfo from "./MembersInfo";
import { ModalWrapperShowType } from "../ModalWrapper/types";
import {
    useGetOrganizerQuote,
    useGetQuoteDetails,
} from "@/redux/api/quote.api";
import { useAppSelector } from "@/hooks";
import { selectUserData } from "@/redux/slices/auth/auth.slice";
import formatDate from "@/utils/formatDate";
import QuoteApi from "@/api/quote/quote-api";
import { toast } from "react-toastify";
import { SocketApi } from "@/api/socket-api";

interface IModalInvite extends ModalWrapperShowType {
    invite: any;
    id: number;
}

const ModalInvite: React.FC<IModalInvite> = ({ isActive, setIsActive, id }) => {
    const userData = useAppSelector(selectUserData);
    const { data } = useGetQuoteDetails(String(id));
    const organizerQuote = useGetOrganizerQuote(data?.createrId);

    const acceptInvite = async () => {
        if (userData?.id === data.createrId) {
            toast.error("Вы уже там есть");
            setIsActive(false);
            document.body.classList.remove("_lock");
            return null;
        }

        const res = await QuoteApi.connectUserOnQuote(data.id);

        if (!res) {
            toast.error("Возникла ошибка при попытке входа в заявку");
        }

        toast.success("Вы успешно вошли в заявку");
        setIsActive(false);
        document.body.classList.remove("_lock");
    };

    if (!data) {
        return null;
    }

    return (
        <ModalWrapper
            isActive={isActive}
            setIsActive={setIsActive}
            title={"Приглашение"}
            footer={
                <Button
                    text={"Присоединиться"}
                    onClick={acceptInvite}
                    style={{
                        width: "100%",
                    }}
                />
            }
        >
            <CandidateInfo
                titleColor={"rgb(255, 255, 255)"}
                user={organizerQuote.data}
            />
            <ApplicationAdditionalInfo
                createDate={formatDate(data.createAt, "dd.MM.yyyy")}
                city={data.city_name}
                price={data.comission}
            />
            <ApplicationInfo
                totalPrice={data.min_amount}
                minimalPrice={data.min_amount}
                description={data.description}
                endDate={formatDate(data.realization_period)}
                titleColor={"rgb(255, 255, 255)"}
            />
            <Line />
            <MembersInfo users={data.users} />
        </ModalWrapper>
    );
};

export default ModalInvite;
