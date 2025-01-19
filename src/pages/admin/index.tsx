import { useAuthCheck } from "@/hooks";
import Head from "next/head";

import { AccessError, Container, MainWrapper } from "@/components";
import { AdminPageCreateCategory } from "@/pages/AdminPage";

const AdminPage = () => {
    const isAvailable = useAuthCheck("USER_ADMIN");

    return (
        <>
            <Head>
                <title>Админ панель</title>
                <meta name="description" content="Админ панель" />
            </Head>
            <MainWrapper>
                <Container>
                    {isAvailable ? (
                        <>
                            <AdminPageCreateCategory />
                        </>
                    ) : (
                        <AccessError />
                    )}
                </Container>
            </MainWrapper>
        </>
    );
};

export default AdminPage;
