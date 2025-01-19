import { useAuthCheck } from "@/hooks";
import { useRouter } from "next/router";
import Head from "next/head";

import { MainWrapper, Title, Container, AccessError } from "@/components";
import { CreateRequestForm } from "@/pages/CreateRequestPage";

const RequestEditPage = () => {
    const isAvailable = useAuthCheck("USER_ORDINARY");

    const router = useRouter();

    const { id } = router.query;

    return (
        <>
            <Head>
                <title>Создание заявки</title>
                <meta
                    name="description"
                    content="Страница для создания заявки"
                />
            </Head>
            <MainWrapper>
                <Container>
                    {isAvailable ? (
                        <>
                            <Title
                                text={"Редактирование запроса"}
                                type={"h1"}
                            />
                            <CreateRequestForm id={id} />
                        </>
                    ) : (
                        <AccessError />
                    )}
                </Container>
            </MainWrapper>
        </>
    );
};

export default RequestEditPage;
