import {
    MainWrapper,
    Select,
    Title,
    Container,
    AccessError,
} from "@/components";
import { useAppDispatch, useAppSelector, useAuthCheck } from "@/hooks";
import { nanoid } from "nanoid";
import Head from "next/head";

import { userRoles } from "@/common";
import {
    selectUserAvatar,
    selectUserDataRole,
    setUserRole,
} from "@/redux/slices/auth/auth.slice";
import { SelectItemType } from "@/components/Select/types";
import { UserRoleType } from "@/types/API";

import axios from "@/axios";
import { toast } from "react-toastify";
import {
    ProfileSettingsAvatar,
    ProfileSettingsDelivery,
} from "@/pages/ProfileSettingsPage";
import { useRouter } from "next/router";
import { useCallback } from "react";

const ProfileSettingsPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const isAvailable = useAuthCheck();

    const userRole = useAppSelector(
        (state) => state.auth.data?.accountCategory
    );
    const userAvatar = useAppSelector(selectUserAvatar);

    const changeRoleHandler = useCallback(
        async (roleItem: SelectItemType<UserRoleType>) => {
            try {
                const res = await axios.post("/api/auth/update-role", {
                    new_role: roleItem.value,
                });

                if (!res || !res.data) {
                    return;
                }

                toast.success("Роль успешно изменена");

                dispatch(setUserRole(res.data));

                router.push("/profile");
            } catch (error) {
                toast.error("Не удалось сменить роль");
            }
        },
        [userRole]
    );

    return (
        <>
            <Head>
                <title>Настройки профиля</title>
                <meta
                    name="description"
                    content="Профиль с настройками пользователя"
                />
            </Head>
            <MainWrapper>
                <Container>
                    {isAvailable ? (
                        <>
                            <ProfileSettingsAvatar />
                            {userRole ? (
                                <>
                                    <Title
                                        text="Сменить роль"
                                        type="h2"
                                        style={{ margin: "20px 0" }}
                                    />
                                    <Select
                                        type="default"
                                        currentItem={{
                                            text: userRoles.filter(
                                                (el) => el.value === userRole
                                            )[0]?.text,
                                            value: userRole,
                                        }}
                                        setCurrentItem={changeRoleHandler}
                                        items={userRoles}
                                        placeholder="Ваша роль"
                                    />
                                    {userRole === "USER_DELIVERY" || true ? (
                                        <ProfileSettingsDelivery />
                                    ) : (
                                        <></>
                                    )}
                                </>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <AccessError />
                    )}
                </Container>
            </MainWrapper>
        </>
    );
};

export default ProfileSettingsPage;
