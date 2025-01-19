import { useAuthCheck } from "@/hooks";

import Head from "next/head";

import { MainWrapper, Title, Container, AccessError } from "@/components";
import { CreateRequestForm } from "@/pages/CreateRequestPage";

const RequestCreatePage = () => {
    const isAvailable = useAuthCheck("USER_ORDINARY");

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
                            <Title text={"Создание запроса"} type={"h1"} />
                            <CreateRequestForm />
                        </>
                    ) : (
                        <AccessError />
                    )}
                </Container>
            </MainWrapper>
        </>
    );
};

export default RequestCreatePage;
