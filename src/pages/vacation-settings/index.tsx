import React from "react";
import { Metadata } from "next";

import { Container, MainWrapper } from "@/components";
import Content from "./Content";

export const metadata: Metadata = {
    title: "Выбор типа отдыха",
    description: "Страница для выбора типа отдыха",
};

const VacationSettingsPage = () => {
    return (
        <MainWrapper>
            <Container>
                <Content />
            </Container>
        </MainWrapper>
    );
};

export default VacationSettingsPage;
