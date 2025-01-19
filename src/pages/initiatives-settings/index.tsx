import { Container, MainWrapper } from "@/components";
import Content from "./Content";
import Head from "next/head";

const VacationSettingsPage = () => {
    return (
        <>
            <Head>
                <title>Выбор типа профсоюза</title>
                <meta
                    name="description"
                    content="Страница для выбора типа профсоюза"
                />
            </Head>
            <MainWrapper>
                <Container>
                    <Content />
                </Container>
            </MainWrapper>
        </>
    );
};

export default VacationSettingsPage;
