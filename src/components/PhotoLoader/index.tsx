import { useRef, useState } from "react";

import { toast } from "react-toastify";

import s from "./PhotoLoader.module.scss";
import Image from "next/image";

interface IPhotoLoader {
    callback: (file: File) => void;
    errorText?: string;
    image?: string;
}

const PhotoLoader: React.FC<IPhotoLoader> = ({
    callback,
    errorText,
    image,
}) => {
    const photoRef = useRef<HTMLInputElement | null>(null);
    const [photo, setPhoto] = useState<string>("");

    const loadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const target = e.target;
            const file = target.files?.[0];

            if (file) {
                const fileObj = new Blob([file]);
                const url = URL.createObjectURL(fileObj);
                setPhoto(url);
                callback(file);
            }
        } catch (error) {
            toast.error("Не удалось загрузить изображение");
        }
    };

    console.log(photo);

    return (
        <div className={s.photo}>
            <button
                className={s.photoChange}
                onClick={() => photoRef.current?.click()}
            >
                Сменить
            </button>
            {photo ? (
                <img
                    src={photo}
                    alt={"Loaded image"}
                    className={s.photoImage}
                />
            ) : (
                <p className={s.photoEmpty}>
                    Фото
                    <br />
                    нет
                </p>
            )}
            <input
                type="file"
                ref={photoRef}
                hidden
                onChange={loadHandler}
                accept={"image/*"}
            />
        </div>
    );
};

export default PhotoLoader;
