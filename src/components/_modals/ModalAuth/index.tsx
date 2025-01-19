import {ChangeEvent, FC, memo, useCallback, useEffect, useState} from "react";
import {ModalWrapper} from "..";
import {Button} from "@/buttons";
import {Checkbox, Input, Select} from "@/components";

import axios from "@/axios";
import {toast} from "react-toastify";

import {RegisterAPIResponse} from "@/types/API/register";

import s from "./ModalAuth.module.scss";
import {Loader} from "lucide-react";
import {userRoles} from "@/common";
import {UserRoleItemType} from "@/common/userRoles";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {
    fetchAuthUser,
    fetchLoginUser,
    selectIsAuth,
    selectIsModalActive,
    setIsModalActive,
} from "@/redux/slices/auth/auth.slice";
import Textarea from "@/components/Textarea";
import AuthService from "@/api/auth/auth.service";

export type AuthType = "login" | "reset-password" | "register" | "support" | "default";

const userRoleInitial: UserRoleItemType = userRoles[0];

const ModalAuth: FC = () => {
    const dispatch = useAppDispatch();

    const isModalActive = useAppSelector(selectIsModalActive);

    const isAuth = useAppSelector(selectIsAuth);

    const [type, setType] = useState<AuthType>("default");

    const [loading, setLoading] = useState(false);
    const [isHidden, setIsHidden] = useState<boolean>(false);

    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [accountCategory, setAccountCategory] =
        useState<UserRoleItemType>(userRoleInitial);

    const [acceptPrivacy, setAcceptPrivacy] = useState(false);

    const downloadHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.stopPropagation();
    };

    const closeHandler = useCallback(() => {
        dispatch(setIsModalActive(false));
        setType('default')
        initialValuesHandler();
        document.body.classList.remove("_lock");
    }, []);

    const initialValuesHandler = () => {
        setName("");
        setEmail("");
        setPassword("");
        setPasswordAgain("");
        setText("");
        setAccountCategory(userRoleInitial);
    };

    const authHandler = () => {
        const loginHandler = async () => {
            if (!email.trim()) {
                return toast.error("Введите почту");
            }

            if (!password.trim()) {
                return toast.error("Введите пароль");
            }

            try {
                setLoading(true);

                dispatch(
                    fetchLoginUser({
                        email,
                        password,
                    }),
                );

                dispatch(setIsModalActive(false));
                initialValuesHandler();
                document.body.classList.remove("_lock");
            } catch (e: any) {
                toast.error(
                    e?.response?.data?.message || "Не удалось авторизоваться",
                );
            } finally {
                setLoading(false);
            }
        };

        const registerHandler = async () => {
            if (!name.trim()) {
                return toast.error("Введите имя пользователя");
            }

            if (!email.trim()) {
                return toast.error("Введите почту");
            }

            if (!password.trim()) {
                return toast.error("Введите пароль");
            }

            if (password.length < 8) {
                return toast.error("Пароль должен быть длинее 8 символов");
            }

            if (passwordAgain !== password) {
                return toast.error("Пароли не совпадают");
            }

            if (!acceptPrivacy) {
                return toast.error("Вы должны принять правила сервиса");
            }

            try {
                setLoading(true);
                const res = await axios.post<RegisterAPIResponse>("/register", {
                    name,
                    email,
                    password,
                    photo_url: "",
                    account_category: accountCategory.value,
                });

                if (!res?.data) {
                    return toast.error("Ошибка регистрации");
                }

                toast.success("Вы успешно зарегистрировались. Зайдите в почту и подвердите аккаунт");
                closeHandler();
            } catch (e: any) {
                console.log(e);
                toast.error(
                    "Не удалось зарегистрироваться или такой уже пользователь зарегистрирован",
                );
            } finally {
                setLoading(false);
            }
        };

        const supportHandler = async () => {
            if (!email.trim()) {
                return toast.error("Введите свою почту");
            }

            if (!text.trim()) {
                return toast.error("Введите текст сообщения");
            }

            if (email.length < 5) {
                return toast.error("Почта должна быть длинее 5 символов");
            }

            if (text.length < 10) {
                return toast.error("Текст сообщения должна быть длинее 25 символов");
            }

            try {
                const data = await AuthService.sendSupportMessage({email, text});
                toast.success("Сообщение успешно отправлено. Ожидайте ответа");
                closeHandler();
            } catch (e) {
                toast.error("Ошибка при отправке");
            }
        };

        const resetPasswordHandler = async () => {
            if (!email.trim()) {
                return toast.error("Введите почту");
            }

            const data = await AuthService.resetPasswordByEmail(email)
            toast.success('Сброс пароля отправлен к вам на почту')
            closeHandler();
        }

        if (type === "login") {
            return loginHandler();
        }

        if (type === "support") {
            return supportHandler();
        }

        if (type === "reset-password") {
            return resetPasswordHandler()
        }

        registerHandler();
    };

    const toggleTypeHandler = () => {
        setType(type === "login" ? "register" : "login");
    };

    useEffect(() => {
        initialValuesHandler();
    }, [type]);

    useEffect(() => {
        if (isAuth) {
            dispatch(setIsModalActive(false));
        }
    }, [isAuth]);

    useEffect(() => {
        type === "support" ? setIsHidden(true) : setIsHidden(false);
    }, [type]);

    if (isAuth) {
        return <></>;
    }

    return (
        <ModalWrapper
            isActive={isModalActive}
            setIsActive={(value) => dispatch(setIsModalActive(value))}
            title={type === "login" ? "Войти" : type === "register" ? "Регистрация" : type === "support" ? "Поддержка" : type === "reset-password" ? "Сброс пароля" : "Выбор формы"}
            fit
            footer={type !== "default" && (
                <Button
                    text={type === "login" ? "Войти" : type === "register" ? "Регистрация" : "Отправить"}
                    onClick={authHandler}
                    style={{
                        width: "100%",
                    }}
                    disabled={loading}
                >
                    {loading && <Loader/>}
                </Button>
            )
            }
        >
            {type === "login" && (
                <>
                    <Input
                        type={"email"}
                        placeholder={"Email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        _className={s.input}
                    />
                    <Input
                        type={"password"}
                        placeholder={"Пароль"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        _className={s.input}
                    />
                </>
            )}
            {type === "reset-password" && (
                <>
                    <Input
                        type={"email"}
                        placeholder={"Email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        _className={s.input}
                    />
                </>
            )}
            {type === "register" && <>
                <Select
                    items={userRoles}
                    currentItem={accountCategory}
                    setCurrentItem={setAccountCategory}
                    placeholder={"Выберите роль аккаунта"}
                />
                <div className={s.inputs}>
                    <Input
                        placeholder={"Имя пользователя"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        _className={s.input}
                    />
                    <Input
                        type={"email"}
                        placeholder={"Email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        _className={s.input}
                    />
                    <Input
                        type={"password"}
                        placeholder={"Пароль"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        _className={s.input}
                    />
                    <Input
                        type={"password"}
                        placeholder={"Пароль еще раз"}
                        value={passwordAgain}
                        onChange={(e) => setPasswordAgain(e.target.value)}
                        _className={s.input}
                    />
                </div>
                <Checkbox
                    value={acceptPrivacy}
                    setValue={setAcceptPrivacy}
                    theme={"white"}
                >
                    <p className={s.checkboxText}>
                        <span>Соглашаюсь с </span>
                        <a
                            onClick={downloadHandler}
                            download
                            href={"/files/service-rules.docx"}
                            className={s.checkboxTextLink}
                        >
                            правилами сервиса
                        </a>
                    </p>
                </Checkbox>
            </>}
            {type === "support" && (
                <>
                    <Input
                        type={"email"}
                        placeholder={"Ваш email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        _className={s.input}
                    />
                    <Textarea placeholder="Введите ваше сообщение" className={s.textarea}
                              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}/>
                </>
            )}

            {type === "default" && (
                <div style={{padding: "15px"}}>
                    <div className={s.buttonActionsDefault}>
                        <Button onClick={() => setType("register")} style={{width: "100%"}}>
                            Регистрация
                        </Button>
                    </div>
                    <div className={s.buttonActionsDefault}>
                        <Button onClick={() => setType("login")} style={{width: "100%"}}>
                            Вход
                        </Button>
                    </div>
                    <div className={s.buttonActionsDefault}>
                        <Button onClick={() => setType("reset-password")} style={{width: "100%"}}>
                            Сбросить пароля
                        </Button>
                    </div>
                </div>
            )

            }

            {type !== "default" && (<div className={s.buttonActions}>
                <div className={s.buttonTop}>
                    <button onClick={toggleTypeHandler} className={s.buttonToggle}>
                        {type === "login" ? "Регистрация" : "Вход"}
                    </button>
                    <button onClick={() => setType("reset-password")} className={s.buttonToggle}>
                        Сбросить пароль
                    </button>
                </div>
                <button hidden={isHidden} type="button" className={s.buttonToggle} onClick={() => setType("support")}>
                    Мне нужна помощь
                </button>
            </div>)}
        </ModalWrapper>
    );
};

export default memo(ModalAuth);
