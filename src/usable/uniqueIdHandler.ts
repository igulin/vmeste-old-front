import { nanoid } from "nanoid";

const uniqueIdHandler = (array: any[]) => {
    if (!array) {
        return [];
    }

    return array.map((item) => ({
        ...item,
        uniqueId: nanoid(),
    }));
};

export default uniqueIdHandler;
