import { useRouter } from "next/router";

import { AccessError, MainWrapper } from "@/components";
import { CreateEditApplicationPage } from "@/pages/index";
import Head from "next/head";
import { useAuthCheck } from "@/hooks";

const ApplicationEditPage = () => {
    const router = useRouter();

    const isAvailable = useAuthCheck("USER_ORDINARY");

    return (
        <>
            <Head>
                <title>Редактирование заявки</title>
                <meta
                    name="description"
                    content="Страница для редактирования заявки"
                />
            </Head>
            <MainWrapper>
                {isAvailable ? (
                    <CreateEditApplicationPage id={router.query.id} />
                ) : (
                    <AccessError />
                )}
            </MainWrapper>
        </>
    );
};

export default ApplicationEditPage;
