import Head from "next/head";
import { useAppSelector } from "@/hooks";

import { useRouter } from "next/router";

import { AccessError, Container, MainWrapper } from "@/components";
import {
    ProfilePageAvatar,
    ProfilePageInfo,
    ProfilePageInfoWrapper,
} from "@/components/_pages/ProfilePage";
import {
    CompanyInfoProvider,
    ProductsProvider,
} from "@/pages/ProviderProfilePage";
import { selectUserData } from "@/redux/slices/auth/auth.slice";
import { useGetUserById } from "@/redux/api/user.api";

const ProfilePageById = () => {
    const userData = useAppSelector(selectUserData);

    const router = useRouter();

    const { id } = router.query;

    if (Number(id) === userData?.id) {
        router.push("/profile");
    }

    const { data, isLoading } = useGetUserById(id);

    return (
        <>
            <Head>
                <title>Профиль</title>
                <meta
                    name="description"
                    content="Профиль с настройками пользователя"
                />
            </Head>
            <MainWrapper>
                <Container>
                    {data ? (
                        <ProfilePageInfoWrapper>
                            <ProfilePageAvatar
                                image={data.photo_url}
                                userName={data.name}
                            />
                            <ProfilePageInfo
                                userName={data.name}
                                rating={5}
                                role={data.accountCategory}
                                inviteUserId={Number(id)}
                            />
                        </ProfilePageInfoWrapper>
                    ) : isLoading ? (
                        <AccessError text="Загрузка" />
                    ) : (
                        <AccessError text="Такого пользователя не существует" />
                    )}
                    <ProductsProvider products={[]} />
                    <CompanyInfoProvider />
                </Container>
            </MainWrapper>
        </>
    );
};

export default ProfilePageById;
