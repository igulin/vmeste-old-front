import { useState, useEffect, useRef } from "react";

import s from "./DragComponent.module.scss";

interface IDragComponent {
    children: React.ReactNode;

    wheel?: boolean;

    _className?: string;

    dRef?: React.RefObject<HTMLDivElement>;
}

const DragComponent: React.FC<IDragComponent> = ({
    children,

    wheel,

    _className,

    dRef,
}) => {
    const [scroll, setScroll] = useState({
        isScrolling: false,
        clientX: 0,
        scrollX: 0,
    });

    const ref = useRef<HTMLDivElement | null>(null);

    const dragRef = dRef || ref;

    const onMouseDown = (e: any) => {
        // e.preventDefault();

        if (!dragRef.current || !dragRef.current.contains(e.target)) {
            return;
        }

        setScroll({ ...scroll, isScrolling: true, clientX: e.clientX });
    };
    const onMouseUp = (e: any) => {
        // e.preventDefault();

        if (!dragRef.current || !dragRef.current.contains(e.target)) {
            return;
        }

        setScroll({ ...scroll, isScrolling: false });
    };
    const onMouseMove = (e: any) => {
        e.preventDefault();

        if (!dragRef.current || !dragRef.current.contains(e.target)) {
            return;
        }

        const { clientX, scrollX, isScrolling } = scroll;

        if (isScrolling) {
            dragRef.current.scrollTo({
                left: scrollX - e.clientX + clientX,
            });

            // dragRef.current.scrollLeft = scrollX - e.clientX + clientX;

            setScroll({
                ...scroll,
                scrollX: scrollX - e.clientX + clientX,
                clientX: e.clientX,
            });
        }
    };

    useEffect(() => {
        const el = dragRef.current;

        if (wheel && el) {
            const onWheel = (e: any) => {
                e.preventDefault();
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY * 6,
                    behavior: "smooth",
                });
            };

            el.addEventListener("wheel", onWheel);

            return () => el.removeEventListener("wheel", onWheel);
        }

        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("mousemove", onMouseMove);

        return () => {
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mousemove", onMouseMove);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className={`${s.drag}${_className ? ` ${_className}` : ""}`}
            ref={dragRef}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
        >
            {children}
        </div>
    );
};

export default DragComponent;
