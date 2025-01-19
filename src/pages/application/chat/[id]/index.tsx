import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { AccessError, Container, MainWrapper } from "@/components";
import {
    ApplicationChatInput,
    ApplicationChatMessages,
    ApplicationChatWrapper,
} from "@/pages/ApplicationChatPage";

import { useGetMessagesByQuote } from "@/redux/api/message.api";
import useAppSelector from "@/hooks/useAppSelector";
import { selectUserDataId } from "@/redux/slices/auth/auth.slice";
import { useGetQuoteDetails } from "@/redux/api/quote.api";

const ApplicationChatPage = () => {
    const userId = useAppSelector(selectUserDataId);
    const router = useRouter();
    const data = useGetQuoteDetails(String(router.query.id));
    const { isLoading, isError } = useGetMessagesByQuote(
        Number(router.query.id)
    );

    return (
        <>
            <Head>
                <title>Чат</title>
                <meta
                    name="description"
                    content="Страница для редактирования заявки"
                />
            </Head>
            <MainWrapper>
                <Container>
                    {!isError ? (
                        <>
                            {!isLoading ? (
                                <ApplicationChatWrapper>
                                    <ApplicationChatMessages userId={userId} />
                                    <ApplicationChatInput
                                        createrId={data.data.createrId}
                                    />
                                </ApplicationChatWrapper>
                            ) : (
                                <AccessError loading />
                            )}
                        </>
                    ) : (
                        <AccessError text="Данный чат не существует либо вы не имеете доступов к нему" />
                    )}
                </Container>
            </MainWrapper>
        </>
    );
};

export default ApplicationChatPage;
