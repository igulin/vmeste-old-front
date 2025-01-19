import { useRef } from "react";
import Image from "next/image";
import { useAppSelector } from "@/hooks";
import { selectUserAvatar } from "@/redux/slices/auth/auth.slice";

import s from "./ProfileSettingsAvatar.module.scss";
import axios from "@/axios";

const ProfileSettingsAvatar: React.FC = () => {
    const userAvatar = useAppSelector(selectUserAvatar);

    const fileRef = useRef<HTMLInputElement | null>(null);

    const changeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const files = e.target.files;
        console.log(files);
        if (!files?.length) {
            return;
        }
        // var fm = new FormData();
        // const res = await axios.post(
        //     `/api/auth/change-avatar`
        // );

    };

    return (
        <div className={s.avatar}>
            <button
                className={s.avatarChange}
                onClick={() => fileRef.current?.click()}
            >
                Сменить
            </button>
            {userAvatar ? (
                <Image
                    src={userAvatar}
                    alt="User avatar"
                    className={s.avatarImage}
                    width={100}
                    height={100}
                />
            ) : (
                <p className={s.avatarEmpty}>
                    Фото
                    <br />
                    нет
                </p>
            )}
            <input type="file" accept="image/*"  hidden ref={fileRef} onChange={changeAvatar} />
        </div>
    );
};

export default ProfileSettingsAvatar;
