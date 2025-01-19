import { Container, MainWrapper } from "@/components";

import { useRouter } from "next/router";
import { CategoryPageOtherView, CategoryToggle } from "@/pages/CategoryPage";
import Head from "next/head";
import { useEffect, useState } from "react";
import { SocketApi } from "@/api/socket-api";
import { RequestItemType } from "@/components/RequestItem/types";
import CategoryPageItems from "@/pages/CategoryPage/CategoryPageItems";
import { IMessageItem } from "@/components/ChatComponents/MessageItem/types";

const CategoryPage = () => {
    const router = useRouter();
    const [quotes, setQuotes] = useState<RequestItemType[]>([]);
    const [requests, setRequests] = useState<IMessageItem[]>([]);
    const [otherView, setOtherView] = useState<boolean>(false);
    const categoryName = router.query.type
        ? router.query.type
        : router.query.id;

    useEffect(() => {
        SocketApi.createConnection("");
    }, [SocketApi]);

    useEffect(() => {
        if (router.isReady) {
            SocketApi.socket?.emit("events:handle-quotes", {
                submane: categoryName,
                rating: router.query.rating,
            });
            SocketApi.socket?.on("events:quote", (data) => {
                setQuotes([...data]);
            });
        }
    }, [router]);

    useEffect(() => {
        SocketApi.socket?.emit("message:fetch-all-messages", {
            submane: String(router.query.id),
        });
        SocketApi.socket?.on("message:update-all-messages", (data) => {
            setRequests([...data]);
        });
    }, [router]);

    return (
        <>
            <Head>
                <title>Название категории</title>
                <meta
                    name="description"
                    content="Страница для создания заявки"
                />
            </Head>
            <MainWrapper>
                <Container>
                    <CategoryToggle
                        otherView={otherView}
                        setOtherView={setOtherView}
                    />

                    {!otherView ? (
                        <CategoryPageOtherView
                            items={quotes}
                            requests={requests}
                        />
                    ) : (
                        <CategoryPageItems items={quotes} />
                    )}
                </Container>
            </MainWrapper>
        </>
    );
};

export default CategoryPage;
