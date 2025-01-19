import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
    AccessError,
    Container,
    DragComponent,
    Line,
    RequestItem,
} from "@/components";
import CreateRequestButton from "../CreateRequestButton";

import { IRequestApp, RequestItemType } from "@/components/RequestItem/types";

import s from "./CategoryPageOtherView.module.scss";
import { MessageItem } from "@/components/ChatComponents";
import { IMessageItem } from "@/components/ChatComponents/MessageItem/types";
import { CategoryPageSearch } from "..";
import { Button } from "@/components/_buttons";
import {
    ChevronLeft,
    ChevronRight,
    SearchIcon,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { useAppSelector } from "@/hooks";
import { selectUserDataId } from "@/redux/slices/auth/auth.slice";
import { useRouter } from "next/router";

interface ICategoryPageOtherView {
    items?: RequestItemType[];
    requests?: IMessageItem[];
}

const CategoryPageOtherView: FC<ICategoryPageOtherView> = ({
    items,
    requests,
}) => {
    const router = useRouter();
    const userId = useAppSelector(selectUserDataId);
    const dragRef = useRef<HTMLDivElement | null>(null);
    const [searchActive, setSearchActive] = useState(false);

    const handleScroll = (type: "left" | "right") => {
        const drag = dragRef.current;

        if (!drag) {
            return;
        }

        const scroll = drag.scrollLeft;

        const value = type === "left" ? -300 : 300;

        drag.scrollTo({
            behavior: "smooth",
            left: scroll + value,
        });
    };
    return (
        <div className={s.category}>
            {items && items.length ? (
                <div className={s.categoryHeaderWrapper}>
                    {searchActive ? <CategoryPageSearch /> : <></>}
                    <div className={s.categoryHeaderDrag}>
                        <ChevronLeft
                            className={s.categoryHeaderDragIcon}
                            onClick={() => handleScroll("left")}
                        />
                        <DragComponent
                            _className={s.categoryHeader}
                            dRef={dragRef}
                        >
                            <div className={s.categoryHeaderItems}>
                                {items.map((item) => (
                                    <RequestItem
                                        key={item.id}
                                        id={item.id}
                                        photo_url={item.photo_url}
                                        name={item.name}
                                        description={item.description}
                                        status={item.status}
                                        min_amount={item.min_amount}
                                        _className={s.categoryHeaderItem}
                                    />
                                ))}
                            </div>
                        </DragComponent>
                        <ChevronRight
                            className={s.categoryHeaderDragIcon}
                            onClick={() => handleScroll("right")}
                        />
                    </div>
                    <Line
                        style={{
                            margin: "10px 0",
                        }}
                    />
                </div>
            ) : (
                <div className={s.categoryHeaderWrapper}>
                    <div className={s.categoryHeaderDrag}>
                        <AccessError text="Заявок в этом категории не существует" />
                    </div>
                    <Line
                        style={{
                            margin: "10px 0",
                        }}
                    />
                </div>
            )}
            <div className={s.categoryContent}>
                {requests && requests.length ? (
                    requests.map((item) => (
                        <MessageItem
                            key={item.id}
                            userId={item.creater.id}
                            userName={item.creater.name}
                            userImage={item.creater.photo_url}
                            messageText={item.text}
                            yourId={userId ? userId : 0}
                            type={item.type}
                            theme={"white"}
                            options={item.quiz?.answers}
                            optionTitle={item.quiz?.text}
                        />
                    ))
                ) : (
                    <></>
                )}
            </div>
            <div className={s.categoryFooter}>
                <Container>
                    <Line
                        style={{
                            margin: "0 0 10px 0",
                        }}
                    />
                    <div className={s.categoryFooterButtons}>
                        <Button
                            onClick={() => setSearchActive(!searchActive)}
                            style={{
                                padding: "10px",
                            }}
                        >
                            <SearchIcon />
                        </Button>
                        <CreateRequestButton userId={userId} />
                        <Button
                            link={`/category/${router.query.id}/providers`}
                            text={"Поставщики"}
                            style={{
                                padding: "10px",
                            }}
                        />
                    </div>
                </Container>
            </div>
            <div className={s.categoryFooterBlock} />
        </div>
    );
};

export default CategoryPageOtherView;
