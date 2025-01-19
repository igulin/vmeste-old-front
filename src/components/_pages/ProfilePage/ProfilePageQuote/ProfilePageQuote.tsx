import { FC, useCallback, useEffect, useState } from "react";
import s from "./ProfilePageQuote.module.scss";
import Image from "next/image";
import { Button } from "@/components/_buttons";
import InviteApi from "@/api/invites/invite-api";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks";
import { selectUserDataId } from "@/redux/slices/auth/auth.slice";
import { toast } from "react-toastify";

interface IProfilePageQuote {
    quote: any;
}

const ProfilePageQuote: FC<IProfilePageQuote> = ({ quote }) => {
    const [isChoosed, setIsChoosed] = useState<boolean>(true);
    const { query } = useRouter();
    const myUserId = useAppSelector(selectUserDataId);
    const userId: number = Number(query.id);
    const invite = quote.invites
        .filter(
            (invite: { quoteId: number; createrId: number }) =>
                invite.quoteId === quote.id && invite.createrId === myUserId
        )
        .pop();

    if (!userId && !myUserId) {
        return <></>;
    }

    if (!quote && !quote.creater) {
        return <></>;
    }

    const handleInvite = useCallback(async () => {
        try {
            const data = await InviteApi.create({
                quoteId: quote.id,
                userId: userId,
                description: quote.description,
            });

            setIsChoosed(false);
        } catch (err) {
            toast.error("Произошла ошибка");
            return;
        }
    }, []);

    const handleDeleteInvite = useCallback(async () => {
        if (!myUserId) return null;

        if (!invite) return null;

        try {
            const data = await InviteApi.delete({
                userId: myUserId,
                inviteId: String(invite.id),
            });

            setIsChoosed(true);
        } catch (err) {
            toast.error("Произошла ошибка");
            return;
        }
    }, []);

    useEffect(() => {
        if (
            quote.invites.filter(
                (invite: { createrId: number }) => invite.createrId === myUserId
            ).length >= 1
        ) {
            setIsChoosed(false);
        }
    }, [userId, myUserId]);

    return (
        <div className={s.root}>
            <div className={s.leftRoot}>
                <div className={s.image}>
                    <Image
                        src={quote.photo_url}
                        alt={quote.name}
                        width={50}
                        height={50}
                    />
                </div>
                <div className={s.info}>
                    <div className={s.title}>{quote.name}</div>
                    <div
                        className={`${s.status} ${
                            quote.status === "opened" ? s.opened : s.closed
                        }`}
                    >
                        {quote.status}
                    </div>
                </div>
            </div>
            <Button
                type="button"
                text={isChoosed ? "Пригласить" : "Отозвать приглашение"}
                _className={s.button}
                onClick={isChoosed ? handleInvite : handleDeleteInvite}
                theme={isChoosed ? "blue" : "red"}
            />
        </div>
    );
};

export default ProfilePageQuote;
