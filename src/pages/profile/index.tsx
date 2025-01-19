"use client";
import { AccessError, Container, MainWrapper } from "@/components";
import {
    ProfilePageAvatar,
    ProfilePageInfo,
    ProfilePageInfoWrapper,
    ProfilePageLogout,
    ProfilePageRequests,
} from "@/pages/ProfilePage";
import Head from "next/head";
import { useAppSelector, useAuthCheck } from "@/hooks";
import { ProductsProvider } from "@/pages/ProviderProfilePage";
import { Button } from "@/buttons";
import { useGetQuotesById } from "@/redux/api/quote.api";
import { useEffect, useState } from "react";
import { SocketApi } from "@/api/socket-api";

const ProfilePage = () => {
    const userData = useAppSelector((store) => store.auth.data);
    const userRole = userData?.accountCategory;
    const isAvailable = useAuthCheck(userRole);
    const userQuotes = useGetQuotesById(Number(userData?.id));
    const [userInvites, setUserInvites] = useState<{ invites: any }[]>([]);

    useEffect(() => {
        if (!userData) return;
        SocketApi.createConnection(String(userData.id));
        SocketApi.socket?.emit("invite:get-my-invites", userData?.id);
        SocketApi.socket?.on("invite:invite-send", ({ invites }) => {
            setUserInvites(invites);
        });
    }, [userData]);

    return (
        <>
            <Head>
                <title>Профиль</title>
                <meta
                    name="description"
                    content="Профиль с настройками пользователя"
                />
            </Head>
            <MainWrapper>
                <Container>
                    {isAvailable && userData ? (
                        <>
                            <ProfilePageInfoWrapper>
                                <ProfilePageAvatar
                                    image={userData.photo_url}
                                    userName={userData.name}
                                />
                                <ProfilePageInfo
                                    userName={userData.name}
                                    balance={userData.balance}
                                    role={userData.accountCategory}
                                    isMyProfile
                                />
                            </ProfilePageInfoWrapper>
                            {userData.accountCategory === "USER_ORDINARY" ? (
                                <ProfilePageRequests
                                    invites={userInvites}
                                    requests={userQuotes.data}
                                />
                            ) : (
                                <></>
                            )}
                            {userData.accountCategory === "USER_MODERATOR" && (
                                <>
                                    <ProfilePageRequests
                                        invites={userInvites}
                                        requests={userQuotes.data}
                                    />
                                </>
                            )}
                            {userData.accountCategory === "USER_DELIVERY" ? (
                                <ProductsProvider products={userQuotes.data} />
                            ) : (
                                <></>
                            )}
                            {userData.accountCategory === "USER_ADMIN" ? (
                                <Button
                                    text={"В админ панель"}
                                    link={"/admin"}
                                    style={{
                                        width: "100%",
                                        margin: "20px 0 0 0",
                                    }}
                                />
                            ) : (
                                <></>
                            )}
                            <ProfilePageLogout />
                        </>
                    ) : (
                        <AccessError text="Авторизуйтесь, чтобы увидеть эту страницу" />
                    )}
                </Container>
            </MainWrapper>
        </>
    );
};

export default ProfilePage;
