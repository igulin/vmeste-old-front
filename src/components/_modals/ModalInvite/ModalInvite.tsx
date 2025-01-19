import { ModalWrapper } from "..";
import { Button } from "@/buttons";
import { Line } from "@/components";
import {
    CandidateInfo,
    ApplicationInfo,
    ApplicationAdditionalInfo,
} from "@/components/ApplicationComponents";
import MembersInfo from "./MembersInfo";
import { useGetQuoteDetails } from "@/redux/api/quote.api";
import { useAppSelector } from "@/hooks";
import { selectUserData } from "@/redux/slices/auth/auth.slice";

interface IModalInvite {
    isActive: boolean;
    setIsActive: () => void;
    id: number;
}

export const ModalInvite: React.FC<IModalInvite> = ({
    isActive,
    setIsActive,
    id,
}) => {
    const { isLoading, isError, data } = useGetQuoteDetails(String(id));
    const userData = useAppSelector(selectUserData);
    const isOrganizer = userData && userData.id === data?.createrId;
    const acceptInvite = () => {};

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
            <CandidateInfo titleColor={"rgb(25, 24, 26)"} />
            <ApplicationAdditionalInfo
                createDate={"15.09.2022"}
                city={"Москва"}
                price={1000}
            />
            <ApplicationInfo
                totalPrice={5000}
                minimalPrice={500}
                description={
                    "Первые несколько строк описания. Первые несколько строк описания....Первые несколько строк описания...."
                }
                endDate={"15.04.2023"}
                titleColor={"rgb(25, 24, 26)"}
            />
            <Line />
            <MembersInfo users={data.users} />
        </ModalWrapper>
    );
};
