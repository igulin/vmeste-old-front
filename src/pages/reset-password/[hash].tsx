import React, {useCallback, useState} from 'react';
import {useRouter} from "next/router";
import {Container, Input, MainWrapper} from "@/components";
import Head from "next/head";
import {Button} from "@/buttons";
import s from "./ResetPassword.module.scss"
import AuthService from "@/api/auth/auth.service";
import {toast} from "react-toastify";


const Hash = () => {
    const [newPassword, setNewPassword] = useState("")
    const [againPassword, setAgainPassword] = useState("")
    const router = useRouter()

    console.log(newPassword)
    console.log(againPassword)

    const handleClick = useCallback(async () => {
        if (!newPassword.trim()) {
            return toast.error('Введите новый пароль')
        }

        if (!againPassword.trim()) {
            return toast.error('Повторите новый пароль')
        }

        if (newPassword.length < 8) {
            return toast.error('Пароль должен быть больше 8 символов')
        }

        if (newPassword !== againPassword) {
            return toast.error('Пароли должны совпадать')
        }

        const data = await AuthService.resetPassword({
            newPassword,
            againPassword,
            hash: String(router.query.hash),
            token: String(router.query.t)
        })
        toast.success('Пароль успешно сменен')
        await router.push('/')
    }, [againPassword, newPassword])

    return (
        <>
            <Head>
                <title>Страница сброса пароля</title>
                <meta
                    name="description"
                    content={`Страница сброса пароля`}
                />
            </Head>
            <MainWrapper>
                <Container>
                    <div className={s.resetPassword}>
                        <Input type="password" placeholder='Новый пароль' value={newPassword}
                               onChange={(e) => setNewPassword(e.target.value)}/>
                        <Input type='password' placeholder='Повторите пароль' value={againPassword}
                               onChange={(e) => setAgainPassword(e.target.value)}/>
                    </div>
                    <Button disabled={newPassword.length < 8 && againPassword.length < 8} type="submit" _className={s.resetPasswordButton} onClick={handleClick}>
                        Отправить
                    </Button>
                </Container>
            </MainWrapper></>
    )
};

export default Hash;