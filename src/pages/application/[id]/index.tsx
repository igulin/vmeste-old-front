import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { AccessError, Container, Line, MainWrapper, Title } from "@/components";
import {
    ApplicationPageEvents,
    ApplicationPageInvite,
    ApplicationPageLeave,
    ApplicationPageMembers,
    ApplicationPageAddEvent,
} from "@/pages/ApplicationPage";
import { Button } from "@/buttons";
import {
    ApplicationAdditionalInfo,
    ApplicationInfo,
    CandidateInfo,
} from "@/components/ApplicationComponents";
import {
    useGetQuoteDetails,
    useGetOrganizerQuote,
} from "@/redux/api/quote.api";
import { useAppSelector } from "@/hooks";
import { selectIsAuth, selectUserData } from "@/redux/slices/auth/auth.slice";
import formatDate from "@/utils/formatDate";
import ApplicationPageJoin from "@/pages/ApplicationPage/ApplicationPageJoin";

const ApplicationPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { isLoading, isError, data } = useGetQuoteDetails(id, {
        pollingInterval: 3000,
    });
    const organizerQuote = useGetOrganizerQuote(data?.createrId);
    const isAuth = useAppSelector(selectIsAuth);
    const userData = useAppSelector(selectUserData);
    const isOrganizer = userData && userData.id === data?.createrId;

    return (
        <>
            <Head>
                <title>{`Страница заявки ${data?.name || ""}`}</title>
                <meta
                    name="description"
                    content={`Страница заявки ${data?.name || ""}`}
                />
            </Head>
            <MainWrapper>
                <Container>
                    {!isError ? (
                        <>
                            {!isLoading ? (
                                <>
                                    <Title
                                        type={"h1"}
                                        text={data.name}
                                        style={{
                                            margin: "0 0 25px 0",
                                        }}
                                    />
                                    <CandidateInfo user={organizerQuote.data} />
                                    <ApplicationAdditionalInfo
                                        createDate={formatDate(
                                            data.createAt,
                                            "dd.MM.yyyy"
                                        )}
                                        city={data.country_name}
                                        price={data.comission}
                                    />
                                    <ApplicationInfo
                                        totalPrice={data.price}
                                        minimalPrice={data.min_amount}
                                        description={data.description}
                                        endDate={formatDate(
                                            data.realization_period
                                        )}
                                    />
                                    {isOrganizer ? (
                                        <>
                                            <Line />
                                            <ApplicationPageAddEvent />
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <Line />
                                    <Button
                                        text={"Чат"}
                                        theme={"white"}
                                        link={`/application/chat/${router.query.id}`}
                                        style={{
                                            width: "100%",
                                        }}
                                    />
                                    <ApplicationPageInvite />
                                    <Line />
                                    <ApplicationPageMembers
                                        users={data.users}
                                    />
                                    <ApplicationPageEvents
                                        events={data.events}
                                    />

                                    {isAuth &&
                                    userData &&
                                    data.users.filter(
                                        (data: { userId: number }) =>
                                            data.userId === userData?.id
                                    ).length === 0 ? (
                                        <ApplicationPageJoin
                                            quoteId={data.id}
                                        />
                                    ) : (
                                        <ApplicationPageLeave
                                            quoteId={data.id}
                                        />
                                    )}
                                </>
                            ) : (
                                <AccessError loading />
                            )}
                        </>
                    ) : (
                        <AccessError text={"Данная заявка не существует"} />
                    )}
                </Container>
            </MainWrapper>
        </>
    );
};

export default ApplicationPage;
