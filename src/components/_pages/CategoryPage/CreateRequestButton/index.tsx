import { Button } from "@/buttons";
import { useRouter } from "next/router";
import { FC, memo } from "react";

interface OwnProps {
    userId?: number;
}

const CreateRequestButton: FC<OwnProps> = ({ userId }) => {
    const router = useRouter();

    const category = router.query.type ? router.query.type : router.query.id;

    return (
        <Button
            disabled={!userId}
            link={userId ? `/request/create?category=${category}` : `${category}/?no-authorized`}
            text={userId ? "Сделать запрос" : "Вы не авторизованы"}
            style={{
                width: "100%",
                padding: "10px",
            }}
        />
    );
};

export default memo(CreateRequestButton);
