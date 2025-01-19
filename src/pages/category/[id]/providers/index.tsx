import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import { Container, GridComponent, MainWrapper, UserCard } from "@/components";
import { useGetProvidersByCategory } from "@/redux/api/category.api";
import { AccessError } from "@/components";

const ProvidersPage = () => {
    const router = useRouter();
    const { data, isLoading } = useGetProvidersByCategory(
        String(router.query.id)
    );
    const [providers, setProviders] = useState<any[]>([]);

    useEffect(() => {
        setProviders(data);
    }, [data, router]);

    console.log(data)

    return (
        <>
            <Head>
                <title>Поставщики</title>
                <meta name="description" content="Страница поставщиков" />
            </Head>
            <MainWrapper>
                <Container>
                    <GridComponent>
                        {!isLoading ? (
                            providers &&
                            providers.map((provider: any) => (
                                <UserCard
                                    key={provider?.id}
                                    name={provider?.name}
                                    image={provider?.photo_url}
                                    rating={5}
                                    big
                                />
                            ))
                        ) : (
                            <AccessError loading />
                        )}
                    </GridComponent>
                </Container>
            </MainWrapper>
        </>
    );
};
export default ProvidersPage;
