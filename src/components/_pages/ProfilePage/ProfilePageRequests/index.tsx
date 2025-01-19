import { useState, useEffect } from "react";
import { Title, RequestItem, GridComponent } from "@/components";
import { RequestItemType } from "@/components/RequestItem/types";
import s from "./ProfilePageRequests.module.scss";
import { uniqueIdHandler } from "@/usable";
import { Button } from "@/components/_buttons";
import { selectUserData } from "@/redux/slices/auth/auth.slice";
import { useAppSelector } from "@/hooks";
import { ModalWrapper } from "@/components/_modals";

interface IProfilePageRequests {
    requests: RequestItemType[];
    invites: any[];
}

const ProfilePageRequests: React.FC<IProfilePageRequests> = ({
    requests,
    invites,
}) => {
    const [requestItems, setRequestItems] = useState<RequestItemType[]>([]);
    const [inviteItems, setInviteItems] = useState<any[]>([]);
    const userData = useAppSelector(selectUserData);

    useEffect(() => {
        setRequestItems(uniqueIdHandler(requests));
    }, [requests]);

    useEffect(() => {
        invites &&
            invites.map((invite) => {
                if (userData && invite.user_to.id === userData.id) {
                    invites.length === 1
                        ? setInviteItems([invite.quote])
                        : setInviteItems((prev) => [...prev, invite.quote]);
                }
            });
    }, [invites]);

    return (
        <>
            <div className={s.request}>
                <Title type={"h3"} text={"Мои приглашения"} />
                {inviteItems && inviteItems.length ? (
                    <div className={s.requestBlock}>
                        <GridComponent _className={s.requestItems}>
                            {inviteItems.map((item) => (
                                <RequestItem
                                    invite={item}
                                    key={item.id}
                                    id={item.id}
                                    photo_url={item.photo_url}
                                    name={item.name}
                                    description={item.description}
                                    status={item.status}
                                    min_amount={item.min_amount}
                                    isInvite
                                />
                            ))}
                        </GridComponent>
                    </div>
                ) : (
                    <>
                        <div
                            className={s.requestBlockError}
                            style={{ padding: "0 0 25px 0" }}
                        >
                            <p className={s.requestBlockErrorText}>
                                Заявок пока что нет
                            </p>
                        </div>
                    </>
                )}
                <div className={s.requestBlock}>
                    <Title type={"h3"} text={"Мои заявки"} />
                    {requestItems && requestItems.length ? (
                        <GridComponent _className={s.requestItems}>
                            {requestItems.map((item) => (
                                <RequestItem
                                    key={item.id}
                                    id={item.id}
                                    photo_url={item.photo_url}
                                    name={item.name}
                                    description={item.description}
                                    status={item.status}
                                    min_amount={item.min_amount}
                                />
                            ))}
                        </GridComponent>
                    ) : (
                        <div className={s.requestBlockError}>
                            <p className={s.requestBlockErrorText}>
                                Заявок пока что нет
                            </p>
                            <Button
                                text={"Создать"}
                                link="/request/create"
                                style={{
                                    width: "100%",
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProfilePageRequests;
