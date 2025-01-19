import { AccessError, MainWrapper } from "@/components";
import { CreateEditApplicationPage } from "@/pages/index";
import Head from "next/head";
import { useAuthCheck } from "@/hooks";

const ApplicationCreatePage = () => {
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
                {isAvailable ? <CreateEditApplicationPage /> : <AccessError />}
            </MainWrapper>
        </>
    );
};

export default ApplicationCreatePage;
