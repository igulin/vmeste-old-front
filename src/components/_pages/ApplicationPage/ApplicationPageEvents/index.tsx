import React, { useState } from "react";

import { ApplicationPageTop } from "..";

import s from "./ApplicationPageEvents.module.scss";
import { IEvent } from "@/api/types";
import * as events from "events";
import formatDate from "@/utils/formatDate";
import { AccessError } from "@/components";

interface OwnProps {
    events: IEvent[];
}

const ApplicationPageEvents: React.FC<OwnProps> = ({ events }) => {
    const [isActive, setIsActive] = useState(false);
    const toggleActive = () => {
        setIsActive(!isActive);
    }

    return (
        <div className={s.events}>
            <ApplicationPageTop
                title={"События"}
                buttonText={isActive ? "Скрыть" : events.length > 10 ? "+10" : String(events.length)}
                onClick={toggleActive}
            />
            {isActive ? (
                <ul className={s.eventsItems}>
                    {
                        events.length >= 1 ? events.map(el => (
                            <li key={el.id} className={s.eventsItem}>
                                <p className={s.eventsItemText}>
                                    {el.name + " " + formatDate(el.createdAt, "dd/MM/yyyy HH:mm:ss")}
                                </p>
                            </li>
                        )) : <AccessError text="Событий нет" />
                    }
                </ul>
            ) : (
                <></>
            )}
        </div>
    );
};

export default ApplicationPageEvents;
